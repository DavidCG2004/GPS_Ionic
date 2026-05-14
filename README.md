# 📍 Mi Ubicación GPS App

Una aplicación híbrida (Web/Móvil) moderna y minimalista construida con **Ionic** y **Angular**, diseñada para rastrear, visualizar y almacenar coordenadas GPS en tiempo real utilizando **Supabase**.

## ✨ Características Principales

- **Geolocalización Nativa y Web:** Obtención de coordenadas GPS precisas utilizando `@capacitor/geolocation`.
- **Seguimiento en Tiempo Real:** Capacidad de iniciar y detener el rastreo continuo de la ubicación.
- **Integración con Supabase:** Almacenamiento persistente de las coordenadas en la nube (PostgreSQL).
- **Deep Linking con Google Maps:** Redirección automática a la aplicación nativa de Google Maps en dispositivos móviles o al navegador web en escritorio.
- **UI Minimalista y Reactiva:** Interfaz de usuario limpia, adaptada a modo claro/oscuro, construida bajo el ecosistema de componentes Standalone y la nueva reactividad de Angular (Signals).

---

## 📸 Capturas de Pantalla

*(Reemplaza las rutas de las imágenes con las capturas reales de tu proyecto)*

<div align="center">
  <figure style="display: inline-block; margin-right: 20px;">
    <img src="<img width="1080" height="2340" alt="WhatsApp Image 2026-05-14 at 3 32 59 PM" src="https://github.com/user-attachments/assets/eeb022aa-74bb-4fe8-93ad-99027a36fade" />
" alt="Vista Móvil" width="250" style="border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);" />
    <figcaption><b>📱 Vista Móvil (Android/iOS)</b></figcaption>
  </figure>
  
  <figure style="display: inline-block;">
    <img src="docs/captura-desktop.jpg" alt="Vista Escritorio" width="600" style="border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);" />
    <figcaption><b>💻 Vista Escritorio (Web)</b></figcaption>
  </figure>
</div>

---

## 🛠️ Stack Tecnológico

- **Framework Front-end:** [Angular](https://angular.io/) (v17+ con Signals y Standalone Components)
- **UI Framework:** [Ionic Framework](https://ionicframework.com/)
- **Capa Nativa:** [Capacitor](https://capacitorjs.com/) (Plugins: Browser, Geolocation)
- **Backend / Base de Datos:** [Supabase](https://supabase.com/) (BaaS / PostgreSQL)

---

## 🏗️ Arquitectura y Buenas Prácticas

Este proyecto está construido siguiendo los principios de **Clean Code** y **Responsabilidad Única (SRP)**:
- `LocationService`: Encapsula toda la lógica de hardware y permisos (GPS).
- `SupabaseService`: Encapsula toda la lógica de comunicación con la base de datos (BaaS).
- `HomePage (Controlador)`: Actúa puramente como orquestador del estado utilizando `Signals` y derivaciones con `computed()`, sin mezclar reglas de negocio complejas.

---

## 🚀 Instalación y Configuración Local

### 1. Pre-requisitos
Asegúrate de tener instalado:
- [Node.js](https://nodejs.org/) (LTS)
- [Ionic CLI](https://ionicframework.com/docs/cli) (`npm install -g @ionic/cli`)

### 2. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/mi-ubicacion-app.git
cd mi-ubicacion-app
