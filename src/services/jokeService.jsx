export const saveJoke = async (newText) => {
    const newJoke = {
        text: newText,
        told: false
    }

    const postOptions = {
    	method: "POST",
        headers: {
        	"Content-Type": "application/json"
        },
        body: JSON.stringify(newJoke)
    }

    await fetch("http://localhost:8088/jokes", postOptions)
}

export const getJokes = async () => {
    const response = await fetch("http://localhost:8088/jokes")
    const jokes = await response.json()
    return jokes
}

export const setJokeTold = async (id, told) => {
    const props = {
        told: told
    }

    const postOptions = {
    	method: "PATCH",
        headers: {
        	"Content-Type": "application/json"
        },
        body: JSON.stringify(props)
    }

    await fetch(`http://localhost:8088/jokes/${id}`, postOptions)
}
