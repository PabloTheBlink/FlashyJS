# FlashyJS 🔥

Notificaciones ligeras para JavaScript: vanilla, cero dependencias en el núcleo y API directa. La **[web oficial](https://flashyjs.pablomsj.com)** incluye la demo en vivo, el playground y código copiable. `demo.html` es una vista local de desarrollo.

## Instalación

```bash
npm install @pablotheblink/flashyjs
```

```js
import flashy from '@pablotheblink/flashyjs';

flashy('Hola');
flashy.success('Guardado');
flashy.error('Algo salió mal');
flashy.warning('Revisa los datos');
flashy.info('Hay novedades');
```

CommonJS: `const flashy = require('@pablotheblink/flashyjs')`. Para un `<script>` clásico usa `https://unpkg.com/@pablotheblink/flashyjs@2.0.0/dist/flashy.umd.min.js` y llama a `window.flashy(...)`. También sigue disponible `flashy.js` para páginas que ya lo cargan directamente.

## What's new in 2.0

- Entrada con rebote suave, pila con profundidad 3D, expansión al hover y descarte con gesto horizontal e inercia.
- `flashy.promise()` conserva el mismo aviso: el aro de carga se transforma en check o cruz.
- Temas `light`, `dark` y `auto`; `glass` sutil, `midnight` oscuro liso y `aurora` conservado como superficie pizarra lisa por compatibilidad.
- Descripción, imagen o avatar y botón de acción con callback.
- [Demo jugable](https://flashyjs.pablomsj.com) en la web oficial. `demo.html` se usa solo durante el desarrollo.

### Un aviso para compartir

```js
flashy.success('Tu archivo está listo', {
  theme: 'dark',
  description: 'Se ha guardado correctamente.',
  image: '/avatar.jpg',
  imageAlt: 'Foto de Ana',
  action: { label: 'Deshacer', onClick: () => restoreFile() },
});
```

La descripción es texto plano, igual que el título. `image` acepta una URL; usa `imageAlt` si la imagen aporta información y una cadena vacía si es decorativa. La acción es un botón real y su callback no dispara `onClick` del aviso.

### Promesas

`flashy.promise` muestra un único toast: cargando → éxito o error. Devuelve una promesa que conserva el resultado o el rechazo original.

```js
await flashy.promise(() => fetch('/api/save').then(r => {
  if (!r.ok) throw new Error('No se pudo guardar');
  return r.json();
}), {
  loading: 'Guardando…',
  success: data => `Guardado #${data.id}`,
  error: error => error.message,
});
```

`success` y `error` también aceptan cadenas. El toast de carga no se cierra por tiempo; el estado final usa la duración global.

### Pila, tiempos y accesibilidad

Los toasts se apilan por posición con escala, profundidad y sombra. Al pasar el ratón o tocar la pila, esta se expande. Arrastra un aviso con ratón o dedo hacia un lado para descartarlo: cuenta la distancia o la velocidad del gesto. `visibleToasts` fija cuántos quedan visibles; los más antiguos se ocultan. Los temporizadores se pausan al pasar el ratón por la pila y cuando la pestaña pierde visibilidad. Escape cierra el toast visible más reciente.

```js
flashy.setDefaults({ position: 'top-right', visibleToasts: 3, duration: 4000 });
flashy.success('Listo', { duration: 6000 });
```

Los estados normales usan `role="status"` y los errores y avisos usan `role="alert"`, con `aria-live` acorde. FlashyJS no mueve el foco y respeta `prefers-reduced-motion`; el movimiento se elimina sin ocultar el contenido.

### Tema y personalización

```js
flashy.setDefaults({ theme: 'glass' });
flashy('Cristal', { theme: 'glass' });
flashy('Pizarra', { theme: 'aurora' }); // alias compatible sin degradados
flashy('Medianoche', { theme: 'midnight' });
// También: light, dark, auto
```

```css
:root {
  --flashy-light-bg: #fffdf8;
  --flashy-dark-bg: #171717;
  --flashy-success: #00875a;
  --flashy-border-radius: 8px;
  --flashy-gap: 12px;
}
```

Variables públicas en `:root` o en un contenedor específico:

| Variable | Uso |
| --- | --- |
| `--flashy-light-bg`, `--flashy-light-text`, `--flashy-light-border` | Superficie, texto y borde del tema claro. |
| `--flashy-dark-bg`, `--flashy-dark-text`, `--flashy-dark-border` | Equivalentes del tema oscuro y `auto` oscuro. |
| `--flashy-glass-bg`, `--flashy-glass-text`, `--flashy-glass-border` | Cristal esmerilado y borde de luz. |
| `--flashy-aurora-bg`, `--flashy-aurora-text` | Base y texto de la superficie pizarra. |
| `--flashy-midnight-bg`, `--flashy-midnight-text` | Base y texto del tema medianoche. |
| `--flashy-success`, `--flashy-error`, `--flashy-warning`, `--flashy-info`, `--flashy-default` | Acento de cada tipo. |
| `--flashy-font-family`, `--flashy-font-size` | Tipografía. |
| `--flashy-border-radius`, `--flashy-gap`, `--flashy-shadow`, `--flashy-action-bg` | Forma, separación, sombra y fondo de acción. |

El botón de acción usa el acento del tipo; `glass` aplica un desenfoque leve y un borde fino.

### React opcional

React no forma parte del núcleo. Si usas React, instálalo en tu aplicación y usa la entrada separada:

```jsx
import { Toaster, useFlashy } from '@pablotheblink/flashyjs/react';

function SaveButton() {
  const flashy = useFlashy();
  return <button onClick={() => flashy.success('Guardado')}>Guardar</button>;
}

function App() {
  return <><Toaster theme="auto" visibleToasts={4} /><SaveButton /></>;
}
```

`<Toaster/>` configura los valores globales; el núcleo crea el contenedor al mostrar el primer toast. Monta un solo `<Toaster/>` por aplicación.

## API 1.x conservada

La llamada `flashy(message, options?)`, las abreviaturas `success/error/warning/info`, la función de cierre que devuelve cada llamada, `closeAll`, `setDefaults`, `getOptions`, `destroy`, posiciones, animaciones, callbacks, iconos y la entrada global siguen disponibles. `options` puede ser una cadena de tipo como antes.

El empaquetado cambia: los imports ESM usan `dist/flashy.mjs`, CommonJS usa `dist/flashy.cjs` y el script CDN recomendado usa el UMD minificado. El fichero `flashy.js` se conserva para enlaces directos existentes. La versión mínima de Node para herramientas y exports modernos es 18; el núcleo del navegador no necesita Node.

## Desarrollo

```bash
npm install
npm run build
npm test
```

El build crea ESM, CJS y UMD minificado en `dist/` e informa del tamaño gzip. Las pruebas usan `node:test` y un DOM ligero local.

Licencia MIT · [GitHub](https://github.com/pablotheblink/FlashyJS)
