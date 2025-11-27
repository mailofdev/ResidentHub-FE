import { supabase } from './supabase'
import { User, UserRole } from '@types'
import { storage, STORAGE_KEYS } from '@utils/storage'

export interface LoginCredentials {
  email?: string
  phone?: string
  password?: string
  otp?: string
}

export interface SignupData {
  email: string
  phone?: string
  password: string
  name: string
  role: UserRole
}

class AuthService {
  async loginWithEmail(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error

    if (data.session) {
      const user = await this.getUserProfile(data.user.id)
      storage.set(STORAGE_KEYS.AUTH_TOKEN, data.session.access_token)
      storage.set(STORAGE_KEYS.USER, user)
      return { user, token: data.session.access_token }
    }

    throw new Error('Login failed')
  }

  async loginWithPhone(phone: string, otp?: string) {
    if (!otp) {
      // Send OTP
      const { error } = await supabase.auth.signInWithOtp({
        phone,
      })
      if (error) throw error
      return { otpSent: true }
    } else {
      // Verify OTP
      const { data, error } = await supabase.auth.verifyOtp({
        phone,
        token: otp,
        type: 'sms',
      })

      if (error) throw error

      if (data.session) {
        const user = await this.getUserProfile(data.user.id)
        storage.set(STORAGE_KEYS.AUTH_TOKEN, data.session.access_token)
        storage.set(STORAGE_KEYS.USER, user)
        return { user, token: data.session.access_token }
      }

      throw new Error('OTP verification failed')
    }
  }

  async signup(data: SignupData) {
    const { data: authData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      phone: data.phone,
      options: {
        data: {
          name: data.name,
          role: data.role,
        },
      },
    })

    if (error) throw error

    if (authData.session) {
      const user = await this.getUserProfile(authData.user.id)
      storage.set(STORAGE_KEYS.AUTH_TOKEN, authData.session.access_token)
      storage.set(STORAGE_KEYS.USER, user)
      return { user, token: authData.session.access_token }
    }

    throw new Error('Signup failed')
  }

  async logout() {
    await supabase.auth.signOut()
    storage.remove(STORAGE_KEYS.AUTH_TOKEN)
    storage.remove(STORAGE_KEYS.USER)
  }

  async getUserProfile(userId: string): Promise<User> {
    // This should fetch from your backend API
    // For now, returning a mock structure
    const { data: authUser } = await supabase.auth.getUser()
    
    return {
      id: authUser.user?.id || userId,
      email: authUser.user?.email || '',
      phone: authUser.user?.phone || undefined,
      name: (authUser.user?.user_metadata?.name as string) || '',
      role: (authUser.user?.user_metadata?.role as UserRole) || UserRole.RESIDENT,
      avatar: authUser.user?.user_metadata?.avatar,
      createdAt: authUser.user?.created_at || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  }

  async getCurrentUser(): Promise<User | null> {
    const user = storage.get<User>(STORAGE_KEYS.USER)
    if (user) return user

    const { data } = await supabase.auth.getUser()
    if (data.user) {
      return await this.getUserProfile(data.user.id)
    }

    return null
  }
}

export const authService = new AuthService()

