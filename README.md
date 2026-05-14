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

**📱 Vista Móvil (Android/iOS)**  
![Vista Móvil](https://github.com/user-attachments/assets/eeb022aa-74bb-4fe8-93ad-99027a36fade)

**💻 Vista Escritorio (Web)**  
![Vista Escritorio](https://github.com/user-attachments/assets/fdaae57a-1dbd-40d2-8e9f-f466a5b3a961)

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
