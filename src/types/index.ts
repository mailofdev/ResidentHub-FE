export enum UserRole {
  ADMIN = 'ADMIN',
  RESIDENT = 'RESIDENT',
}

export interface User {
  id: string
  email: string
  phone?: string
  name: string
  role: UserRole
  avatar?: string
  createdAt: string
  updatedAt: string
}

export interface Society {
  id: string
  name: string
  address: string
  city: string
  state: string
  pincode: string
  blocks?: Block[]
}

export interface Block {
  id: string
  societyId: string
  name: string
  flats?: Flat[]
}

export interface Flat {
  id: string
  blockId: string
  number: string
  floor: number
  residentId?: string
}

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
}

export interface UIState {
  sidebarOpen: boolean
  theme: 'light' | 'dark'
  bottomNavVisible: boolean
}

export interface SocietyState {
  selectedSociety: Society | null
  societies: Society[]
  blocks: Block[]
  flats: Flat[]
}

