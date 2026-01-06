import {useState} from "react"
import "./App.css"
import {saveJoke} from "./services/jokeService.jsx"
import stevePic from "./assets/steve.png"

export const App = () => {
    const [newJoke, setNewJoke] = useState("")

    const saveButton = () => {
        saveJoke(newJoke)
        setNewJoke("")
    }
    
    return <div className="app-container">
        <div className="app-heading">
            <div className="app-heading-circle">
                <img className="app-logo" src={stevePic} alt="Good job Steve" />
            </div>
            <h1 className="app-heading-text">Chuckle Checklist</h1>
        </div>
            <h2>Add Joke</h2>
        <div className="joke-add-form">
            <input
                className="joke-input"
                type="text"
                value={newJoke}
                placeholder="New One Liner"
                onChange={(event) => {
                    setNewJoke(event.target.value)
                }}
            />
            <button className="joke-input-submit" onClick={saveButton}>Add</button>
        </div>
    </div>
}
