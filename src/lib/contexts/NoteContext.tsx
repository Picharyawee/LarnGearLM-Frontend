"use client";

import React, { createContext, useState, useEffect } from "react";
import { fetchNotes, uploadNote, updateNote, deleteNote, NoteAPIResponse } from "../api/note";

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
  handleAddNoteDirect: (title: string, content: string) => void;
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

  const reloadNotes = async () => {
    try{
      const notesAPI = await fetchNotes();
      const noteList = await Promise.all(
        notesAPI.map(async (note: NoteAPIResponse) => {
          const response = await fetch(note.url);
          const content = await response.text();

          return{
            id: note.id,
            title: note.title,
            content,
          };
        })
      );

      setNotes(noteList);
    }catch(error){
      console.error("reloadNotes error", error);
    }
  };

  useEffect(() => {
    reloadNotes();
  }, []);

  const handleAddNote = async () => {
    if (noteTitle.trim() && newNoteContent.trim()) { //ตัดช่องว่างหน้าและหลังข้อความออก แล้วยังมีข้อความ
      try{
        await uploadNote(noteTitle.trim(), newNoteContent.trim());
        await reloadNotes();

        handleCancelAction();
      }catch(error){
        console.error("addNote error", error);
      } 
    }
  };

  const handleAddNoteDirect = async (title: string, content: string) => {
    if (title.trim() && content.trim()) { //ตัดช่องว่างหน้าและหลังข้อความออก แล้วยังมีข้อความ
      try{
        await uploadNote(title.trim(), content.trim());
        await reloadNotes();

        handleCancelAction();
      }catch(error){
        console.error("addNote error", error);
      } 
    }
  };

  const handleDeleteNoteByID = async (idToDelete: number) => {
    try {
      await deleteNote(idToDelete);
      await reloadNotes();

      handleCancelAction();
    } catch (error) {
      console.error("deleteNote error", error);
    }
  };

  const handleViewNote = (note: Note): void => {
    setSelectedNote(note);
    setNoteTitle(note.title);
    setNewNoteContent(note.content);
    setIsAddingNote(true);
  };

  const handleSaveEditNote = async () => {
    if (selectedNote) {
      try{
        await updateNote(selectedNote.id, noteTitle.trim(), newNoteContent.trim());
        await reloadNotes();

        handleCancelAction();
      }catch(error){
        console.error("updateNote error", error);
      } 
    }else{
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
        handleAddNoteDirect,
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
