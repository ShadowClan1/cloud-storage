import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { deleteAxios } from "../../api/api";
const ConfirmationDialogueBox = ({ dialogue, setDialogue, setUpdateData }) => {
  const [open, setOpen] = React.useState(true);
  const [buttonAttributes, setButtonArtibutes] = React.useState({
    bg: "",
    text: "",
  });

  React.useEffect(() => {
    console.log(dialogue.path);
    if (dialogue.button == "delete") {
      setButtonArtibutes({ bg: "#e34242", text: "white" });
    }
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    // setOpen(false);
    setDialogue({ ...dialogue, visible: false });
  };
  const confirm = async () => {
    // setOpen(false);
    setDialogue((prev) => {
      return { ...prev, confirmation: true };
    });
    const res = await deleteAxios(dialogue.path + "/" + dialogue.fileName);
    if (res.status == true) {
      setUpdateData((prev) => !prev);
      setDialogue((prev) => {
        return { ...prev, visible: false };
      });
    }
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{dialogue.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {dialogue.body}
          <span className="text-xl "> {dialogue.fileName}</span>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Disagree</Button>
        <Button
          onClick={confirm}
          style={{
            background: buttonAttributes.bg,
            color: buttonAttributes.text,
          }}
        >
          {dialogue.button}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialogueBox;
