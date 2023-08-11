import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
const ConfirmationDialogueBox = ({dialogue, setdialogue}) => {
  const [open, setOpen] = React.useState(true);
  const [buttonAttributes, setButtonArtibutes] = React.useState({bg :"", text : ""})

React.useEffect(()=>{
if(dialogue.button == "delete"){
    setButtonArtibutes({bg : "red", text  : "white"})
}
},[])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const confirm = ()=>{
    setOpen(false);
    setdialogue(prev=>{return{...prev, confirmation :true}})
  }
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {dialogue.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          {dialogue.body}
     
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={confirm}  style={{background: buttonAttributes.bg, color :buttonAttributes.text}}>
           {dialogue.button}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ConfirmationDialogueBox;
