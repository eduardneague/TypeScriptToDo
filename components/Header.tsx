import React, {useState} from 'react'

const Header: React.FC = () => {
  return (
    <>
    <div className = "header--container">
        <h1 className = "header--title">
          edu's 
          <img alt = "TypeScript"src = './public/typescript.png' className = "typescriptLogo"/> 
          To Do List
        </h1>
        
    </div>
    </>
  )
}

export default Header