import { Injectable } from '@angular/core';
import { Geolocation, PermissionStatus, Position } from '@capacitor/geolocation';
import { Capacitor } from '@capacitor/core'; // <-- Importar Capacitor

@Injectable({ providedIn: 'root' })
export class LocationService {
  
  async ensurePermissions(): Promise<PermissionStatus> {
    if (Capacitor.getPlatform() === 'web') {
      return { location: 'granted', coarseLocation: 'granted' };
    }

    const perm = await Geolocation.checkPermissions();
    if (perm.location === 'granted' || perm.coarseLocation === 'granted') return perm;
    return Geolocation.requestPermissions();
  }

  async getCurrentPosition(): Promise<Position> {
    return Geolocation.getCurrentPosition({ enableHighAccuracy: true });
  }

  async watchPosition(onPos: (p: Position) => void, onErr?: (e: any) => void): Promise<string> {
    const id = await Geolocation.watchPosition(
      { enableHighAccuracy: true },
      (pos, err) => {
        if (pos) onPos(pos);
        else if (err && onErr) onErr(err);
      }
    );
    // Capacitor v6 devuelve string; en v5 podía ser string|null
    return id as unknown as string;
  }

  async clearWatch(id: string): Promise<void> {
    await Geolocation.clearWatch({ id });
  }
}