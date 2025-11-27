import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User, UserRole, AuthState } from '@types'
import { authService } from '@services/auth.service'
import { storage, STORAGE_KEYS } from '@utils/storage'

interface AuthStore extends AuthState {
  setUser: (user: User | null) => void
  setToken: (token: string | null) => void
  login: (email: string, password: string) => Promise<void>
  loginWithPhone: (phone: string, otp?: string) => Promise<{ otpSent?: boolean }>
  signup: (data: {
    email: string
    password: string
    name: string
    role: UserRole
    phone?: string
  }) => Promise<void>
  logout: () => Promise<void>
  checkAuth: () => Promise<void>
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: true,

      setUser: (user) => {
        set({ user, isAuthenticated: !!user })
      },

      setToken: (token) => {
        set({ token })
        if (token) {
          storage.set(STORAGE_KEYS.AUTH_TOKEN, token)
        } else {
          storage.remove(STORAGE_KEYS.AUTH_TOKEN)
        }
      },

      login: async (email, password) => {
        set({ isLoading: true })
        try {
          const result = await authService.loginWithEmail(email, password)
          set({
            user: result.user,
            token: result.token,
            isAuthenticated: true,
            isLoading: false,
          })
        } catch (error) {
          set({ isLoading: false })
          throw error
        }
      },

      loginWithPhone: async (phone, otp) => {
        set({ isLoading: true })
        try {
          const result = await authService.loginWithPhone(phone, otp)
          if (result.otpSent) {
            set({ isLoading: false })
            return { otpSent: true }
          }
          set({
            user: result.user,
            token: result.token,
            isAuthenticated: true,
            isLoading: false,
          })
          return {}
        } catch (error) {
          set({ isLoading: false })
          throw error
        }
      },

      signup: async (data) => {
        set({ isLoading: true })
        try {
          const result = await authService.signup(data)
          set({
            user: result.user,
            token: result.token,
            isAuthenticated: true,
            isLoading: false,
          })
        } catch (error) {
          set({ isLoading: false })
          throw error
        }
      },

      logout: async () => {
        set({ isLoading: true })
        try {
          await authService.logout()
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
          })
        } catch (error) {
          set({ isLoading: false })
          throw error
        }
      },

      checkAuth: async () => {
        set({ isLoading: true })
        try {
          const user = await authService.getCurrentUser()
          const token = storage.get<string>(STORAGE_KEYS.AUTH_TOKEN)
          set({
            user,
            token,
            isAuthenticated: !!user && !!token,
            isLoading: false,
          })
        } catch (error) {
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
          })
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)

