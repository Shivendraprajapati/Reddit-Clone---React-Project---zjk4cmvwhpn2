import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { styled } from "@mui/material/styles";
import { tokens } from "../Theme";
import { useTheme } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import { getAuth } from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { database } from "../config/firebase";

export default function FormDialog() {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const auth = getAuth();

  const colors = tokens(theme.palette.mode);
  const [formData, setFormData] = useState({
    bookmark: false,
    comment: 1,
    downvote: 0,
    userId: auth.currentUser?.uid,
    postBy: auth.currentUser?.displayName,
    text: "",
    title: "",
    upvote: 1,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(colors.primary[400]),
    borderRadius: "30px",
    padding: "1.25vh",
    backgroundColor: colors.grey[900],
    "&:hover": {
      backgroundColor: colors.grey[700],
    },
  }));

  function onChange(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: `${e.target.value}`,
    }));
  }
  const postsRef = collection(database, "posts");
  const onSubmit = async () => {
    setOpen(false);
    await addDoc(postsRef, {
      ...formData,
      title: "r/" + formData.title,
      timestamp: serverTimestamp(),
    });
    setFormData({ ...formData, title: "", text: "" });

    // console.log(formData);
  };

  return (
    <div style={{ position: "absolute", top: "10vh", right: "32vw" }}>
      <ColorButton variant="contained" onClick={handleClickOpen} size="small">
        <CreateIcon />
      </ColorButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle variant="h4">Create Post</DialogTitle>
        <DialogContent>
          <DialogContentText variant="h6">
            To create a post enter the details below!
          </DialogContentText>
          <TextField
            margin="dense"
            id="title"
            label="Title"
            type="text"
            value={formData.title}
            onChange={onChange}
            fullWidth
            variant="outlined"
            required
          />
          <TextField
            margin="dense"
            id="text"
            label="Text"
            type="text"
            value={formData.text}
            onChange={onChange}
            fullWidth
            variant="outlined"
            required
            multiline
            rows={2}
          />
        </DialogContent>
        <DialogActions>
          <ColorButton onClick={handleClose}>Cancel</ColorButton>
          <ColorButton onClick={onSubmit}>Create Post</ColorButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
