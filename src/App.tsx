import logo from './assets/Logo.svg'
import { GridNoteCard } from './components/note-card/grid-note-card'

export function App() {
  return (
    <div className="mx-auto my-12 max-w-6xl space-y-6">
      <img src={logo} alt="Logo do notes" />

      <form className="w-full">
        <input
          className="w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-slate-500"
          type="text"
          placeholder="Busque em suas notas..."
        />
      </form>

      <div className="h-px bg-slate-700" />

      <GridNoteCard />
    </div>
  )
}
