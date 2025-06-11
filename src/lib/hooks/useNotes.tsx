import { useState } from 'react';

export interface Note {
  id: number;
  content: string;
}

//แต่ละอัน return เป็นอะไรบ้าง
export interface UseNotesReturn {
  notes: Note[];
  newNoteContent: string;
  isAddingNote: boolean;
  selectedNote: Note | null;
  
  setNewNoteContent: (content: string) => void;
  handleAddNote: () => void;
  handleDeleteNoteByID: (idToDelete: number) => void;
  handleViewNote: (note: Note) => void;
  handleSaveEditNote: () => void;
  handleCancelAction: () => void;
  
  setIsAddingNote: (isAdding: boolean) => void;
}

export default function useNotes(initialNotes: Note[] = []): UseNotesReturn {
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [newNoteContent, setNewNoteContent] = useState<string>("");
  const [isAddingNote, setIsAddingNote] = useState<boolean>(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);


  const handleAddNote = (): void => {
    if (newNoteContent.trim() !== "") { //ตัดช่องว่างหน้าและหลังข้อความออก แล้วยังมีข้อความ
      const newNote: Note = {
        id: Date.now(),
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
    setNewNoteContent(note.content);
    setIsAddingNote(true);
  };

  const handleSaveEditNote = (): void => {
    if (selectedNote && newNoteContent.trim() !== "") {
      setNotes(prevNotes =>
        prevNotes.map(note =>
          note.id === selectedNote.id //ถ้าไอดีตรง อัพเดทเนื้อหา
            ? { ...note, content: newNoteContent.trim() } 
            : note
        )
      );
      handleCancelAction();
    } else if (selectedNote === null && newNoteContent.trim() !== "") { //ถ้าไม่โน้ตที่ถูกเลือก จะสร้างโน้ตใหม่
      handleAddNote();
    }
  };

  const handleCancelAction = (): void => {
    setIsAddingNote(false);
    setSelectedNote(null);
    setNewNoteContent("");
  };

  return {
    notes,
    newNoteContent,
    isAddingNote,
    selectedNote,
    
    setNewNoteContent,
    handleAddNote,
    handleDeleteNoteByID,
    handleViewNote,
    handleSaveEditNote,
    handleCancelAction,
    
    setIsAddingNote,
  };
}