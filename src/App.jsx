import {useEffect, useState} from "react"
import "./App.css"
import {getJokes} from "./services/jokeService.jsx"
import {AddJoke} from "./components/AddJoke.jsx"
import {JokeList} from "./components/JokeList.jsx"
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
                <JokeList jokeArray = {untoldJokes} updateJokeList = {updateJokeList} />
            </div>
            <div className="joke-list-container">
                <h2>Told
                    <span className="told-count">{toldJokes.length}</span>
                </h2>
                <JokeList jokeArray = {toldJokes} updateJokeList = {updateJokeList}/>
            </div>
        </div>
    </div>
}
