import { Dialog, DialogActions, DialogTitle, DialogContent, Typography, Button } from "@mui/material";

interface ArticleDialogProps {
    open: boolean;
    article: {
        title: string;
        tags: string;
        expectedDuration: number;
        content: string;
    }
    onClose: () => void;
    onConfirm: () => void;
}

export default function ArticleDialog({ open, article, onClose, onConfirm }: ArticleDialogProps) {
    return (
        <Dialog 
        open={open} 
        onClose={onClose} 
        fullWidth 
        maxWidth="md"
        >
            <DialogTitle component="div">
                <Typography variant="h6">
                    {article.title}
                </Typography>
            </DialogTitle>

            <DialogContent dividers>
                <Typography whiteSpace="pre-line">
                    Tag : {article.tags} {"\n"}
                    Expected Duration : {article.expectedDuration} {"\n\n"}
                    {article.content}
                </Typography>
            </DialogContent>

            <DialogActions>
                <Button 
                onClick={onClose}
                >
                    ปิด
                </Button>
                
                <Button
                variant="contained"
                onClick={onConfirm}
                >
                    ยืนยันใช้บทความนี้
                </Button>
            </DialogActions>
        </Dialog>
    );
}
