# Guía de Contribución - Flashy.js 🤝

¡Ey, futuro héroe del código! 🦸‍♂️ ¿Así que quieres unirte a la banda de Flashy.js? ¡Perfecto! Este documento es tu mapa del tesoro para no perderte en el camino y convertirte en un/a contribuidor/a de leyenda.

## 📋 Tabla de Contenidos

- [Código de Conducta (o "Cómo no ser un troll")](#código-de-conducta)
- [Cómo Contribuir (Las mil y una formas de brillar)](#cómo-contribuir)
- [Configuración del Entorno de Desarrollo (Preparando tu guarida)](#configuración-del-entorno-de-desarrollo)
- [Proceso de Desarrollo (El arte de la programación ninja)](#proceso-de-desarrollo)
- [Estándares de Código (Porque el caos no mola)](#estándares-de-código)
- [Reportar Errores (Cazando bugs como un pro)](#reportar-errores)
- [Sugerir Nuevas Funcionalidades (¡Suelta tu creatividad!)](#sugerir-nuevas-funcionalidades)
- [Pull Requests (El momento de la verdad)](#pull-requests)
- [Versionado (Números que importan)](#versionado)
- [Licencia (Lo legal, pero en buena onda)](#licencia)

## 🤝 Código de Conducta

¡Ojo! Aquí no somos salvajes. Este proyecto tiene reglas (como cualquier buen juego). Al participar, prometemos no convertirnos en trolls de internet y mantener la buena vibra. Si alguien se porta mal, no dudes en chivatearlo... digo, reportarlo 😏.

### Nuestros Estándares (aka "Cómo ser genial")

**Comportamientos que nos hacen sonreír:**

- Hablar bonito (sí, incluso cuando el código no compila)
- Respetar las ideas raras de otros (todas las ideas son raras hasta que funcionan)
- Aceptar críticas sin ponerse dramático/a
- Pensar en el bien común (somos una gran familia disfuncional)
- Ser empático/a (recordar que detrás de cada commit hay un humano con sentimientos)

## 🚀 Cómo Contribuir (Las mil maneras de ser útil)

¿Quieres formar parte de la magia? Aquí tienes las opciones (elige tu propia aventura):

### 1. Reportar Errores 🐛 (El trabajo sucio pero necesario)

- Usa nuestro [sistema de issues](https://github.com/pablotheblink/FlashyJS/issues) (no, no envíes palomas mensajeras)
- Describe el problema como si se lo contaras a tu abuela
- Incluye pasos para reproducir el error (sí, paso a paso, como una receta)
- Comparte info de tu navegador (Chrome, Firefox, Internet Explorer del 2005... no, eso no)

### 2. Sugerir Mejoras 💡 (Sé el visionario que todos necesitamos)

- Abre un issue para que charlemos de tu idea genial
- Explica por qué el mundo necesita tu feature
- Mantén los pies en la tierra (nada de "que cure el cáncer", por favor)

### 3. Escribir Código 💻 (Donde la magia sucede)

- Arregla bugs (sé el exterminador de bichos)
- Implementa features nuevas (el constructor de sueños)
- Mejora la documentación (el salvador de almas perdidas)
- Escribe tests (sí, lo sé, es aburrido, pero alguien tiene que hacerlo)

### 4. Mejorar Documentación 📚 (El héroe no reconocido)

- Corrige esos typos que nos dan vergüenza ajena
- Explica cosas como si fueras un profesor cool
- Añade ejemplos que no den pereza leer
- Traduce contenido (spreading the love worldwide)

## 🛠️ Configuración del Entorno de Desarrollo (Montando tu laboratorio)

### Prerrequisitos (Lo que necesitas para no morir en el intento)

- Node.js (versión 14 o superior, porque vivimos en el siglo XXI)
- npm o yarn (el que prefieras, no juzgamos)
- Git (obvio, ¿no?)

### Configuración Inicial (El ritual de iniciación)

1. **Fork del repositorio** (Tu primera travesura)

   ```bash
   # Haz fork del repositorio en GitHub (botoncito de arriba a la derecha)
   # Luego clona tu fork (tu copia personal)
   git clone https://github.com/TU_USUARIO/FlashyJS.git
   cd FlashyJS
   ```

2. **Configurar remotes** (Conectando los cables)

   ```bash
   git remote add upstream https://github.com/pablotheblink/FlashyJS.git
   git remote -v  # Para verificar que no la cagaste
   ```

3. **Instalar dependencias** (Alimentando a la bestia)
   ```bash
   npm install
   # o si eres team yarn
   yarn install
   ```

### Estructura del Proyecto (El mapa del tesoro)

```
FlashyJS/
├── flashy.js          # El corazón del proyecto (tócalo con cariño)
├── flashy.d.ts        # Para los fans de TypeScript
├── index.html         # Documentación y ejemplos (la cara bonita)
├── package.json       # La configuración sagrada
├── README.md          # El manual de supervivencia
├── CONTRIBUTING.md    # Este documento tan molón
└── .git/              # La magia negra de Git
```

## 🔄 Proceso de Desarrollo (El arte de no cagarla)

### 1. Crear una Rama (Divide y vencerás)

```bash
# Asegúrate de estar en main y actualizado (limpieza mental)
git checkout main
git pull upstream main

# Crea una nueva rama para tu obra maestra
git checkout -b feature/mi-idea-genial
# o para los arregladores de desastres
git checkout -b fix/ese-bug-molesto
```

### 2. Realizar Cambios (Donde la creatividad fluye)

- Haz tus cambios sin miedo (pero con cerebro)
- Mantén los cambios enfocados (no hagas un frankenstein)
- Commits frecuentes con mensajes que no den vergüenza

### 3. Probar los Cambios (El momento de la verdad)

```bash
# Abre index.html en tu navegador favorito
# Prueba todo lo que tocaste (y lo que no también)
# Asegúrate de que funciona en más de un navegador
```

### 4. Documentar (Para las generaciones futuras)

- Actualiza la documentación si tocaste algo importante
- Añade ejemplos que no requieran un doctorado para entender
- Comenta el código complejo (tu yo del futuro te lo agradecerá)

## 📝 Estándares de Código (Porque el caos no es cool)

### JavaScript (El lenguaje de los valientes)

- **Estilo**: Mantén la consistencia (somos una familia, no un circo)
- **ES6+**: Usa lo moderno (estamos en 2025, no en la edad de piedra)
- **Comentarios**: Explica lo raro (y también lo obvio, por si acaso)
- **Nombres**: Que sean descriptivos, no jeroglíficos

```javascript
// ✅ Así mola
function showNotification(message, options = {}) {
  const config = {
    type: "default",
    duration: 4000,
    ...options,
  };
  // Aquí pasa la magia de mostrar notificaciones
}

// ❌ Así no, por favor
function show(msg, opts) {
  // ¿Qué hace esto? Ni idea...
}
```

### Compatibilidad (Para que funcione hasta en la nevera)

- **Navegadores**: Compatibles con navegadores modernos (IE6 no cuenta)
- **Sin dependencias**: No añadas librerías a lo loco sin preguntar
- **Tamaño**: Que sea ligero como una pluma (pero funcional como un martillo)

### Documentación (Para no volvernos locos)

- **JSDoc**: Documenta las funciones importantes
- **TypeScript**: Mantén el `.d.ts` actualizado
- **Ejemplos**: Que sean fáciles de copiar y pegar

```javascript
/**
 * Muestra una notificación molona en pantalla
 * @param {string} message - Lo que quieres decir al mundo
 * @param {Object} options - Las opciones para personalizar
 * @param {string} options.type - El tipo de notificación (success, error, etc.)
 * @param {number} options.duration - Cuánto tiempo vive la notificación
 * @returns {Function} Función para cerrar manualmente (por si te arrepientes)
 */
function flashy(message, options = {}) {
  // Aquí sucede la magia ✨
}
```

## 🐛 Reportar Errores (Conviértete en cazador de bugs)

### Antes de Reportar (No seas impulsivo/a)

1. **Busca** si alguien ya se quejó del mismo problema
2. **Verifica** que tienes la última versión (no seas vintage)
3. **Reproduce** el error en un entorno limpio (no en tu caos personal)

### Formato del Reporte (Hazlo bonito)

```markdown
**Descripción del Error**
Cuenta la historia del bug como si fuera un crimen que hay que resolver.

**Pasos para Reproducir**

1. Abrir la aplicación
2. Hacer clic en el botón mágico
3. Ver cómo todo se va al traste

**Comportamiento Esperado**
Lo que debería pasar en un mundo perfecto.

**Capturas de Pantalla**
Una imagen vale más que mil palabras (y mil líneas de código).

**Información del Entorno:**

- OS: [ej. macOS, Windows, Linux, TempleOS]
- Navegador: [ej. Chrome, Firefox, Safari, Lynx]
- Versión: [ej. la última, la de antes, la prehistórica]
- Versión de Flashy.js: [ej. 1.0.4]

**Contexto Adicional**
Todo lo que se te ocurra que pueda ser útil.
```

## 💡 Sugerir Nuevas Funcionalidades (Sé el visionario)

### Proceso de Sugerencia (No seas tímido/a)

1. **Verifica** que tu idea revolucionaria no existe ya
2. **Abre un issue** etiquetado como "enhancement"
3. **Describe** tu visión como si fueras Steve Jobs
4. **Discute** con la comunidad (democracia en acción)

### Formato de Sugerencia (Vende tu idea)

```markdown
**¿Tu solicitud nace de una frustración?**
Cuenta tu drama personal con el código.

**Describe tu solución soñada**
Pinta el mundo ideal donde tu feature existe.

**Alternativas que consideraste**
Demuestra que pensaste en más de una opción.

**Contexto adicional**
Todo lo que haga tu idea más irresistible.
```

## 📤 Pull Requests (El momento de brillar)

### Antes de Enviar (Checklist del perfeccionista)

- [ ] ¿Tu código no da vergüenza ajena?
- [ ] ¿Lo probaste hasta el cansancio?
- [ ] ¿Actualizaste la documentación?
- [ ] ¿Tu mensaje de commit es decente?

### Proceso de PR (La ceremonia)

1. **Mantén tu rama actualizada** (Sincronización ninja)

   ```bash
   git checkout main
   git pull upstream main
   git checkout tu-rama-genial
   git rebase main  # Magia de Git
   ```

2. **Push** tus cambios (Momento de verdad)

   ```bash
   git push origin tu-rama-genial
   ```

3. **Abre el PR** en GitHub
   - Título que no sea "fix stuff"
   - Descripción que inspire confianza
   - Conecta con issues relacionados

### Template de PR (Para quedar como un/a pro)

```markdown
## Descripción

Aquí explicas qué hiciste sin tecnicismos innecesarios.

## Tipo de Cambio

- [ ] Bug fix (arreglé algo roto)
- [ ] Nueva funcionalidad (añadí magia nueva)
- [ ] Breaking change (cambié algo que puede romper cosas)
- [ ] Documentación (mejoré la información)

## ¿Cómo lo probaste?

Describe tus experimentos científicos.

## Checklist del Perfeccionista:

- [ ] Mi código no da pena
- [ ] Me revisé a mí mismo (autocrítica constructiva)
- [ ] Comenté las partes raras
- [ ] Documenté lo que tocaba
- [ ] No rompí nada (que sepa)

## Issues Relacionados

Cierra #(número del issue)
```

### Revisión de Código (El juicio final)

- **Paciencia**: Las revisiones toman tiempo (no somos máquinas)
- **Mente abierta**: El feedback es para mejorar, no para joder
- **Acción**: Haz los cambios pedidos sin drama
- **Diálogo**: Si no estás de acuerdo, argumenta con clase

## 🏷️ Versionado (Los números que importan)

Seguimos [Semantic Versioning](https://semver.org/) (porque somos civilizados):

- **MAJOR** (1.0.0 → 2.0.0): Cambios que rompen todo
- **MINOR** (1.0.0 → 1.1.0): Nuevas funciones que no rompen nada
- **PATCH** (1.0.0 → 1.0.4): Arreglos menores

### Changelog (El diario del proyecto)

Mantenemos un CHANGELOG.md que cuenta:

- Las novedades brillantes
- Los cambios que rompen cosas
- Lo que va a desaparecer
- Los bugs exterminados
- Las mejoras de seguridad

## 📋 Labels de Issues (Organización ninja)

- `bug`: Algo está jodido
- `enhancement`: Ideas geniales
- `documentation`: Mejoras en la info
- `good first issue`: Para principiantes valientes
- `help wanted`: SOS, necesitamos ayuda
- `question`: Dudas existenciales

## 🎯 Roadmap (El plan maestro)

### Próximas Versiones (Spoilers del futuro)

**v1.1.0**

- [ ] Notificaciones de progreso (porque la espera es dura)
- [ ] Más personalización de estilos (para los creativos)
- [ ] Accesibilidad mejorada (inclusión total)

**v1.2.0**

- [ ] Notificaciones persistentes (para los insistentes)
- [ ] Sistema de colas (orden y concierto)
- [ ] Temas adicionales (variedad es vida)

**v2.0.0**

- [ ] Reescritura en TypeScript (para los tipos estrictos)
- [ ] Sistema de plugins (extensibilidad máxima)
- [ ] Breaking changes (perdón de antemano)

## 🏆 Reconocimientos (Hall of Fame)

Todos los contribuidores aparecen en:

- El README.md (fama eterna)
- Las release notes (créditos del episodio)
- La página de documentación (museo virtual)

## 📞 Contacto (Para cuando necesites hablar)

- **Issues**: [GitHub Issues](https://github.com/pablotheblink/FlashyJS/issues)
- **Email**: pablo@ejemplo.com (respondo, lo prometo)
- **Discusiones**: [GitHub Discussions](https://github.com/pablotheblink/FlashyJS/discussions)

## 📄 Licencia (Lo legal sin rollo)

Al contribuir a Flashy.js, aceptas que tus contribuciones tendrán [Licencia MIT](LICENSE) (básicamente, libertad total).

---

## 🙏 ¡Gracias, héroe/heroína!

Tu contribución hace que Flashy.js sea más genial cada día. Cada bug reportado, cada línea de código, cada coma corregida... todo suma para hacer este proyecto más épico.

¡Nos vemos en el código! 🎉✨

P.D.: Si llegaste hasta aquí leyendo, ya eres oficialmente parte de la élite. Welcome to the club! 🎭
