'use client'

import { useState, useEffect } from 'react'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import DeleteForever from '@mui/icons-material/DeleteForever'
import AddBox from '@mui/icons-material/AddBox'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { TextField } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'

export default function ToDos() {
    const [todos, setTodos] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [newTodo, setNewTodo] = useState('')

    function inputChangeHandler(e) {
        setNewTodo(e.target.value)
    }

    function addNewTodo() {
        if (newTodo && newTodo.length) {
            fetch('api/todos', {
                method: 'POST',
                body: JSON.stringify({ value: newTodo, done: false }),
            }).then((response) => {
                return response.json().then((newTodo) => {
                    setTodos([...todos, newTodo])
                    setNewTodo('')
                })
            })
        }
    }

    function removeTodo({ id }) {
        if (id) {
            fetch(`api/todos/${id}`, { method: 'DELETE' }).then((response) => {
                response.ok &&
                    // if response is successful, then update state
                    setTodos(todos.filter((v, idx) => v.id !== id))
            })
        }
    }

    function toggleCheckTodo(todo) {
        if (todo) {
            fetch(`api/todos/${todo.id}`, {
                method: 'PATCH',
                body: JSON.stringify({ done: !todo.done }),
            }).then((response) => {
                response.ok &&
                    response.json().then((updatedTodo) => {
                        // Update state
                        setTodos(
                            todos.map((todo) => {
                                if (todo.id === updatedTodo.id) {
                                    return updatedTodo
                                }
                                return todo
                            })
                        )
                    })
            })
        }
    }

    useEffect(() => {
        fetch('/api/todos', { method: 'GET' })
            .then((response) => response.ok && response.json())
            .then((todos) => {
                todos && setTodos(todos)
                setIsLoading(false)
            })
    }, [])

    const loadingItems = <CircularProgress />

    const toDoItems = isLoading
        ? loadingItems
        : todos.map((todo, idx) => {
              return (
                  <ListItem
                      key={idx}
                      secondaryAction={
                          <IconButton
                              edge="end"
                              onClick={() => removeTodo(todo)}
                          >
                              <DeleteForever />
                          </IconButton>
                      }
                  >
                      <ListItemButton>
                          <ListItemIcon>
                              <Checkbox
                                  checked={todo.done}
                                  onClick={() => toggleCheckTodo(todo)}
                                  disableRipple
                              />
                          </ListItemIcon>
                          <ListItemText primary={todo.value} />
                      </ListItemButton>
                  </ListItem>
              )
          })

    return (
        <>
            <h2>My ToDos</h2>
            <List sx={{ width: '100%', maxWidth: 500 }}>
                {toDoItems}
                {!isLoading && (
                    <ListItem
                        key="newItem"
                        secondaryAction={
                            <IconButton edge="end" onClick={addNewTodo}>
                                <AddBox />
                            </IconButton>
                        }
                    >
                        <TextField
                            label="New ToDo Item"
                            fullWidth
                            variant="outlined"
                            value={newTodo}
                            onChange={inputChangeHandler}
                        />
                    </ListItem>
                )}
            </List>
        </>
    )
}
