import { NewNoteCard } from './new-note-card'
import { NoteCard } from './note-cards'

export function GridNoteCard() {
  return (
    <div className="grid auto-rows-[250px] grid-cols-3 gap-6">
      <NewNoteCard />
      <NoteCard
        title="há 1 dia"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci error praesentium dolorum! Itaque voluptatem quae voluptate esse labore minus omnis dolorem! Provident perferendis saepe error itaque aspernatur nulla illum quo."
      />
      <NoteCard
        title="há 3 dia"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni quas vitae perspiciatis aperiam, modi laborum libero! Magnam ipsam minus optio tenetur fuga quae praesentium soluta placeat, veniam, eius tempora doloribus?"
      />

      <NoteCard
        title="há 4 dia"
        description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum perspiciatis non nihil harum dolor maiores quia, quaerat possimus voluptate natus? Distinctio itaque ad sequi odio nostrum. Officia repudiandae aspernatur sit."
      />

      <NoteCard
        title="há 5 dia"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor expedita consequuntur eligendi obcaecati dignissimos numquam ratione mollitia, est perspiciatis aspernatur id harum corporis voluptatem quod in labore cumque blanditiis! Aliquid."
      />
    </div>
  )
}
