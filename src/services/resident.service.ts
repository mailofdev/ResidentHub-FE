import { api } from '@api/client'
import { User } from '@types'

class ResidentService {
  async getResidents(): Promise<User[]> {
    return api.get<User[]>('/residents')
  }

  async getResident(id: string): Promise<User> {
    return api.get<User>(`/residents/${id}`)
  }

  async createResident(data: Partial<User>): Promise<User> {
    return api.post<User>('/residents', data)
  }

  async updateResident(id: string, data: Partial<User>): Promise<User> {
    return api.put<User>(`/residents/${id}`, data)
  }

  async deleteResident(id: string): Promise<void> {
    return api.delete<void>(`/residents/${id}`)
  }
}

export const residentService = new ResidentService()

