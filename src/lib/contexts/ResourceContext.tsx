"use client";
import { useState, useEffect, createContext, useContext } from 'react';
import { uploadResource, getResources } from "@/lib/api/resource";
import { FileProps } from "@/lib/types/FileProps";

interface ResourceContextProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  uploadedFiles: FileProps[];
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  handleNoteToTextResource: (title: string, content: string) => Promise<void>;
  isSelectAll: () => boolean;
  isSelectSome: () => boolean;
  toggleFileSelection: (id: string) => void;
  toggleSelectAll: () => void;
  getListOfSelectedFileId: () => string[];
}

const ResourceContext = createContext<ResourceContextProps | undefined>(undefined);

export const ResourceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [uploadedFiles, setUploadedFiles] = useState<FileProps[]>([]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('uploaded_file', file);
      await uploadResource(formData)
      await fetchResources();
      setOpenModal(false);
    }
  };

  const isSelectAll = (): boolean => uploadedFiles.length > 0 && uploadedFiles.every(file => file.isSelected);
  const isSelectSome = (): boolean => uploadedFiles.some(file => file.isSelected) && !isSelectAll();

  const toggleFileSelection = (id: string) => {
    setUploadedFiles(prevFiles =>
      prevFiles.map(file =>
        file.id === id ? { ...file, isSelected: !file.isSelected } : file
      )
    );
  };

  const toggleSelectAll = () => {
    const allSelected = uploadedFiles.every(file => file.isSelected);
    setUploadedFiles(prevFiles =>
      prevFiles.map(file => ({ ...file, isSelected: !allSelected }))
    );
  };

  const getListOfSelectedFileId = () => {
    return uploadedFiles.filter(file => file.isSelected).map(file => file.id);
  };

  const fetchResources = async () => {
    try {
      const response = await getResources();
      if (response.data) {
        const files: FileProps[] = response.data.files;
        files.forEach(file => {
          file.isSelected = false; // Initialize isSelected to false
        });
        setUploadedFiles(files);
      }
    } catch (error) {
      console.error("Error fetching resources:", error);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const handleNoteToTextResource = async (title: string, content: string) => {
    try {
      const formData = new FormData();
      const blob = new Blob([content], { type: "text/plain" });
      const file = new File([blob], `${title || "Untitled"}.txt`, { type: "text/plain" });

      formData.append("uploaded_file", file);

      await uploadResource(formData);
      await fetchResources();

      setOpenModal(false);
    } catch (error) {
      console.error("Error uploading note as resource:", error);
    }
  };

  return (
    <ResourceContext.Provider value={{
      openModal,
      setOpenModal,
      uploadedFiles,
      handleFileUpload,
      handleNoteToTextResource,
      isSelectAll,
      isSelectSome,
      toggleFileSelection,
      toggleSelectAll,
      getListOfSelectedFileId
    }}>
      {children}
    </ResourceContext.Provider>
  );
};

export const useResourceContext = (): ResourceContextProps => {
  const context = useContext(ResourceContext);
  if (!context) {
    throw new Error("useResourceContext must be used within a ResourceProvider");
  }
  return context;
}
