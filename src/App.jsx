import {useEffect, useState} from "react"
import "./App.css"
import {deleteJoke, setJokeTold, getJokes} from "./services/jokeService.jsx"
import {AddJoke} from "./components/AddJoke.jsx"
import stevePic from "./assets/steve.png"

export const App = () => {
    const [allJokes, setAllJokes] = useState([])
    const [untoldJokes, setUntoldJokes] = useState([])
    const [toldJokes, setToldJokes] = useState([])

    const updateJokeList = async () => {
        const jokes = await getJokes()
        const newJokes = jokes.filter((joke) => joke.told === false)
        const oldJokes = jokes.filter((joke) => joke.told === true)
        setAllJokes(jokes)
        setUntoldJokes(newJokes)
        setToldJokes(oldJokes)
    }
    
    const tellJoke = async (id) => {
        await setJokeTold(id, true)
        updateJokeList()
    }

    const untellJoke = async (id) => {
        await setJokeTold(id, false)
        updateJokeList()
    }

    const removeJoke = async (id) => {
        await deleteJoke(id)
        updateJokeList()
    }

    useEffect(() => {updateJokeList()}, [])
    
    return <div className="app-container">
        <div className="app-heading">
            <div className="app-heading-circle">
                <img className="app-logo" src={stevePic} alt="Good job Steve" />
            </div>
            <h1 className="app-heading-text">Chuckle Checklist</h1>
        </div>
        <AddJoke updateJokeList = {updateJokeList} />
        <div className="joke-lists-container">
            <div className="joke-list-container">
                <h2>Untold
                    <span className="untold-count">{untoldJokes.length}</span>
                </h2>
                {untoldJokes.map((joke) => {
                    return ( <section className="joke-list-item" key={joke.id}>
                        <p className="joke-list-item-text">{joke.text}</p>
                        <button className="joke-list-action-toggle" onClick={() => {tellJoke(joke.id)}}>told</button>
                        <button className="joke-list-action-delete" onClick={() => {removeJoke(joke.id)}}>delete</button>
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
                        <button className="joke-list-action-toggle" onClick={() => {untellJoke(joke.id)}}>untold</button>
                        <button className="joke-list-action-delete" onClick={() => {removeJoke(joke.id)}}>delete</button>
                    </section>)
                })}
            </div>
        </div>
    </div>
}
