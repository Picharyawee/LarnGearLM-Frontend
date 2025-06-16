import { useState } from 'react';
import { uploadResource, getResources } from "@/lib/api/resource";
import { useEffect } from 'react';

interface FileProps {
  id: string;
  filename: string;
  url: string;
  content_type: string;
  isSelected: boolean;
  last_modified: string;
  size: number;
}

interface ResourceState {
  open: boolean;
  uploadedFiles: FileProps[];
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  toggleFileSelection: (id: string) => void;
  toggleSelectAll: () => void;
  getListOfSelectedFilename: () => string[];
}

export const useResource = (): ResourceState => {
  const [open, setOpen] = useState<boolean>(false);
  const [uploadedFiles, setUploadedFiles] = useState<FileProps[]>([]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('uploaded_file', file);
      await uploadResource(formData)
      await fetchResources();
      setOpen(false);
    }
  };

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

  const getListOfSelectedFilename = () => {
    return uploadedFiles.filter(file => file.isSelected).map(file => file.filename);
  };

  const fetchResources = async () => {
    try {
      const response = await getResources();
      console.log("Fetched resources:", response.data);
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

  return {
    open,
    uploadedFiles,
    handleFileUpload,
    toggleFileSelection,
    toggleSelectAll,
    getListOfSelectedFilename
  };
};
