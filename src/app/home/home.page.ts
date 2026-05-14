import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { NgIf, DecimalPipe } from '@angular/common'; 
import { 
  IonButton, IonContent, IonHeader, IonTitle, 
  IonToolbar, IonToast, IonIcon 
} from '@ionic/angular/standalone';
import { Browser } from '@capacitor/browser';
import { LocationService } from '../services/location'; // Ajusta la ruta si es necesario
import { SupabaseService } from '../services/supabase.service'; // Ajusta la ruta si es necesario

// Importación de Íconos
import { addIcons } from 'ionicons';
import { 
  locationOutline, refreshOutline, play, 
  stop, cloudUploadOutline, mapOutline 
} from 'ionicons/icons';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonButton, IonToast, IonIcon, NgIf, DecimalPipe
  ],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit, OnDestroy {
  // Estado Reactivo usando Signals
  latitude = signal<number | null>(null);
  longitude = signal<number | null>(null);
  watchId: string | null = null;
  
  errorMsg = signal<string | null>(null);
  successMsg = signal<string | null>(null);
  isSaving = signal<boolean>(false);

  constructor(
    private loc: LocationService,
    private supabaseDb: SupabaseService
  ) {
    // Registro de Íconos para la UI (Crucial para que Angular los muestre)
    addIcons({ 
      locationOutline, refreshOutline, play, 
      stop, cloudUploadOutline, mapOutline 
    });
  }

  async ngOnInit() {
    await this.loc.ensurePermissions();
    await this.obtenerUbicacionActual();
  }

  async obtenerUbicacionActual() {
    try {
      const pos = await this.loc.getCurrentPosition();
      this.actualizarCoordenadas(pos.coords.latitude, pos.coords.longitude);
    } catch (e: any) {
      this.errorMsg.set(e?.message ?? 'Error al obtener la ubicación actual');
    }
  }

  async iniciarSeguimiento() {
    try {
      this.watchId = await this.loc.watchPosition((pos) => {
        this.actualizarCoordenadas(pos.coords.latitude, pos.coords.longitude);
      }, (err) => {
        this.errorMsg.set(err?.message ?? 'Error en seguimiento de ubicación');
      });
    } catch (e: any) {
      this.errorMsg.set(e?.message ?? 'No se pudo iniciar el seguimiento');
    }
  }

  async detenerSeguimiento() {
    if (this.watchId) {
      await this.loc.clearWatch(this.watchId);
      this.watchId = null;
    }
  }

  private actualizarCoordenadas(lat: number, lng: number) {
    this.latitude.set(lat);
    this.longitude.set(lng);
    this.errorMsg.set(null);
  }

  async guardarEnSupabase() {
    const lat = this.latitude();
    const lng = this.longitude();

    if (!lat || !lng) {
      this.errorMsg.set('No hay coordenadas para guardar');
      return;
    }

    this.isSaving.set(true);
    try {
      await this.supabaseDb.saveLocation(lat, lng);
      this.successMsg.set('Ubicación guardada en Supabase con éxito');
    } catch (e: any) {
      this.errorMsg.set(e?.message ?? 'Error al guardar en Supabase');
    } finally {
      this.isSaving.set(false);
    }
  }

  async abrirEnMaps() {
    const lat = this.latitude();
    const lng = this.longitude();
    
    if (lat !== null && lng !== null) {
      // Formato Universal de Mapas. En móviles abrirá la App Nativa.
      const url = `https://maps.google.com/?q=${lat},${lng}`;
      try {
        await Browser.open({ url });
      } catch (e) {
        this.errorMsg.set('No se pudo abrir el mapa.');
      }
    }
  }

  ngOnDestroy() {
    this.detenerSeguimiento();
  }
}