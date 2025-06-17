"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { uploadResource, getResources } from "@/lib/api/resource";
import { FileProps } from "@/lib/types/FileProps";

interface ResourceContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  uploadedFiles: FileProps[];
  setUploadedFiles: React.Dispatch<React.SetStateAction<FileProps[]>>;
  selectedFiles: number[];
  setSelectedFiles: React.Dispatch<React.SetStateAction<number[]>>;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  handleLinkUpload: (url: string) => void;
  handleTextUpload: (text: string) => void;
  toggleSelectFile: (index: number) => void;
  toggleSelectAll: () => void;
  fetchResources: () => Promise<void>;
  getListOfFilename: () => string[];
}

const ResourceContext = createContext<ResourceContextProps | undefined>(undefined);

export const useResourceContext = () => {
  const context = useContext(ResourceContext);
  if (!context) {
    throw new Error("useResourceContext must be used within a ResourceProvider");
  }
  return context;
};

export const ResourceProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<FileProps[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<number[]>([]);
  const [linkInput, setLinkInput] = useState('');
  const [textInput, setTextInput] = useState('');

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // turn file into FormData
      const formData = new FormData();
      formData.append('uploaded_file', file);
      await uploadResource(formData)
      await fetchResources();
      setOpen(false);
    }
  };

  const handleLinkUpload = (url: string) => {
    // API upload Link
    setOpen(false);
  };

  const handleTextUpload = (text: string) => {
    // API upload Text
    setOpen(false);
  };

  const toggleSelectFile = (index: number) => {
    setSelectedFiles((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  const toggleSelectAll = () => {
    if (selectedFiles.length === uploadedFiles.length) {
      setSelectedFiles([]);
    } else {
      setSelectedFiles(uploadedFiles.map((_, i) => i));
    }
  };

  const getListOfSelectedFilename = () => {
    return selectedFiles.map((index) => uploadedFiles[index].filename); // TODO: stop using index
  };

  const fetchResources = async () => {
    try {
      const response = await getResources();
      console.log("Fetched resources:", response.data);
      if (response.data) {
        const files: FileProps[] = response.data.files;
        setUploadedFiles(files);
      }
    } catch (error) {
      console.error("Error fetching resources:", error);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  return (
    <ResourceContext.Provider value={{
      open,
      setOpen,
      uploadedFiles,
      setUploadedFiles,
      selectedFiles,
      setSelectedFiles,
      handleFileUpload,
      handleLinkUpload,
      handleTextUpload,
      toggleSelectFile,
      toggleSelectAll,
      getListOfFilename: getListOfSelectedFilename,
      fetchResources
    }}>
      {children}
    </ResourceContext.Provider>
  );
}