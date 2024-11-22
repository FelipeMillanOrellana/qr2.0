import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class EmailStorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    // Inicializar almacenamiento
    const storage = await this.storage.create();
    this._storage = storage;
  }

  // Guardar correos
  async saveEmail(type: 'profesor' | 'estudiante', email: string): Promise<void> {
    const key = `${type}-emails`;
    const emails = (await this._storage?.get(key)) || [];
    emails.push(email);
    await this._storage?.set(key, emails);
  }

  // Obtener correos
  async getEmails(type: 'profesor' | 'estudiante'): Promise<string[]> {
    const key = `${type}-emails`;
    return (await this._storage?.get(key)) || [];
  }

  // Eliminar un correo
  async deleteEmail(type: 'profesor' | 'estudiante', email: string): Promise<void> {
    const key = `${type}-emails`;
    const emails = (await this._storage?.get(key)) || [];
    const updatedEmails = emails.filter((e: string) => e !== email);
    await this._storage?.set(key, updatedEmails);
  }

  // Vaciar todos los correos de un tipo
  async clearEmails(type: 'profesor' | 'estudiante'): Promise<void> {
    const key = `${type}-emails`;
    await this._storage?.remove(key);
  }
}
