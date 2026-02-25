# Flashy.js 🔥💥

¿Cansado de notificaciones aburridas que parecen de los 90s? ¡Flashy.js llegó para revolucionar tu vida! 😎

Una librería de notificaciones tan elegante que hasta tu ex se va a poner celosa. 💅✨

## ¿Por qué Flashy.js es tan genial? 🤩

- 🎨 Múltiples tipos de notificaciones (porque la vida no es solo success o error, ¿verdad?)
- 🎯 6 posiciones diferentes (como un sniper de notificaciones)
- 🎭 4 animaciones que harán que tus usuarios se enamoren
- 🌓 Temas claro y oscuro (para todos los vampiros programadores)
- 📱 Responsive como tú después del café
- ⏱️ Barra de progreso que es más puntual que tu jefe
- 🔄 Más personalizable que tu perfil de dating
- 🎯 Callbacks para cuando quieras ser stalker de tus notificaciones
- 🚀 Sin dependencias (independiente como deberías ser tú)

## Instalación 📦 (Más fácil que ligarse a alguien en una app)

### NPM (Para los pros)

```bash
npm install @pablotheblink/flashyjs
```

### Yarn (Para los hipsters)

```bash
yarn add @pablotheblink/flashyjs
```

### CDN (Para los que viven al límite)

```html
<script src="https://unpkg.com/@pablotheblink/flashyjs@1.0.4/flashy.js"></script>
```

## Uso Básico 🚀 (Tan simple que tu mascota podría hacerlo)

### ES Modules (Moderno y sexy)

```javascript
import flashy from "@pablotheblink/flashyjs";

flashy("¡Hola Mundo Cruel!"); // Con actitud 😈
```

### CommonJS (Clásico pero efectivo)

```javascript
const flashy = require("@pablotheblink/flashyjs");

flashy("¡Saludos terrícolas!"); // Feeling alien 👽
```

### Script Global (Old school pero con estilo)

```html
<script src="https://unpkg.com/@pablotheblink/flashyjs@1.0.4/flashy.js"></script>
<script>
  window.flashy("¡El show debe continuar!"); // Drama queen mode 🎭
</script>
```

## Tipos de Notificaciones 🎨 (Para todas las personalidades)

```javascript
// Notificación básica (para los tímidos)
flashy("Mensaje básico... o no tan básico 🤫");

// Notificación de éxito (celebra como si fuera viernes)
flashy.success("¡Lo lograste, crack! 🎉");

// Notificación de error (la vida no siempre es color de rosa)
flashy.error("¡Ups! Alguien la regó 💩");

// Notificación de advertencia (tu conciencia hablando)
flashy.warning("¡Ojo al piojo! 👁️");

// Notificación informativa (el sabelotodo del grupo)
flashy.info("Dato curioso que nadie pidió 🤓");
```

## Configuración Avanzada ⚙️ (Para los perfeccionistas obsesivos)

```javascript
flashy("Soy una notificación con actitud", {
  type: "success", // Porque merezco celebrar
  position: "top-right", // La esquina VIP
  duration: 4000, // 4 segundos de gloria
  closable: true, // Por si te aburres de mí
  animation: "slide", // Entrada triunfal
  theme: "dark", // Porque soy misterioso
  icon: "🔥", // Calentito como mi personalidad
  onClick: () => console.log("¡Me tocaste! 😏"), // Interacción picante
  onClose: () => console.log("Adiós cruel mundo 😢"), // Drama hasta el final
});
```

## Configuración Global 🌍 (Porque eres el jefe de tu código)

```javascript
// Establece las reglas del juego
flashy.setDefaults({
  duration: 5000, // 5 segundos de fama
  position: "bottom-right", // Mi lugar favorito
  theme: "dark", // Lado oscuro activado
});

// Espía las opciones actuales (stalker mode)
const options = flashy.getOptions();
```

## Métodos de Control 🛠️ (El poder en tus manos)

```javascript
// Silencia a todas las notificaciones (dictador mode)
flashy.closeAll();

// Destruye todo y desaparece sin dejar rastro (ninja mode)
flashy.destroy();
```

## Personalización de Estilos 🎨 (Hazlo tuyo, tigre)

```css
.flashy-notification {
  /* Aquí va tu creatividad desbordante */
  /* Haz que brillen más que tu futuro */
}
```

## Soporte Móvil 📱 (Porque también los smartphones merecen amor)

Nuestras notificaciones son tan responsivas que se adaptan mejor que tú a los cambios de la vida. 💪

## Enlaces Útiles 🔗 (Para los curiosos)

- **NPM**: https://www.npmjs.com/package/@pablotheblink/flashyjs (Donde vive la magia)
- **CDN**: https://unpkg.com/@pablotheblink/flashyjs@1.0.5/flashy.js (Acceso directo al paraíso)
- **GitHub**: https://github.com/pablotheblink/FlashyJS (El laboratorio secreto)

## Licencia 📄 (Lo legal y aburrido)

MIT License - Básicamente puedes hacer lo que quieras, pero no nos culpes si te vuelves adicto.

## El Genio Detrás de la Locura 👨‍💻

Pablo Martínez - El tipo que pensó que el mundo necesitaba notificaciones más sexys.

## Versión Actual 📌

1.0.5 - "Rediseño visual moderno" ✨
