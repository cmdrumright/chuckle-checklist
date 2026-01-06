import {useEffect, useState} from "react"
import "./App.css"
import {getJokes, saveJoke} from "./services/jokeService.jsx"
import stevePic from "./assets/steve.png"

export const App = () => {
    const [newJoke, setNewJoke] = useState("")
    const [allJokes, setAllJokes] = useState([])
    const [untoldJokes, setUntoldJokes] = useState([])
    const [toldJokes, setToldJokes] = useState([])

    const saveButton = async () => {
        await saveJoke(newJoke)
        setNewJoke("")
        updateJokeList()
    }
    
    const updateJokeList = async () => {
        const jokes = await getJokes()
        const newJokes = jokes.filter((joke) => joke.told === false)
        const oldJokes = jokes.filter((joke) => joke.told === true)
        setAllJokes(jokes)
        setUntoldJokes(newJokes)
        setToldJokes(oldJokes)
    }

    useEffect(() => {updateJokeList()}, [])
    
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
        <div className="joke-lists-container">
            <div className="joke-list-container">
                <h2>Untold
                    <span className="untold-count">{untoldJokes.length}</span>
                </h2>
                {untoldJokes.map((joke) => {
                    return ( <section className="joke-list-item" key={joke.id}>
                        <p className="joke-list-item-text">{joke.text}</p>
                    </section>)
                })}
            </div>
            <div className="joke-list-container">
                <h2>Told
                    <span className="told-count">{toldJokes.length}</span>
                </h2>
                {toldJokes.map((joke) => {
                    return ( <section className="joke-list-item" key={joke.id}>
                        <p className="joke-list-item-text">{joke.text}</p>
                    </section>)
                })}
            </div>
        </div>
    </div>
}
