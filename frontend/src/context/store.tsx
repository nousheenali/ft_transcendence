import { create } from 'zustand'



type TGameColor = {
    ballColor: string
    racketColor: string
    bgColor: string

    setBallColor: (ballColor: string) => void
    setRacketColor: (racketColor: string) => void
    setBgColor: (bgColor: string) => void
}

export const useGameColor = create<TGameColor>((set) => ({
    ballColor: 'blue',
    racketColor: 'blue',
    bgColor: 'blue',

    setBallColor: (ballColor: string) => set({ ballColor }),
    setRacketColor: (racketColor: string) => set({ racketColor }),
    setBgColor: (bgColor: string) => set({ bgColor }),

}))
