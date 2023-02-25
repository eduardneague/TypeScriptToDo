import React, {useState, useRef, useEffect} from 'react'
import { AiFillEdit, AiFillDelete, AiOutlineCheck } from 'react-icons/ai'
import {Todo} from '../src/taskModel'
import {Draggable} from 'react-beautiful-dnd'

interface Props {
  key: number;
  value: string;
  isCompleted: boolean;
  toggleDone: () => void;
  removeTask: () => void;
  id: number;
  todoList: Todo[];
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>
  index: number;
}

const styles = {
  textDecoration: "line-through",
}

const TaskItem: React.FC<Props> = (props) => {
  const [edit, setEdit] = useState<boolean>(false)
  const [editTodo, setEditTodo] = useState<string>(props.value)
  const editInputRef = useRef<HTMLInputElement>(null)

  function handleEdit(e: React.FormEvent, id: number) {
    e.preventDefault()
    props.setTodoList((prevList) => {
      return prevList.map((element) => {
        if(element.id === id) {
          return {...element, searchValue: editTodo}
        } else return element
      })
    })
    setEdit(false)
  }

  useEffect(() => {
    editInputRef.current?.focus()
  }, [edit])

  return (
    <Draggable 
    draggableId = {props.id.toString()} 
    index = {props.index}
    >
      {
        (provided) => {
          return (
            <form 
              className = "task--container" 
              onSubmit = {(e) => handleEdit(e, props.id)} 
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref = {provided.innerRef} 
            > 
            {edit ? (
              <input ref = {editInputRef} 
              className = "edit--input" type="text" value = {editTodo} onChange = {
                (event) => {
                  setEditTodo(event.target.value)
                }
              } />
            ) : (
               props.isCompleted ? 
                <h1 className="task--title" style = {styles} > {props.value} </h1> :
                <h1 className="task--title"> {props.value}  </h1>  
            )
            }
        
              <div className="task--icon--container">
                <p className="task--status" onClick = {props.toggleDone}> <AiOutlineCheck/> </p>
                <p className="task--delete" onClick = {props.removeTask} > <AiFillDelete/> </p>
                <p className="task--edit" onClick = {
                  () => {
                    if(!edit && !props.isCompleted) {
                      setEdit((prevEdit) => !prevEdit)
                    }
                  }
                } > <AiFillEdit/> </p>
        
              </div>
            </form>
          )
        }
      }
    </Draggable>
  )
}

export default TaskItem