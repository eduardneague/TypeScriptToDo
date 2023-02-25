import React, { useState, useEffect } from 'react'
import './css_files/App.css'
import './css_files/reset.css'
import Header from '../components/Header'
import {Todo} from './taskModel'
import TaskItem from '../components/TaskItem'
import AddComponentSearch from '../components/AddComponentSearch'

const App: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>("")
  const [todoList, setTodoList] = useState<Array<Todo>>([])

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
  }

  const toDoElements = todoList.map((element) : JSX.Element => {
    return (
      <TaskItem
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

  return (
      <div className="main--wrapper">
          <Header/>
          <AddComponentSearch
            handleSearchChange = {handleSearchChange}
            handleSubmit = {handleSubmit}
            searchValue = {searchValue}
          />
          <div className="grid--container">
            {toDoElements}
          </div>
      </div> 
  )
}

export default App
