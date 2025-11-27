import { api } from '@api/client'
import { Society, Block, Flat } from '@types'

class SocietyService {
  async getSocieties(): Promise<Society[]> {
    return api.get<Society[]>('/societies')
  }

  async getSociety(id: string): Promise<Society> {
    return api.get<Society>(`/societies/${id}`)
  }

  async createSociety(data: Partial<Society>): Promise<Society> {
    return api.post<Society>('/societies', data)
  }

  async updateSociety(id: string, data: Partial<Society>): Promise<Society> {
    return api.put<Society>(`/societies/${id}`, data)
  }

  async deleteSociety(id: string): Promise<void> {
    return api.delete<void>(`/societies/${id}`)
  }

  async getBlocks(societyId: string): Promise<Block[]> {
    return api.get<Block[]>(`/societies/${societyId}/blocks`)
  }

  async getFlats(blockId: string): Promise<Flat[]> {
    return api.get<Flat[]>(`/blocks/${blockId}/flats`)
  }
}

export const societyService = new SocietyService()

