export interface FileProps {
  id: string;
  filename: string;
  url: string;
  content_type: string;
  isSelected: boolean;
  last_modified: string;
  size: number;
}