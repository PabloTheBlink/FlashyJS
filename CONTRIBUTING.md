# Guía de Contribución - Flashy.js 🤝

¡Gracias por tu interés en contribuir a Flashy.js! Este documento te guiará a través del proceso de contribución para hacer que el proyecto sea mejor para todos.

## 📋 Tabla de Contenidos

- [Código de Conducta](#código-de-conducta)
- [Cómo Contribuir](#cómo-contribuir)
- [Configuración del Entorno de Desarrollo](#configuración-del-entorno-de-desarrollo)
- [Proceso de Desarrollo](#proceso-de-desarrollo)
- [Estándares de Código](#estándares-de-código)
- [Reportar Errores](#reportar-errores)
- [Sugerir Nuevas Funcionalidades](#sugerir-nuevas-funcionalidades)
- [Pull Requests](#pull-requests)
- [Versionado](#versionado)
- [Licencia](#licencia)

## 🤝 Código de Conducta

Este proyecto y todos los participantes están regidos por nuestro Código de Conducta. Al participar, se espera que mantengas este código. Por favor reporta comportamientos inaceptables.

### Nuestros Estándares

**Comportamientos que contribuyen a crear un ambiente positivo:**

- Usar un lenguaje acogedor e inclusivo
- Ser respetuoso de diferentes puntos de vista y experiencias
- Aceptar críticas constructivas de manera elegante
- Enfocarse en lo que es mejor para la comunidad
- Mostrar empatía hacia otros miembros de la comunidad

## 🚀 Cómo Contribuir

Hay muchas formas de contribuir a Flashy.js:

### 1. Reportar Errores 🐛

- Usa el [sistema de issues](https://github.com/pablotheblink/FlashyJS/issues)
- Describe el problema claramente
- Incluye pasos para reproducir el error
- Proporciona información del navegador/entorno

### 2. Sugerir Mejoras 💡

- Abre un issue para discutir la nueva funcionalidad
- Explica el caso de uso y el beneficio
- Mantén las sugerencias alineadas con los objetivos del proyecto

### 3. Escribir Código 💻

- Corrige errores existentes
- Implementa nuevas funcionalidades
- Mejora la documentación
- Escribe o mejora las pruebas

### 4. Mejorar Documentación 📚

- Corrige errores tipográficos
- Clarifica instrucciones confusas
- Añade ejemplos de uso
- Traduce contenido

## 🛠️ Configuración del Entorno de Desarrollo

### Prerrequisitos

- Node.js (versión 14 o superior)
- npm o yarn
- Git

### Configuración Inicial

1. **Fork del repositorio**

   ```bash
   # Haz fork del repositorio en GitHub
   # Luego clona tu fork
   git clone https://github.com/TU_USUARIO/FlashyJS.git
   cd FlashyJS
   ```

2. **Configurar remotes**

   ```bash
   git remote add upstream https://github.com/pablotheblink/FlashyJS.git
   git remote -v
   ```

3. **Instalar dependencias**
   ```bash
   npm install
   # o
   yarn install
   ```

### Estructura del Proyecto

```
FlashyJS/
├── flashy.js          # Código fuente principal
├── flashy.d.ts        # Definiciones TypeScript
├── index.html         # Documentación y ejemplos
├── package.json       # Configuración del paquete
├── README.md          # Documentación principal
├── CONTRIBUTING.md    # Esta guía
└── .git/              # Control de versiones
```

## 🔄 Proceso de Desarrollo

### 1. Crear una Rama

```bash
# Asegúrate de estar en main y actualizado
git checkout main
git pull upstream main

# Crea una nueva rama para tu feature/fix
git checkout -b feature/nueva-funcionalidad
# o
git checkout -b fix/corregir-error
```

### 2. Realizar Cambios

- Realiza tus cambios en archivos relevantes
- Mantén los cambios enfocados y atómicos
- Haz commits frecuentes con mensajes descriptivos

### 3. Probar los Cambios

```bash
# Abre index.html en tu navegador
# Prueba todas las funcionalidades afectadas
# Verifica compatibilidad en diferentes navegadores
```

### 4. Documentar

- Actualiza la documentación si es necesario
- Añade ejemplos de uso para nuevas funcionalidades
- Actualiza comentarios en el código

## 📝 Estándares de Código

### JavaScript

- **Estilo**: Utiliza un estilo consistente similar al código existente
- **ES6+**: Usa características modernas de JavaScript cuando sea apropiado
- **Comentarios**: Comenta código complejo y funcionalidades públicas
- **Nombres**: Usa nombres descriptivos para variables y funciones

```javascript
// ✅ Bueno
function showNotification(message, options = {}) {
  const config = {
    type: "default",
    duration: 4000,
    ...options,
  };
  // ... implementación
}

// ❌ Malo
function show(msg, opts) {
  // ... implementación sin comentarios
}
```

### Compatibilidad

- **Navegadores**: Mantén compatibilidad con navegadores modernos (ES6+)
- **Sin dependencias**: No añadas dependencias externas sin discusión previa
- **Tamaño**: Mantén el bundle pequeño y eficiente

### Documentación

- **JSDoc**: Usa comentarios JSDoc para funciones públicas
- **TypeScript**: Mantén actualizado el archivo `.d.ts`
- **Ejemplos**: Incluye ejemplos prácticos de uso

```javascript
/**
 * Muestra una notificación en pantalla
 * @param {string} message - El mensaje a mostrar
 * @param {Object} options - Opciones de configuración
 * @param {string} options.type - Tipo de notificación
 * @param {number} options.duration - Duración en milisegundos
 * @returns {Function} Función para cerrar la notificación
 */
function flashy(message, options = {}) {
  // ... implementación
}
```

## 🐛 Reportar Errores

### Antes de Reportar

1. **Busca** si el error ya fue reportado
2. **Verifica** que estés usando la última versión
3. **Reproduce** el error en un entorno limpio

### Formato del Reporte

```markdown
**Descripción del Error**
Una descripción clara y concisa del error.

**Pasos para Reproducir**

1. Ir a '...'
2. Hacer clic en '...'
3. Ver error

**Comportamiento Esperado**
Descripción de lo que esperabas que pasara.

**Capturas de Pantalla**
Si aplica, añade capturas de pantalla.

**Información del Entorno:**

- OS: [ej. iOS]
- Navegador: [ej. Chrome, Safari]
- Versión: [ej. 22]
- Versión de Flashy.js: [ej. 1.0.4]

**Contexto Adicional**
Cualquier otra información relevante.
```

## 💡 Sugerir Nuevas Funcionalidades

### Proceso de Sugerencia

1. **Verifica** que la funcionalidad no exista
2. **Abre un issue** con etiqueta "enhancement"
3. **Describe** el caso de uso claramente
4. **Discute** con la comunidad antes de implementar

### Formato de Sugerencia

```markdown
**¿Tu solicitud está relacionada con un problema?**
Una descripción clara del problema. Ej. Siempre me frustra cuando [...]

**Describe la solución que te gustaría**
Una descripción clara de lo que quieres que pase.

**Describe alternativas que hayas considerado**
Descripción de cualquier solución alternativa.

**Contexto adicional**
Cualquier otro contexto o capturas sobre la solicitud.
```

## 📤 Pull Requests

### Antes de Enviar

- [ ] ¿Tu código sigue los estándares del proyecto?
- [ ] ¿Has probado tu código?
- [ ] ¿Actualizaste la documentación si es necesario?
- [ ] ¿Tu commit tiene un mensaje descriptivo?

### Proceso de PR

1. **Asegúrate** de que tu rama esté actualizada

   ```bash
   git checkout main
   git pull upstream main
   git checkout tu-rama
   git rebase main
   ```

2. **Push** tus cambios

   ```bash
   git push origin tu-rama
   ```

3. **Abre el PR** en GitHub
   - Usa un título descriptivo
   - Completa la descripción del template
   - Conecta issues relacionados

### Template de PR

```markdown
## Descripción

Descripción breve de los cambios realizados.

## Tipo de Cambio

- [ ] Bug fix (cambio que corrige un issue)
- [ ] Nueva funcionalidad (cambio que añade funcionalidad)
- [ ] Cambio breaking (fix o feature que causa que funcionalidad existente no funcione como antes)
- [ ] Documentación

## ¿Cómo se ha probado?

Describe las pruebas que ejecutaste para verificar tus cambios.

## Checklist:

- [ ] Mi código sigue los estándares del proyecto
- [ ] He realizado una auto-revisión de mi código
- [ ] He comentado mi código, particularmente áreas difíciles de entender
- [ ] He realizado cambios correspondientes en la documentación
- [ ] Mis cambios no generan nuevas advertencias

## Issues Relacionados

Cierra #(issue)
```

### Revisión de Código

- **Sé paciente**: Las revisiones pueden tomar tiempo
- **Sé receptivo**: Acepta feedback constructivo
- **Mejora**: Realiza cambios solicitados promptamente
- **Discute**: Si no estás de acuerdo, explica tu perspectiva

## 🏷️ Versionado

Seguimos [Semantic Versioning](https://semver.org/):

- **MAJOR** version (1.0.0 → 2.0.0): Cambios incompatibles
- **MINOR** version (1.0.0 → 1.1.0): Nueva funcionalidad compatible
- **PATCH** version (1.0.0 → 1.0.4): Bug fixes compatibles

### Changelog

Mantenemos un CHANGELOG.md que documenta:

- Nuevas funcionalidades
- Cambios breaking
- Deprecaciones
- Bug fixes
- Mejoras de seguridad

## 📋 Labels de Issues

- `bug`: Algo no está funcionando
- `enhancement`: Nueva funcionalidad o solicitud
- `documentation`: Mejoras o adiciones a la documentación
- `good first issue`: Bueno para contribuidores nuevos
- `help wanted`: Ayuda extra es bienvenida
- `question`: Información adicional es solicitada

## 🎯 Roadmap

### Próximas Versiones

**v1.1.0**

- [ ] Soporte para notificaciones de progreso
- [ ] Más opciones de personalización de estilos
- [ ] Mejoras en accesibilidad

**v1.2.0**

- [ ] Soporte para notificaciones persistentes
- [ ] API para colas de notificaciones
- [ ] Temas adicionales

**v2.0.0**

- [ ] Reescritura en TypeScript
- [ ] Plugin system
- [ ] Breaking changes para mejor API

## 🏆 Reconocimientos

Reconocemos a todos los contribuidores:

- En el README.md
- En las release notes
- En la página de documentación

## 📞 Contacto

- **Issues**: [GitHub Issues](https://github.com/pablotheblink/FlashyJS/issues)
- **Email**: pablo@ejemplo.com
- **Discusiones**: [GitHub Discussions](https://github.com/pablotheblink/FlashyJS/discussions)

## 📄 Licencia

Al contribuir a Flashy.js, aceptas que tus contribuciones serán licenciadas bajo la [Licencia MIT](LICENSE).

---

## 🙏 ¡Gracias!

Tu contribución hace que Flashy.js sea mejor para todos. Cada issue reportado, cada línea de código, y cada mejora en la documentación es valiosa.

¡Esperamos trabajar contigo! 🎉
