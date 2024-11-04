'use client'

import { z } from 'zod'
import {
  type ReactNode,
  createContext,
  use,
  useContext,
  useOptimistic,
  useMemo,
} from 'react'

const StuffSchema = z.object({
  id: z.number(),
  description: z.string(),
})

type Stuff = z.infer<typeof StuffSchema>

type Action =
  | { type: 'ADD'; payload: Stuff }
  | { type: 'UPDATE'; payload: Stuff }
  | { type: 'DELETE'; payload: number }

type StuffContextType = {
  stuff: Stuff[]
  addStuff: (formData: FormData) => void
  updateStuff: (formData: FormData) => void
  deleteStuff: (formData: FormData) => void
}

const StuffContext = createContext<StuffContextType | undefined>(undefined)

function stuffReducer(state: Stuff[], action: Action): Stuff[] {
  const currentStuff = state || ([] as Stuff[])

  switch (action.type) {
    case 'ADD':
      return [
        ...currentStuff,
        {
          id: 99,
          description: action.payload.description,
        },
      ]
    case 'UPDATE':
      const filtered = currentStuff.filter(
        (stuff) => stuff.id !== action.payload.id
      )
      return [...filtered, action.payload].toSorted((a, b) => a.id - b.id)
    case 'DELETE':
      return [...currentStuff.filter((stuff) => stuff.id !== action.payload)]
    default:
      return currentStuff
  }
}

export function StuffProvider({
  children,
  stuffPromise,
}: {
  children: ReactNode
  stuffPromise: Promise<Stuff[]>
}) {
  const initialStuff = use(stuffPromise)
  const [optimisticStuff, updateOptimisticStuff] = useOptimistic(
    initialStuff,
    stuffReducer
  )

  const addStuff = (formData: FormData) => {
    const data = Object.fromEntries(formData.entries())
    const newStuff = StuffSchema.parse(data)
    updateOptimisticStuff({
      type: 'ADD',
      payload: newStuff,
    })
  }

  const updateStuff = (formData: FormData) => {
    const data = Object.fromEntries(formData.entries())
    const stuff = StuffSchema.parse(data)
    updateOptimisticStuff({
      type: 'UPDATE',
      payload: stuff,
    })
  }

  const deleteStuff = (formData: FormData) => {
    const data = Object.fromEntries(formData.entries())
    const parsed = z.object({ id: z.number() }).parse(data)
    updateOptimisticStuff({
      type: 'DELETE',
      payload: parsed.id,
    })
  }

  const value = useMemo(
    () => ({
      stuff: optimisticStuff,
      addStuff,
      updateStuff,
      deleteStuff,
    }),
    [optimisticStuff]
  )

  return <StuffContext.Provider value={value}>{children}</StuffContext.Provider>
}

export function useStuff() {
  const context = useContext(StuffContext)
  if (context === undefined) {
    throw new Error('StuffProvider not found')
  }
  return context
}
