import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  // ... (Tus métodos de Auth existentes se mantienen igual: signUp, login, etc) ...

  /**
   * Guarda las coordenadas en la tabla 'locations' de Supabase
   */
  async saveLocation(latitude: number, longitude: number) {
    // Obtenemos el usuario actual para asociarlo al registro (si tienes el Auth implementado)
    const { data: { session } } = await this.supabase.auth.getSession();
    const userId = session?.user?.id || null;

    const { data, error } = await this.supabase.from('locations').insert([
      { 
        latitude, 
        longitude, 
        user_id: userId,
        // created_at suele autogenerarse en Supabase, pero puedes pasarlo si tu tabla lo requiere
        // created_at: new Date().toISOString() 
      }
    ]);

    if (error) throw error;
    return data;
  }
}