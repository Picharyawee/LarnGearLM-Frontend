import { useState } from 'react';
import { uploadResource, getResources, deleteResource } from "@/lib/api/resource";
import { useEffect } from 'react';
import { FileProps } from "@/lib/types/FileProps";

interface ResourceState {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  uploadedFiles: FileProps[];
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  isSelectAll: () => boolean;
  isSelectSome: () => boolean;
  toggleFileSelection: (id: string) => void;
  toggleSelectAll: () => void;
  getListOfSelectedFileId: () => string[];
  deleteFileById: (fileId: string) => Promise<void>;
}

export const useResource = (): ResourceState => {
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

  const handleDeleteFile = async (fileId: string) => {
  try {
    await deleteResource(fileId); // call backend
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId)); // update UI
  } catch (error) {
    console.error(`Failed to delete file ${fileId}:`, error);
  }
};

  return {
    openModal: openModal,
    setOpenModal: setOpenModal,
    uploadedFiles: uploadedFiles,
    handleFileUpload: handleFileUpload,
    isSelectAll: isSelectAll,
    isSelectSome: isSelectSome,
    toggleFileSelection: toggleFileSelection,
    toggleSelectAll: toggleSelectAll,
    getListOfSelectedFileId: getListOfSelectedFileId,
    deleteFileById: handleDeleteFile
  };
};
