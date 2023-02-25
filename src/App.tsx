import React, { useState } from 'react'
import './css_files/App.css'
import './css_files/reset.css'
import Header from '../components/Header'
import {Todo} from './taskModel'
import TaskItem from '../components/TaskItem'
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd'
import AddComponentSearch from '../components/AddComponentSearch'

const App: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>("")
  const [todoList, setTodoList] = useState<Array<Todo>>([])
  const [doneList, setDoneList] = useState<Array<Todo>>([])
  const [render, setRender] = useState(1)

  function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setSearchValue(event.target.value)
  }

  function handleSubmit(event: React.FormEvent<EventTarget>): void {
    event?.preventDefault()
    if(searchValue) {
      setTodoList([...todoList, {
        id: Date.now(),
        searchValue: searchValue,
        isCompleted: false
      }])
      setSearchValue("")
    }
  }

  function removeTask(id: number): void {
    setTodoList(prevTodo => prevTodo.filter(todo => todo.id !== id))
    setDoneList(prevTodo => prevTodo.filter(todo => todo.id !== id))
  }
  
  function toggleDone(id: number): void {
    setTodoList((prevTodoList) => {
      return prevTodoList.map((todo) => {
        if(todo.id === id) {
          return ({
            ...todo,
            isCompleted: !todo.isCompleted
          })
        } else return todo
      })
    })
    setDoneList((prevTodoList) => {
      return prevTodoList.map((todo) => {
        if(todo.id === id) {
          return ({
            ...todo,
            isCompleted: !todo.isCompleted
          })
        } else return todo
      })
    })
  }

  const toDoElements = todoList.map((element, index) : JSX.Element => {
    return (
      <TaskItem
        index = {index}
        key = {element.id}
        value = {element.searchValue}
        isCompleted = {element.isCompleted}
        toggleDone = {() => toggleDone(element.id)}
        removeTask = {() => removeTask(element.id)}
        id = {element.id}
        todoList = {todoList}
        setTodoList = {setTodoList}
      />
    )
  })

  const doneToDoElements = doneList.map((element, index) : JSX.Element => {
    return (
      <TaskItem
        index = {index}
        key = {element.id}
        value = {element.searchValue}
        isCompleted = {element.isCompleted}
        toggleDone = {() => toggleDone(element.id)}
        removeTask = {() => removeTask(element.id)}
        id = {element.id}
        todoList = {doneList}
        setTodoList = {setDoneList}
      />
    )
  })

  console.log("rendered")

  const onDragEnd = (result: DropResult) => {
      const { source, destination } = result
      console.log(result)    
      if(!destination) return

      if(destination.droppableId === source.droppableId
         && destination.index === source.index) return

      let add;
      let active = todoList
      let done = doneList

      if(source.droppableId === "TodoList") {
        add = active[source.index]
        active.splice(source.index, 1)
      }
      else {
        add = done[source.index]
        done.splice(source.index, 1)
      }

      if(destination.droppableId === "TodoList") {
        active.splice(destination.index, 0, add)
      }
      else {
        done.splice(destination.index, 0, add)
      }
      
      setTodoList(active)
      setDoneList(done)
      setRender(prevRender => prevRender + 1) // weird bug, page doesn't rerender without it :/
  }

  return (
      <div className="main--wrapper">
          <Header/>
          <AddComponentSearch
            handleSearchChange = {handleSearchChange}
            handleSubmit = {handleSubmit}
            searchValue = {searchValue}
          />
          <DragDropContext onDragEnd = {onDragEnd}>
            <div className="grid--container">

                <div className="grid--left">
                    <div className="grid--left--header">
                      <h1 className="grid--left--header--title">To Do</h1>
                    </div>

                    <Droppable droppableId = "TodoList">
                        {
                          (provided) => {
                            return (
                            <div 
                            className="grid--left--container" 
                            ref = {provided.innerRef} 
                            {...provided.droppableProps}
                            >
                              {toDoElements}
                              {provided.placeholder}
                            </div>
                          )
                          }
                        }
                      </Droppable>
                </div>
             
                <div className="grid--right">
                  <div className="grid--right--header" id = "grid--right--header">
                    <h1 className="grid--right--header--title">Done</h1>
                  </div>
                  <Droppable droppableId = "DoneList">
                      {
                        (provided) => {
                          return (
                            <div 
                            className="grid--right--container"
                            ref = {provided.innerRef}
                            {...provided.droppableProps}
                            >
                              {doneToDoElements}
                              {provided.placeholder}
                            </div>
                          )
                        }
                      }
                  </Droppable>
                </div>
            </div>
          </DragDropContext>
      </div> 
  )
}

export default App
