import {setJokeTold, deleteJoke} from "../services/jokeService.jsx"

export const JokeList = ({jokeArray, updateJokeList}) => {
    const toggleJoke = async (joke) => {
        await setJokeTold(joke.id, !joke.told)
        updateJokeList()
    }

    const removeJoke = async (id) => {
        await deleteJoke(id)
        updateJokeList()
    }

    return (
        jokeArray.map((joke) => {
            return ( <section className="joke-list-item" key={joke.id}>
                <p className="joke-list-item-text">{joke.text}</p>
                <button className="joke-list-action-toggle" onClick={() => {toggleJoke(joke)}}>move</button>
                <button className="joke-list-action-delete" onClick={() => {removeJoke(joke.id)}}>delete</button>
            </section>)
        })
    )
}
