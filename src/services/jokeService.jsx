export const saveJoke = (newText) => {
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

    fetch("http://localhost:8088/jokes", postOptions)
}
