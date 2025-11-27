import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Society, Block, Flat, SocietyState } from '@types'
import { storage, STORAGE_KEYS } from '@utils/storage'

interface SocietyStore extends SocietyState {
  setSelectedSociety: (society: Society | null) => void
  setSocieties: (societies: Society[]) => void
  setBlocks: (blocks: Block[]) => void
  setFlats: (flats: Flat[]) => void
  addSociety: (society: Society) => void
  addBlock: (block: Block) => void
  addFlat: (flat: Flat) => void
}

export const useSocietyStore = create<SocietyStore>()(
  persist(
    (set) => ({
      selectedSociety: storage.get<Society>(STORAGE_KEYS.SELECTED_SOCIETY) || null,
      societies: [],
      blocks: [],
      flats: [],

      setSelectedSociety: (society) => {
        set({ selectedSociety: society })
        if (society) {
          storage.set(STORAGE_KEYS.SELECTED_SOCIETY, society)
        } else {
          storage.remove(STORAGE_KEYS.SELECTED_SOCIETY)
        }
      },

      setSocieties: (societies) => {
        set({ societies })
      },

      setBlocks: (blocks) => {
        set({ blocks })
      },

      setFlats: (flats) => {
        set({ flats })
      },

      addSociety: (society) => {
        set((state) => ({
          societies: [...state.societies, society],
        }))
      },

      addBlock: (block) => {
        set((state) => ({
          blocks: [...state.blocks, block],
        }))
      },

      addFlat: (flat) => {
        set((state) => ({
          flats: [...state.flats, flat],
        }))
      },
    }),
    {
      name: 'society-storage',
      partialize: (state) => ({
        selectedSociety: state.selectedSociety,
      }),
    }
  )
)

