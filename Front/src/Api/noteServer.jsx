import axios from "axios"

const baseUrl = 'http://110.44.119.188:4000/notes'

const getToken = () => `bearer ${window.localStorage.getItem('token')}`

const getAllNotes = () => {
    return axios.get(baseUrl, {
        headers: { Authorization: getToken() }
    })
}

const addNote = (newNote) => {
    return axios.post(baseUrl, newNote, {
        headers: { Authorization: getToken() }
    })
}

const updateNote = (noteId, updatedContent) => {
    return axios.put(`${baseUrl}/${noteId}`, updatedContent, {
        headers: { Authorization: getToken() }
    })
}

const deleteNote = (noteId) => {
    return axios.delete(`${baseUrl}/${noteId}`, {
        headers: { Authorization: getToken() }
    })
}

const noteService = {
    getAllNotes,
    addNote,
    updateNote,
    deleteNote
}

export default noteService