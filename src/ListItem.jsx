import React,{useState} from 'react'
import db from './firebase';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import './ListItem.css';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import firebase from 'firebase';
import TextField from '@material-ui/core/TextField';

const ListItems = (props) => {
   const[newInput,setNewInput]=useState(props.data.text);

   function getModalStyle() {
      const top = 50 ;
      const left = 50;

      return {
         top: `${top}%`,
         left: `${left}%`,
         transform: `translate(-${top}%, -${left}%)`,
      };
   }

   const useStyles = makeStyles((theme) => ({
      paper: {
         display:'flex',
         flexDirection:'column',
         position: 'absolute',
         width: 400,
         backgroundColor: theme.palette.background.paper,
         border: '2px solid #000',
         boxShadow: theme.shadows[5],
         padding: theme.spacing(2, 4, 3),
         [theme.breakpoints.up('xs')]: {
            width: 300
          },
         [theme.breakpoints.up('sm')]: {
            width: 400
          },
         }
      }));

   const classes = useStyles();
   const [modalStyle] = useState(getModalStyle);
   const [open, setOpen] = useState(false);

   const handleOpen = () => {
      setOpen(true);
   };

   const updateTodo=(event)=>{
      event.preventDefault();
      db.collection('todos').doc(props.data.id).set({
        text:newInput,
        timestamp:firebase.firestore.FieldValue.serverTimestamp()
      },{merge:true})
      setOpen(false); 
   }
   
   const modal_button={
      width:'100px',
      margin:'10px',
      padding:'5px',
      cursor:'pointer',
   }
   const modal_input={
      margin:'10px 0px',
      padding:'10px'
   }

   const body = (
      <form>
      <div style={modalStyle} className={classes.paper}>
         <TextField label="✅ Update todo..." style={modal_input} value={newInput} onChange={e=>setNewInput(e.target.value)} />
         <div className="center">
         <Button type="submit" onClick={updateTodo} style={modal_button} variant="contained" color="primary">
           Update
         </Button>
         <Button onClick={e=>setOpen(false)} style={modal_button} variant="contained" color="primary">
           Cancel
         </Button>
         </div>
      </div>
      </form>
   );
  
   const delteItem = (event) => {
      event.preventDefault();
      db.collection('todos').doc(props.data.id).delete()
   }
   
   return (
      <>
         <div className="design_items">

            <ListItem>
               <ListItemText inset primary={props.data.text} />
            </ListItem>

            <Button onClick={delteItem}>
               <DeleteIcon />
            </Button>

            <Modal open={open}>
              {body}
            </Modal>

            <Button onClick={handleOpen}>
               <EditIcon />
            </Button>
         </div>
      </>
   );
}

export default ListItems;