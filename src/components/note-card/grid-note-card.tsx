import { ReactNode } from 'react'

interface GridNoteCard {
  children: ReactNode
}

export function GridNoteCard({ children }: GridNoteCard) {
  return (
    <div className="grid auto-rows-[250px] grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {children}
    </div>
  )
}
