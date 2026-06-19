# 📝 Notas Colaborativas en Tiempo Real

Una aplicación web de edición de notas colaborativa donde múltiples usuarios pueden escribir y ver los cambios en tiempo real, desarrollada con un enfoque sólido en el rendimiento del frontend y la sincronización en la nube.

## ✨ Características Principales

* **Sincronización en Tiempo Real:** Los cambios en el editor se reflejan instantáneamente para todos los usuarios conectados.
* **Autenticación Segura:** Inicio de sesión integrado mediante Google (Single Sign-On).
* **Optimización de Escritura:** Implementación de *Debounce* para minimizar las peticiones a la base de datos y mejorar el rendimiento.
* **Arquitectura Escalable:** Frontend estructurado para facilitar la escalabilidad y el mantenimiento continuo.

## 🛠️ Tecnologías Utilizadas

* **Frontend:** React, TypeScript, Vite
* **Backend / BaaS:** Firebase Realtime Database
* **Autenticación:** Firebase Authentication (Google Provider)
* **Gestor de Paquetes:** pnpm
