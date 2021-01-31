import React, { useState, useEffect } from 'react';
import ListItems from './ListItem';
import db from './firebase';
import firebase from 'firebase';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Container from '@material-ui/core/Container';
import './App.css';

const App = () => {
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState('');
    const [order, setOrder] = useState(true);
    
    const curr_year=new Date().getFullYear();

    useEffect(() => {
        order ?
            (db.collection("todos").orderBy('timestamp', 'desc').onSnapshot(snapShot => {
                setTodos(snapShot.docs.map(doc => ({ id: doc.id, text: doc.data().text })))
            }))
            :
            (db.collection("todos").orderBy('timestamp', 'asc').onSnapshot(snapShot => {
                setTodos(snapShot.docs.map(doc => ({ id: doc.id, text: doc.data().text })))
            }))
    }, [input, order]);

    const addTodo = (event) => {
        event.preventDefault();
        db.collection("todos").add({
            text: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        setInput('');
    }

    const changeOrder = (event) => {
        event.preventDefault();
        setOrder(order ? false : true);
    }

    const user_input={
        margin:'10px 0px',
     }

    return (
        <>
            <Container maxWidth="sm" style={{ backgroundColor: 'rgb(241, 235, 255)', height: '100vh' }}>
                <form>
                    <h1>Welcome to i-Todo App 🚀</h1>
                    
                    <div className="center">
                        <TextField label="✅ Enter a todo..." style={user_input} value={input} onChange={event => setInput(event.target.value)} />

                        <Button disabled={!input} type="submit" onClick={addTodo}>
                            <Fab color="primary" aria-label="add" size="small" >
                                <AddIcon />
                            </Fab>
                        </Button>

                        <Button color="primary">
                            <Fab color="primary" aria-label="add" size="small">
                                <ImportExportIcon onClick={changeOrder} />
                            </Fab>
                        </Button>
                    </div>
                    
                    <ul>
                        {
                            todos.map((data, index) => <ListItems key={index} data={data} />)
                        }
                    </ul>

                </form>
            </Container>
            <footer className="footer">
                  <p>Copyright &#169; | {curr_year} | Made with ❤️ By Sarwar</p>
            </footer>
        </>
    );
}

export default App;