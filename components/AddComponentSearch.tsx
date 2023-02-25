import React, {useState, useRef} from 'react'

interface Props {
    searchValue: string;
    handleSearchChange: React.ChangeEventHandler<HTMLInputElement>;
    handleSubmit: (event: React.FormEvent<EventTarget>) => void
}

const AddComponentSearch: React.FC<Props> = (props) => {
const inputRef = useRef<HTMLInputElement>(null)

    return ( 
        <div>
            <form 
            className = "search--bar--input"
            onSubmit = {props.handleSubmit}
            >
                <input 
                placeholder = "Add here" 
                type = "text" 
                className = "search--input"
                onChange = {props.handleSearchChange}
                value = {props.searchValue}
                ref = {inputRef}
                />

                <input 
                type = "submit" 
                className = "submit--input"
                />

            </form>
        </div>
    )
}

export default AddComponentSearch