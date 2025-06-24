"use client";
import { useState, useEffect, createContext, useContext } from 'react';
import { uploadResource, getResources, createYoutubeTranscript, deleteResource } from "@/lib/api/resource";
import { FileProps } from "@/lib/types/FileProps";

type FileContentResult =
  | { type: "text"; content: string }
  | { type: "pdf"; blobUrl: string };

type PreviewFile = {
  id: string;
  filename: string;
  contentType: "text" | "pdf";
  content: string;
  blobUrl?: string;
};

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
  handleDeleteFile: (fileId: string) => Promise<void>;
  getFileContentByUrl: (url: string) => Promise<FileContentResult>;

  previewFile: PreviewFile | null;
  handlePreviewFile: (file: FileProps) => void;
  handleClickOpen: () => void;
  handleClose: () => void;
  setPreviewFile: React.Dispatch<React.SetStateAction<PreviewFile | null>>;

  handleCreateYoutubeTranscript: (url: string) => Promise<void>;
}

const ResourceContext = createContext<ResourceContextProps | undefined>(undefined);

export const ResourceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [uploadedFiles, setUploadedFiles] = useState<FileProps[]>([]);
  const [previewFile, setPreviewFile] = useState<PreviewFile | null>(null);

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

  const handleDeleteFile = async (fileId: string) => {
    try {
      await deleteResource(fileId); // call backend
      setUploadedFiles(prev => prev.filter(file => file.id !== fileId)); // update UI
    } catch (error) {
      console.error(`Failed to delete file ${fileId}:`, error);
    }
  };

  const getFileContentByUrl = async (url: string): Promise<FileContentResult> => {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get("Content-Type");

      if (contentType?.includes("text/plain")) {
        const text = await response.text();
        return { type: "text", content: text };
      } else if (contentType?.includes("application/pdf")) {
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        return { type: "pdf", blobUrl };
      } else {
        throw new Error(`Unsupported content type: ${contentType}`);
      }
    } catch (error) {
      console.error("Error fetching file content:", error);
      throw error;
    }
  };

  const handleClickOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  }

  const handlePreviewFile = async (file: FileProps) => {
    try {
      const result = await getFileContentByUrl(file.url);
      
      setPreviewFile({
        id: file.id,
        filename: file.filename,
        contentType: result.type,
        content: result.type === "text" ? result.content : "",
        blobUrl: result.type === "pdf" ? result.blobUrl : undefined,
      });
    } catch (error) {
      console.error("Failed to preview file", error);
    }
  };

  const handleCreateYoutubeTranscript = async (url: string) => {
    try {
      await createYoutubeTranscript(url);
      await fetchResources();
      setOpenModal(false);
    } catch (error) {
      console.error("Failed to create YouTube transcript:", error);
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
      getListOfSelectedFileId,
      handleDeleteFile,
      getFileContentByUrl,
      handleClickOpen,
      handleClose,
      handlePreviewFile,
      previewFile,
      setPreviewFile,
      handleCreateYoutubeTranscript
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
