import { ChangeEvent, useState } from 'react'
import logo from './assets/Logo.svg'
import { GridNoteCard } from './components/note-card/grid-note-card'
import { NewNoteCard } from './components/note-card/new-note-card'
import { NoteCard } from './components/note-card/note-card'

interface Note {
  id: string
  date: Date
  content: string
}

export function App() {
  const [search, setSearch] = useState('')

  const [notes, setNotes] = useState<Note[]>(() => {
    const notesOnStorage = localStorage.getItem('notes')

    if (notesOnStorage) {
      return JSON.parse(notesOnStorage)
    }

    return []
  })

  function onNoteCreated(content: string) {
    const newNote = {
      id: crypto.randomUUID(),
      date: new Date(),
      content,
    }

    const notesArray = [newNote, ...notes]

    setNotes(notesArray)

    localStorage.setItem('notes', JSON.stringify(notesArray))
  }

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    const query = e.target.value

    setSearch(query)
  }

  const filteredNotes =
    search !== ''
      ? notes.filter((note) =>
          note.content.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
        )
      : notes

  return (
    <div className="mx-auto my-12 max-w-6xl space-y-6 px-5">
      <img src={logo} alt="Logo do notes" />

      <form className="w-full">
        <input
          onChange={handleSearch}
          className="w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-slate-500"
          type="text"
          placeholder="Busque em suas notas..."
        />
      </form>

      <div className="h-px bg-slate-700" />

      <GridNoteCard>
        <NewNoteCard onNoteCreated={onNoteCreated} />

        {filteredNotes.map((note) => (
          <NoteCard content={note.content} date={note.date} key={note.id} />
        ))}
      </GridNoteCard>
    </div>
  )
}
