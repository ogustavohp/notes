import { ReactNode } from 'react'

interface GridNoteCard {
  children: ReactNode
}

export function GridNoteCard({ children }: GridNoteCard) {
  return (
    <div className="grid auto-rows-[250px] grid-cols-3 gap-6">{children}</div>
  )
}
