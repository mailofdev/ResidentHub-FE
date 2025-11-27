import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { storage } from './firebase'

class StorageService {
  async uploadFile(file: File, path: string): Promise<string> {
    const storageRef = ref(storage, path)
    await uploadBytes(storageRef, file)
    return await getDownloadURL(storageRef)
  }

  async deleteFile(path: string): Promise<void> {
    const storageRef = ref(storage, path)
    await deleteObject(storageRef)
  }

  async uploadImage(file: File, folder: string = 'images'): Promise<string> {
    const timestamp = Date.now()
    const fileName = `${folder}/${timestamp}_${file.name}`
    return await this.uploadFile(file, fileName)
  }
}

export const storageService = new StorageService()

