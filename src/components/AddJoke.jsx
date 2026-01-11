import { saveJoke } from "../services/jokeService"
import { useState } from "react"

export const AddJoke = ({updateJokeList}) => {
    const [newJoke, setNewJoke] = useState("")

    const saveButton = async () => {
        await saveJoke(newJoke)
        setNewJoke("")
        updateJokeList()
    }

    return (
        <>
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
        </>
    )
}

