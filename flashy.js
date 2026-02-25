/**
 * Flashy.js - Librería de Notificaciones
 * @version 1.0.5
 * @author Pablo Martínez
 * @license MIT
 *
 * Uso:
 * Script global: <script src="flashy.js"></script> luego usar window.flashy()
 * ES Module: import flashy from './flashy.js' luego usar flashy()
 * CommonJS: const flashy = require('./flashy.js') luego usar flashy()
 */

(function (global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? (module.exports = factory()) : typeof define === "function" && define.amd ? define(factory) : ((global = typeof globalThis !== "undefined" ? globalThis : global || self), (global.flashy = factory()));
})(this, function () {
  "use strict";

  const defaults = {
    type: "default",
    position: "top-right",
    duration: 4000,
    closable: true,
    animation: "slide",
    theme: "light",
    icon: undefined,
    onClick: null,
    onClose: null,
  };

  const styles = `
          /* CSS Custom Properties for theming */
          :root {
              --flashy-font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              --flashy-font-size: 14px;
              --flashy-line-height: 1.5;
              --flashy-border-radius: 12px;
              --flashy-shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
              --flashy-shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
              --flashy-shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
              --flashy-shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
              --flashy-transition-timing: cubic-bezier(0.4, 0, 0.2, 1);
              --flashy-transition-duration: 0.2s;
              /* Default theme (light) */
              --flashy-bg-primary: #ffffff;
              --flashy-bg-secondary: #f8fafc;
              --flashy-text-primary: #0f172a;
              --flashy-text-secondary: #475569;
              --flashy-border: rgba(226, 232, 240, 0.8);
              --flashy-success-bg: rgba(34, 197, 94, 0.08);
              --flashy-success-border: rgba(34, 197, 94, 0.3);
              --flashy-success-icon: #16a34a;
              --flashy-error-bg: rgba(239, 68, 68, 0.08);
              --flashy-error-border: rgba(239, 68, 68, 0.3);
              --flashy-error-icon: #dc2626;
              --flashy-warning-bg: rgba(245, 158, 11, 0.08);
              --flashy-warning-border: rgba(245, 158, 11, 0.3);
              --flashy-warning-icon: #d97706;
              --flashy-info-bg: rgba(59, 130, 246, 0.08);
              --flashy-info-border: rgba(59, 130, 246, 0.3);
              --flashy-info-icon: #2563eb;
              --flashy-default-bg: rgba(100, 116, 139, 0.08);
              --flashy-default-border: rgba(100, 116, 139, 0.3);
              --flashy-default-icon: #64748b;
              --flashy-progress-bg: rgba(203, 213, 225, 0.5);
          }

          /* Light theme colors - applied to container */
          .flashy-container.flashy-theme-light {
              --flashy-bg-primary: #ffffff;
              --flashy-bg-secondary: #f8fafc;
              --flashy-text-primary: #0f172a;
              --flashy-text-secondary: #475569;
              --flashy-border: rgba(226, 232, 240, 0.8);
              --flashy-success-bg: rgba(34, 197, 94, 0.08);
              --flashy-success-border: rgba(34, 197, 94, 0.3);
              --flashy-success-icon: #16a34a;
              --flashy-error-bg: rgba(239, 68, 68, 0.08);
              --flashy-error-border: rgba(239, 68, 68, 0.3);
              --flashy-error-icon: #dc2626;
              --flashy-warning-bg: rgba(245, 158, 11, 0.08);
              --flashy-warning-border: rgba(245, 158, 11, 0.3);
              --flashy-warning-icon: #d97706;
              --flashy-info-bg: rgba(59, 130, 246, 0.08);
              --flashy-info-border: rgba(59, 130, 246, 0.3);
              --flashy-info-icon: #2563eb;
              --flashy-default-bg: rgba(100, 116, 139, 0.08);
              --flashy-default-border: rgba(100, 116, 139, 0.3);
              --flashy-default-icon: #64748b;
              --flashy-progress-bg: rgba(203, 213, 225, 0.5);
          }

          /* Dark theme colors - applied to container */
          .flashy-container.flashy-theme-dark {
              --flashy-bg-primary: #1e293b;
              --flashy-bg-secondary: #0f172a;
              --flashy-text-primary: #f1f5f9;
              --flashy-text-secondary: #94a3b8;
              --flashy-border: rgba(51, 65, 85, 0.8);
              --flashy-success-bg: rgba(34, 197, 94, 0.15);
              --flashy-success-border: rgba(34, 197, 94, 0.4);
              --flashy-success-icon: #4ade80;
              --flashy-error-bg: rgba(239, 68, 68, 0.15);
              --flashy-error-border: rgba(239, 68, 68, 0.4);
              --flashy-error-icon: #f87171;
              --flashy-warning-bg: rgba(245, 158, 11, 0.15);
              --flashy-warning-border: rgba(245, 158, 11, 0.4);
              --flashy-warning-icon: #fbbf24;
              --flashy-info-bg: rgba(59, 130, 246, 0.15);
              --flashy-info-border: rgba(59, 130, 246, 0.4);
              --flashy-info-icon: #60a5fa;
              --flashy-default-bg: rgba(148, 163, 184, 0.15);
              --flashy-default-border: rgba(148, 163, 184, 0.4);
              --flashy-default-icon: #94a3b8;
              --flashy-progress-bg: rgba(71, 85, 105, 0.5);
          }

          .flashy-container {
              position: fixed;
              z-index: 10000;
              pointer-events: none;
          }
          .flashy-container.top-left { top: 16px; left: 16px; }
          .flashy-container.top-center { top: 16px; left: 50%; transform: translateX(-50%); }
          .flashy-container.top-right { top: 16px; right: 16px; }
          .flashy-container.bottom-left { bottom: 16px; left: 16px; }
          .flashy-container.bottom-center { bottom: 16px; left: 50%; transform: translateX(-50%); }
          .flashy-container.bottom-right { bottom: 16px; right: 16px; }
          .flashy-notification {
              display: flex;
              align-items: flex-start;
              min-width: 320px;
              max-width: 480px;
              margin: 8px 0;
              padding: 14px 16px;
              border-radius: var(--flashy-border-radius);
              font-family: var(--flashy-font-family);
              font-size: var(--flashy-font-size);
              line-height: var(--flashy-line-height);
              pointer-events: auto;
              cursor: pointer;
              position: relative;
              overflow: hidden;
              opacity: 0;
              border: 1px solid var(--flashy-border);
              backdrop-filter: blur(8px);
              -webkit-backdrop-filter: blur(8px);
              transition: transform var(--flashy-transition-duration) var(--flashy-transition-timing),
                          box-shadow var(--flashy-transition-duration) var(--flashy-transition-timing),
                          opacity var(--flashy-transition-duration) var(--flashy-transition-timing);
          }
          .flashy-notification:hover {
              box-shadow: var(--flashy-shadow-xl);
          }
          .flashy-notification.light {
              background: var(--flashy-bg-primary);
              color: var(--flashy-text-primary);
              box-shadow: var(--flashy-shadow-lg);
          }
          .flashy-notification.dark {
              background: var(--flashy-bg-primary);
              color: var(--flashy-text-primary);
              box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1) inset;
          }
          .flashy-notification.success.light {
              background: var(--flashy-success-bg);
              border-color: var(--flashy-success-border);
              color: var(--flashy-text-primary);
          }
          .flashy-notification.success.dark {
              background: var(--flashy-success-bg);
              border-color: var(--flashy-success-border);
              color: var(--flashy-text-primary);
          }
          .flashy-notification.error.light {
              background: var(--flashy-error-bg);
              border-color: var(--flashy-error-border);
              color: var(--flashy-text-primary);
          }
          .flashy-notification.error.dark {
              background: var(--flashy-error-bg);
              border-color: var(--flashy-error-border);
              color: var(--flashy-text-primary);
          }
          .flashy-notification.warning.light {
              background: var(--flashy-warning-bg);
              border-color: var(--flashy-warning-border);
              color: var(--flashy-text-primary);
          }
          .flashy-notification.warning.dark {
              background: var(--flashy-warning-bg);
              border-color: var(--flashy-warning-border);
              color: var(--flashy-text-primary);
          }
          .flashy-notification.info.light {
              background: var(--flashy-info-bg);
              border-color: var(--flashy-info-border);
              color: var(--flashy-text-primary);
          }
          .flashy-notification.info.dark {
              background: var(--flashy-info-bg);
              border-color: var(--flashy-info-border);
              color: var(--flashy-text-primary);
          }
          .flashy-notification.default.light {
              background: var(--flashy-default-bg);
              border-color: var(--flashy-default-border);
              color: var(--flashy-text-primary);
          }
          .flashy-notification.default.dark {
              background: var(--flashy-default-bg);
              border-color: var(--flashy-default-border);
              color: var(--flashy-text-primary);
          }
          .flashy-icon {
              flex-shrink: 0;
              width: 20px;
              height: 20px;
              margin-right: 12px;
              margin-top: 1px;
              display: flex;
              align-items: center;
              justify-content: center;
          }
          .flashy-icon svg {
              width: 100%;
              height: 100%;
          }
          .flashy-notification.success .flashy-icon { color: var(--flashy-success-icon); }
          .flashy-notification.error .flashy-icon { color: var(--flashy-error-icon); }
          .flashy-notification.warning .flashy-icon { color: var(--flashy-warning-icon); }
          .flashy-notification.info .flashy-icon { color: var(--flashy-info-icon); }
          .flashy-notification.default .flashy-icon { color: var(--flashy-default-icon); }
          .flashy-content {
              flex: 1;
              word-wrap: break-word;
              color: inherit;
          }
          .flashy-close {
              background: transparent;
              border: none;
              cursor: pointer;
              margin-left: 12px;
              padding: 0;
              width: 20px;
              height: 20px;
              display: flex;
              align-items: center;
              justify-content: center;
              border-radius: 4px;
              color: var(--flashy-text-secondary);
              opacity: 0.6;
              transition: opacity 0.15s var(--flashy-transition-timing),
                          background-color 0.15s var(--flashy-transition-timing),
                          color 0.15s var(--flashy-transition-timing);
              flex-shrink: 0;
          }
          .flashy-close:hover {
              opacity: 1;
              background: rgba(148, 163, 184, 0.15);
              color: var(--flashy-text-primary);
          }
          .flashy-progress {
              position: absolute;
              bottom: 0;
              left: 0;
              height: 2px;
              background: var(--flashy-progress-bg);
              transition: width linear;
              border-radius: 0 0 0 var(--flashy-border-radius);
          }
          @keyframes flashy-slide-in-right {
              from { transform: translateX(100%); opacity: 0; }
              to { transform: translateX(0); opacity: 1; }
          }
          @keyframes flashy-slide-in-left {
              from { transform: translateX(-100%); opacity: 0; }
              to { transform: translateX(0); opacity: 1; }
          }
          @keyframes flashy-slide-in-top {
              from { transform: translateY(-100%); opacity: 0; }
              to { transform: translateY(0); opacity: 1; }
          }
          @keyframes flashy-slide-in-bottom {
              from { transform: translateY(100%); opacity: 0; }
              to { transform: translateY(0); opacity: 1; }
          }
          @keyframes flashy-fade-in {
              from { opacity: 0; }
              to { opacity: 1; }
          }
          @keyframes flashy-bounce-in {
              0% { transform: scale(0.95); opacity: 0; }
              50% { transform: scale(1.01); opacity: 0.9; }
              100% { transform: scale(1); opacity: 1; }
          }
          @keyframes flashy-zoom-in {
              0% { transform: scale(0.98); opacity: 0; }
              100% { transform: scale(1); opacity: 1; }
          }
          @keyframes flashy-exit {
              from { opacity: 1; transform: scale(1); }
              to { opacity: 0; transform: scale(0.98); }
          }
          .flashy-notification.animate-slide.top-left { animation: flashy-slide-in-left 0.25s var(--flashy-transition-timing) forwards; }
          .flashy-notification.animate-slide.top-center { animation: flashy-slide-in-top 0.25s var(--flashy-transition-timing) forwards; }
          .flashy-notification.animate-slide.top-right { animation: flashy-slide-in-right 0.25s var(--flashy-transition-timing) forwards; }
          .flashy-notification.animate-slide.bottom-left { animation: flashy-slide-in-left 0.25s var(--flashy-transition-timing) forwards; }
          .flashy-notification.animate-slide.bottom-center { animation: flashy-slide-in-bottom 0.25s var(--flashy-transition-timing) forwards; }
          .flashy-notification.animate-slide.bottom-right { animation: flashy-slide-in-right 0.25s var(--flashy-transition-timing) forwards; }
          .flashy-notification.animate-fade { animation: flashy-fade-in 0.2s var(--flashy-transition-timing) forwards; }
          .flashy-notification.animate-bounce { animation: flashy-bounce-in 0.3s var(--flashy-transition-timing) forwards; }
          .flashy-notification.animate-zoom { animation: flashy-zoom-in 0.15s var(--flashy-transition-timing) forwards; }
          .flashy-notification.removing { animation: flashy-exit 0.2s var(--flashy-transition-timing) forwards; }
          @media (max-width: 768px) {
              .flashy-notification {
                  min-width: 280px;
                  max-width: calc(100vw - 32px);
                  margin: 6px 0;
                  padding: 12px 14px;
              }
              .flashy-container {
                  left: 16px !important;
                  right: 16px !important;
                  transform: none !important;
              }
              .flashy-container.top-center,
              .flashy-container.bottom-center {
                  left: 16px !important;
                  right: 16px !important;
              }
          }
      `;

  const defaultIcons = {
    success: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
    error: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
    warning: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
    info: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
    default: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
  };

  let stylesInjected = false;
  const containers = {};

  function injectStyles() {
    if (stylesInjected || typeof document === "undefined") return;
    const styleSheet = document.createElement("style");
    styleSheet.id = "flashy-styles";
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
    stylesInjected = true;
  }

  function getContainer(position, theme) {
    if (typeof document === "undefined") return null;
    if (!containers[position]) {
      containers[position] = document.createElement("div");
      containers[position].className = `flashy-container ${position} flashy-theme-${theme}`;
      document.body.appendChild(containers[position]);
    } else {
      // Update theme class if changed
      containers[position].classList.remove('flashy-theme-light', 'flashy-theme-dark');
      containers[position].classList.add(`flashy-theme-${theme}`);
    }
    return containers[position];
  }

  function closeNotification(element, options) {
    if (!element || element.classList.contains("removing")) return;
    element.classList.add("removing");
    if (options.onClose) {
      try {
        options.onClose();
      } catch (e) {
        console.warn("Flashy: Error en callback onClose:", e);
      }
    }
    setTimeout(() => {
      if (element.parentNode) {
        element.parentNode.removeChild(element);
      }
    }, 300);
  }

  function flashy(message, options = {}) {
    if (typeof document === "undefined") {
      console.warn("Flashy: No se puede usar fuera del navegador");
      return () => {};
    }
    injectStyles();
    if (!message || typeof message !== "string") {
      console.warn("Flashy: El mensaje debe ser una cadena de texto");
      return () => {};
    }
    if (typeof options === "string") {
      options = { type: options };
    }
    const config = { ...defaults, ...options };
    const validTypes = ["success", "error", "warning", "info", "default"];
    const validPositions = ["top-left", "top-center", "top-right", "bottom-left", "bottom-center", "bottom-right"];
    const validAnimations = ["slide", "fade", "bounce", "zoom"];
    const validThemes = ["light", "dark"];
    config.type = validTypes.includes(config.type) ? config.type : "default";
    config.position = validPositions.includes(config.position) ? config.position : "top-right";
    config.animation = validAnimations.includes(config.animation) ? config.animation : "slide";
    config.theme = validThemes.includes(config.theme) ? config.theme : "light";
    config.duration = config.duration < 0 ? 0 : config.duration;
    const notification = document.createElement("div");
    notification.className = `flashy-notification ${config.type} ${config.theme} animate-${config.animation} ${config.position}`;
    let content = "";
    const icon = config.icon !== undefined ? config.icon : (defaultIcons[config.type] || defaultIcons.default);
    if (icon) {
      content += `<span class="flashy-icon">${icon}</span>`;
    }
    const escapedMessage = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
    content += `<div class="flashy-content">${escapedMessage}</div>`;
    if (config.closable) {
      content += `<button class="flashy-close" type="button" aria-label="Cerrar notificación">×</button>`;
    }
    if (config.duration > 0) {
      content += `<div class="flashy-progress"></div>`;
    }
    notification.innerHTML = content;
    const container = getContainer(config.position, config.theme);
    if (!container) {
      console.warn("Flashy: No se pudo crear el contenedor");
      return () => {};
    }
    container.appendChild(notification);
    notification.offsetHeight;
    if (config.onClick && typeof config.onClick === "function") {
      notification.addEventListener("click", (e) => {
        if (!e.target.classList.contains("flashy-close")) {
          try {
            config.onClick();
          } catch (e) {
            console.warn("Flashy: Error en callback onClick:", e);
          }
        }
      });
    }
    if (config.closable) {
      const closeBtn = notification.querySelector(".flashy-close");
      if (closeBtn) {
        closeBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          closeNotification(notification, config);
        });
      }
    }

    // Variables para el control del temporizador y hover
    let timeoutId = null;
    let remainingTime = config.duration;
    let startTime = Date.now();
    let isPaused = false;

    if (config.duration > 0) {
      const progressBar = notification.querySelector(".flashy-progress");
      if (progressBar) {
        progressBar.style.width = "100%";
        progressBar.style.transition = `width ${config.duration}ms linear`;
        setTimeout(() => {
          progressBar.style.width = "0%";
        }, 10);
      }

      // Función para iniciar/reanudar el temporizador
      const startTimer = () => {
        if (remainingTime <= 0) return;

        startTime = Date.now();
        timeoutId = setTimeout(() => {
          closeNotification(notification, config);
        }, remainingTime);
      };

      // Función para pausar el temporizador
      const pauseTimer = () => {
        if (timeoutId) {
          clearTimeout(timeoutId);
          timeoutId = null;
          const elapsed = Date.now() - startTime;
          remainingTime = Math.max(0, remainingTime - elapsed);
          isPaused = true;

          // Pausar la barra de progreso
          if (progressBar) {
            progressBar.style.animationPlayState = "paused";
            const currentWidth = parseFloat(getComputedStyle(progressBar).width);
            const containerWidth = parseFloat(getComputedStyle(progressBar.parentElement).width);
            const percentage = (currentWidth / containerWidth) * 100;
            progressBar.style.transition = "none";
            progressBar.style.width = `${percentage}%`;
          }
        }
      };

      // Función para reanudar el temporizador
      const resumeTimer = () => {
        if (isPaused && remainingTime > 0) {
          isPaused = false;

          // Reanudar la barra de progreso
          if (progressBar) {
            progressBar.style.transition = `width ${remainingTime}ms linear`;
            setTimeout(() => {
              progressBar.style.width = "0%";
            }, 10);
          }

          startTimer();
        }
      };

      // Event listeners para hover
      notification.addEventListener("mouseenter", pauseTimer);
      notification.addEventListener("mouseleave", resumeTimer);

      // Iniciar el temporizador
      startTimer();
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      closeNotification(notification, config);
    };
  }

  flashy.closeAll = function () {
    if (typeof document === "undefined") return;
    const notifications = document.querySelectorAll(".flashy-notification");
    notifications.forEach((notification) => {
      closeNotification(notification, {});
    });
  };

  flashy.setDefaults = function (newDefaults) {
    if (typeof newDefaults === "object" && newDefaults !== null) {
      Object.assign(defaults, newDefaults);
    }
  };

  flashy.getOptions = function () {
    return { ...defaults };
  };

  flashy.destroy = function () {
    if (typeof document === "undefined") return;
    flashy.closeAll();
    Object.values(containers).forEach((container) => {
      if (container.parentNode) {
        container.parentNode.removeChild(container);
      }
    });
    Object.keys(containers).forEach((key) => {
      delete containers[key];
    });
    const styleSheet = document.getElementById("flashy-styles");
    if (styleSheet) {
      styleSheet.parentNode.removeChild(styleSheet);
    }
    stylesInjected = false;
  };

  flashy.success = (message, options = {}) => flashy(message, { ...options, type: "success" });
  flashy.error = (message, options = {}) => flashy(message, { ...options, type: "error" });
  flashy.warning = (message, options = {}) => flashy(message, { ...options, type: "warning" });
  flashy.info = (message, options = {}) => flashy(message, { ...options, type: "info" });

  flashy.version = "1.0.5";

  return flashy;
});
