import React, { createContext, useState } from "react";

export interface Note {
  id: number;
  title: string;
  content: string;
}

export interface NoteContextProps {
  notes: Note[];
  noteContentBuffer: string;
  noteTitleBuffer: string;
  isAddingNote: boolean;
  selectedNote: Note | null;

  setNoteContentBuffer: (content: string) => void;
  setNoteTitleBuffer: (title: string) => void;
  handleAddNote: () => void;
  handleDeleteNoteByID: (idToDelete: number) => void;
  handleViewNote: (note: Note) => void;
  handleSaveEditNote: () => void;
  handleCancelAction: () => void;
  setIsAddingNote: (isAdding: boolean) => void;
}

const NoteContext = createContext<NoteContextProps | undefined>(undefined);

export const NoteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNoteContent, setNewNoteContent] = useState<string>("");
  const [noteTitle, setNoteTitle] = useState<string>("");
  const [isAddingNote, setIsAddingNote] = useState<boolean>(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const handleAddNote = (): void => {
    if (newNoteContent.trim() !== "") { //ตัดช่องว่างหน้าและหลังข้อความออก แล้วยังมีข้อความ
      const newNote: Note = {
        id: Date.now(),
        title: noteTitle.trim(),
        content: newNoteContent.trim()
      };
      setNotes(prevNotes => [...prevNotes, newNote]); //เอาโน้ตที่เพิ่งสร้างมาต่อท้ายโน้ตก่อนหน้า
      handleCancelAction();
    }
  };

  const handleDeleteNoteByID = (idToDelete: number): void => {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== idToDelete)); //ลบโน้ตที่มีไอดีตรงกับที่ต้องการลบ
    handleCancelAction();
  };

  const handleViewNote = (note: Note): void => {
    setSelectedNote(note);
    setNoteTitle(note.title);
    setNewNoteContent(note.content);
    setIsAddingNote(true);
  };

  const handleSaveEditNote = (): void => {
    if (selectedNote && (noteTitle.trim() !== "" || newNoteContent.trim() !== "")) {
      setNotes(prevNotes =>
        prevNotes.map(note =>
          note.id === selectedNote.id //ถ้าไอดีตรง อัพเดทเนื้อหา
            ? { ...note, title: noteTitle.trim(), content: newNoteContent.trim() }
            : note
        )
      );
      handleCancelAction();
    } else if (selectedNote === null && (noteTitle.trim() !== "" || newNoteContent.trim() !== "")) { //ถ้าไม่โน้ตที่ถูกเลือก จะสร้างโน้ตใหม่
      handleAddNote();
    }
  };

  const handleCancelAction = (): void => {
    setIsAddingNote(false);
    setSelectedNote(null);
    setNoteTitle("");
    setNewNoteContent("");
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        noteContentBuffer: newNoteContent,
        noteTitleBuffer: noteTitle,
        isAddingNote,
        selectedNote,
        setNoteContentBuffer: setNewNoteContent,
        setNoteTitleBuffer: setNoteTitle,
        handleAddNote,
        handleDeleteNoteByID,
        handleViewNote,
        handleSaveEditNote,
        handleCancelAction,
        setIsAddingNote,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export const useNoteContext = (): NoteContextProps => {
  const context = React.useContext(NoteContext);
  if (!context) {
    throw new Error("useNoteContext must be used within a NoteProvider");
  }
  return context;
};
