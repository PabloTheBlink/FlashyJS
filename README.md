# Flashy.js 🚀

Una librería de notificaciones elegante y personalizable para JavaScript.

## Características ✨

- 🎨 Múltiples tipos de notificaciones (success, error, warning, info, default)
- 🎯 6 posiciones diferentes (top-left, top-center, top-right, bottom-left, bottom-center, bottom-right)
- 🎭 4 animaciones diferentes (slide, fade, bounce, zoom)
- 🌓 Soporte para temas claro y oscuro
- 📱 Diseño responsive
- ⏱️ Barra de progreso opcional
- 🔄 Personalización completa
- 🎯 Callbacks para interacción
- 🚀 Sin dependencias

## Instalación 📦

### NPM

```bash
npm install @pablotheblink/flashyjs
```

### Yarn

```bash
yarn add @pablotheblink/flashyjs
```

### CDN

```html
<script src="https://unpkg.com/@pablotheblink/flashyjs@1.0.2/flashy.js"></script>
```

## Uso Básico 🚀

### ES Modules

```javascript
import flashy from "@pablotheblink/flashyjs";

flashy("¡Hola Mundo!");
```

### CommonJS

```javascript
const flashy = require("@pablotheblink/flashyjs");

flashy("¡Hola Mundo!");
```

### Script Global

```html
<script src="https://unpkg.com/@pablotheblink/flashyjs@1.0.2/flashy.js"></script>
<script>
  window.flashy("¡Hola Mundo!");
</script>
```

## Tipos de Notificaciones 🎨

```javascript
// Notificación básica
flashy("Mensaje básico");

// Notificación de éxito
flashy.success("¡Operación exitosa!");

// Notificación de error
flashy.error("¡Algo salió mal!");

// Notificación de advertencia
flashy.warning("¡Ten cuidado!");

// Notificación informativa
flashy.info("Información importante");
```

## Opciones de Configuración ⚙️

```javascript
flashy("Mensaje", {
  type: "success", // 'success' | 'error' | 'warning' | 'info' | 'default'
  position: "top-right", // 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'
  duration: 4000, // duración en milisegundos (0 para infinito)
  closable: true, // mostrar botón de cerrar
  animation: "slide", // 'slide' | 'fade' | 'bounce' | 'zoom'
  theme: "light", // 'light' | 'dark'
  icon: "🎉", // icono personalizado
  onClick: () => {}, // callback al hacer clic
  onClose: () => {}, // callback al cerrar
});
```

## Configuración Global 🌍

```javascript
// Establecer opciones por defecto
flashy.setDefaults({
  duration: 5000,
  position: "bottom-right",
  theme: "dark",
});

// Obtener opciones actuales
const options = flashy.getOptions();
```

## Métodos Adicionales 🛠️

```javascript
// Cerrar todas las notificaciones
flashy.closeAll();

// Destruir la instancia y limpiar el DOM
flashy.destroy();
```

## Personalización de Estilos 🎨

La librería incluye estilos predeterminados, pero puedes sobrescribirlos usando CSS:

```css
.flashy-notification {
  /* Tus estilos personalizados */
}
```

## Soporte Móvil 📱

Las notificaciones son completamente responsivas y se adaptan automáticamente a dispositivos móviles.

## Enlaces Útiles 🔗

- **Página en NPM**: https://www.npmjs.com/package/@pablotheblink/flashyjs
- **CDN**: https://unpkg.com/@pablotheblink/flashyjs@1.0.2/flashy.js
- **Repositorio**: https://github.com/pablotheblink/FlashyJS

## Licencia 📄

MIT License - Ver el archivo LICENSE para más detalles.

## Autor 👨‍💻

Pablo Martínez

## Versión 📌

1.0.2
