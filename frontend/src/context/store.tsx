import { create } from 'zustand'
import { ChannelsProps } from '@/components/Chat/types'


type TGameColor = {
    ballColor: string
    racketColor: string
    bgColor: string

    setBallColor: (ballColor: string) => void
    setRacketColor: (racketColor: string) => void
    setBgColor: (bgColor: string) => void
}

export const useGameColor = create<TGameColor>((set) => ({
    ballColor: '0xd0f223',
    racketColor: '0xd0f223',
    bgColor: '0xd0f223',

    setBallColor: (ballColor: string) => set({ ballColor }),
    setRacketColor: (racketColor: string) => set({ racketColor }),
    setBgColor: (bgColor: string) => set({ bgColor }),

}))

// Function to change the state of the active channel.
export const activateClickedChannel = create((set) => ({
    activeChannel: null,
    setActiveChannel: (channel:ChannelsProps) => set({ activeChannel: channel }),
  }));