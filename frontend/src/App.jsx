import { useState, useEffect } from 'react'
import axios from "axios"

function App() {

  const [notes, setNotes] = useState([])

  function fetchNotes() {
    axios.get('https://notes-app-1-w3he.onrender.com/api/notes')
      .then((res) => {
        setNotes(res.data.notes)
      })
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  function handleSubmit(e) {
    e.preventDefault()
    const { title, description } = e.target.elements
    console.log(title.value, description.value);

   axios.post("https://notes-app-1-w3he.onrender.com/api/notes", {
  title: title.value,
  description: description.value
})
      .then(res => {
        console.log(res.data)
        fetchNotes()
      })

  }

  function handleDeleteNote(noteId) {
    axios.delete("https://notes-app-1-w3he.onrender.com/api/notes/" + noteId)
      .then(res => {
        console.log(res.data)
        fetchNotes()
      })

  }

  function handleUpdateNote(note) {

  const newTitle = prompt("Enter new title", note.title)
  const newDescription = prompt("Enter new description", note.description)

  if (!newTitle || !newDescription) return

  axios.patch("https://notes-app-1-w3he.onrender.com/api/notes/" + note._id, {
    title: newTitle,
    description: newDescription
  })
  .then(res => {
    console.log(res.data)
    fetchNotes()
  })
}




  return (
    <>
      <form className='note-create-form' onSubmit={handleSubmit}>
        <input name='title' type="text" placeholder='Enter title' />
        <input name='description' type="text" placeholder='Enter description' />
        <button>Create note</button>

      </form>

      <div className="notes">
        {
          notes.map(note => {
            return <div className="note">
              <h1>{note.title}</h1>
              <p>{note.description}</p>
              <button onClick={() => { handleDeleteNote(note._id) }}>delete</button>
              <button onClick={() => handleUpdateNote(note)}>update</button>

            </div>
          }
          )
        }

      </div>
    </>
  )
}


export default App
