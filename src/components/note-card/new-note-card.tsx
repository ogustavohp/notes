import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { ChangeEvent, useState } from 'react'
import { toast } from 'sonner'

interface NewNoteCard {
  onNoteCreated: (content: string) => void
}

let speechRecognition: SpeechRecognition | null = null

export function NewNoteCard({ onNoteCreated }: NewNoteCard) {
  const [shouldShowOnboarding, setShouldShowOnboarding] = useState(true)
  const [isRecording, setIsRecording] = useState(false)
  const [content, setContent] = useState('')

  function handleStartEditor() {
    setShouldShowOnboarding(false)
  }

  function handleContentChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setContent(e.target.value)
    if (e.target.value === '') {
      setShouldShowOnboarding(true)
    }
  }

  function handleSaveNote() {
    onNoteCreated(content)

    if (content === '') {
      return
    }

    setContent('')
    setShouldShowOnboarding(true)

    toast.success('Nota criada com sucesso')
  }

  function handleStartRecording() {
    const isSpeechRecognitionAPIAvailable =
      'SpeechRecognition' in window || 'webkitSpeechRecognition' in window

    if (!isSpeechRecognitionAPIAvailable) {
      return alert('Infelizmente seu navegador não suporta a API de gravação!')
    }

    setIsRecording(true)
    setShouldShowOnboarding(false)

    const SpeechRecognitionAPI =
      window.SpeechRecognition || window.webkitSpeechRecognition

    speechRecognition = new SpeechRecognitionAPI()

    speechRecognition.lang = 'pt-BR'
    speechRecognition.continuous = true
    speechRecognition.maxAlternatives = 1
    speechRecognition.interimResults = true

    speechRecognition.onresult = (e) => {
      const transcription = Array.from(e.results).reduce((text, result) => {
        return text.concat(result[0].transcript)
      }, '')

      setContent(transcription)
    }

    speechRecognition.onerror = (e) => {
      console.error(e)
    }

    speechRecognition.start()
  }

  function handleStopRecording() {
    setIsRecording(false)

    if (speechRecognition !== null) {
      speechRecognition.stop()
    }
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger className="flex flex-col gap-3 rounded-md bg-slate-700 p-5 text-left outline-none hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">
        <span className="text-sm font-medium text-slate-200">
          Adicionar nota
        </span>
        <p className="text-sm leading-6 text-slate-400">
          Grave uma nota de áudio que será convertida para texto
          automaticamente.
        </p>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50">
          <Dialog.Content className="fixed inset-0 flex w-full flex-col overflow-hidden bg-slate-700 outline-none md:inset-auto md:left-1/2 md:top-1/2 md:h-[60vh] md:max-w-[40rem] md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-md">
            <Dialog.Close className="absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100">
              <X className="size-5" />
            </Dialog.Close>

            <form className="flex flex-1 flex-col">
              <div className="flex flex-1 flex-col gap-3 p-5">
                <span className="text-sm font-medium text-slate-300">
                  Adicionar nota
                </span>

                {shouldShowOnboarding ? (
                  <p className="text-sm leading-6 text-slate-400">
                    Comece{' '}
                    <button
                      type="button"
                      onClick={handleStartRecording}
                      className="font-medium text-lime-400 hover:underline"
                    >
                      gravando uma nota
                    </button>{' '}
                    em áudio ou se preferir{' '}
                    <button
                      type="button"
                      onClick={handleStartEditor}
                      className="font-medium text-lime-400 hover:underline"
                    >
                      utilize apenas texto
                    </button>
                    .
                  </p>
                ) : (
                  <textarea
                    onChange={handleContentChange}
                    value={content}
                    autoFocus
                    className="flex-1 resize-none bg-transparent text-sm leading-6 text-slate-400 outline-none"
                  />
                )}
              </div>

              {isRecording ? (
                <button
                  type="button"
                  onClick={handleStopRecording}
                  className="flex w-full animate-pulse items-center justify-center gap-2 bg-slate-900 py-4 text-center text-sm font-medium text-slate-300 hover:text-slate-100"
                >
                  <div className="size-3 rounded-full bg-red-500" />
                  Gravando! (clique para interromper)
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSaveNote}
                  className="w-full bg-lime-400 py-4 text-center text-sm font-medium text-lime-950 hover:bg-lime-500"
                >
                  Salvar nota
                </button>
              )}
            </form>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
