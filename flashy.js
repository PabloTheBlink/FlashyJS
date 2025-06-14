/**
 * Flashy.js - Librería de Notificaciones
 * @version 1.0.1
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
    icon: null,
    onClick: null,
    onClose: null,
  };

  const styles = `
          .flashy-container {
              position: fixed;
              z-index: 10000;
              pointer-events: none;
          }
          .flashy-container.top-left { top: 20px; left: 20px; }
          .flashy-container.top-center { top: 20px; left: 50%; transform: translateX(-50%); }
          .flashy-container.top-right { top: 20px; right: 20px; }
          .flashy-container.bottom-left { bottom: 20px; left: 20px; }
          .flashy-container.bottom-center { bottom: 20px; left: 50%; transform: translateX(-50%); }
          .flashy-container.bottom-right { bottom: 20px; right: 20px; }
          .flashy-notification {
              display: flex;
              align-items: center;
              min-width: 300px;
              max-width: 500px;
              margin: 8px 0;
              padding: 16px 20px;
              border-radius: 8px;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              font-size: 14px;
              line-height: 1.4;
              pointer-events: auto;
              cursor: pointer;
              border-left: 4px solid;
              position: relative;
              overflow: hidden;
              opacity: 0;
          }
          .flashy-notification:hover {
              transform: translateY(-2px);
              box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
              transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .flashy-notification.light { background: #ffffff; color: #333333; }
          .flashy-notification.dark { background: #2d3748; color: #e2e8f0; }
          .flashy-notification.success { border-left-color: #4CAF50; }
          .flashy-notification.error { border-left-color: #f44336; }
          .flashy-notification.warning { border-left-color: #ff9800; }
          .flashy-notification.info { border-left-color: #2196F3; }
          .flashy-notification.default { border-left-color: #607d8b; }
          .flashy-notification.success.light { background: #f1f8e9; }
          .flashy-notification.error.light { background: #ffebee; }
          .flashy-notification.warning.light { background: #fff3e0; }
          .flashy-notification.info.light { background: #e3f2fd; }
          .flashy-icon { font-size: 18px; margin-right: 12px; flex-shrink: 0; }
          .flashy-content { flex: 1; word-wrap: break-word; }
          .flashy-close {
              background: none;
              border: none;
              font-size: 18px;
              cursor: pointer;
              margin-left: 12px;
              opacity: 0.7;
              transition: opacity 0.2s;
              padding: 0;
              width: 20px;
              height: 20px;
              display: flex;
              align-items: center;
              justify-content: center;
              color: inherit;
          }
          .flashy-close:hover { opacity: 1; }
          .flashy-progress {
              position: absolute;
              bottom: 0;
              left: 0;
              height: 3px;
              background: rgba(0, 0, 0, 0.2);
              transition: width linear;
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
              0% { transform: scale(0.3); opacity: 0; }
              50% { transform: scale(1.05); opacity: 0.8; }
              70% { transform: scale(0.9); opacity: 0.9; }
              100% { transform: scale(1); opacity: 1; }
          }
          @keyframes flashy-zoom-in {
              0% { transform: scale(0); opacity: 0; }
              50% { transform: scale(1.1); opacity: 0.8; }
              100% { transform: scale(1); opacity: 1; }
          }
          @keyframes flashy-exit {
              from { opacity: 1; }
              to { opacity: 0; }
          }
          .flashy-notification.animate-slide.top-left { animation: flashy-slide-in-left 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
          .flashy-notification.animate-slide.top-center { animation: flashy-slide-in-top 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
          .flashy-notification.animate-slide.top-right { animation: flashy-slide-in-right 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
          .flashy-notification.animate-slide.bottom-left { animation: flashy-slide-in-left 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
          .flashy-notification.animate-slide.bottom-center { animation: flashy-slide-in-bottom 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
          .flashy-notification.animate-slide.bottom-right { animation: flashy-slide-in-right 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
          .flashy-notification.animate-fade { animation: flashy-fade-in 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
          .flashy-notification.animate-bounce { animation: flashy-bounce-in 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
          .flashy-notification.animate-zoom { animation: flashy-zoom-in 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
          .flashy-notification.removing { animation: flashy-exit 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
          @media (max-width: 768px) {
              .flashy-notification {
                  min-width: 280px;
                  max-width: calc(100vw - 40px);
                  margin: 6px 0;
                  padding: 12px 16px;
                  font-size: 13px;
              }
              .flashy-container {
                  left: 20px !important;
                  right: 20px !important;
                  transform: none !important;
              }
              .flashy-container.top-center,
              .flashy-container.bottom-center {
                  left: 20px !important;
                  right: 20px !important;
              }
          }
      `;

  const defaultIcons = {
    success: "✅",
    error: "❌",
    warning: "⚠️",
    info: "ℹ️",
    default: "💬",
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

  function getContainer(position) {
    if (typeof document === "undefined") return null;
    if (!containers[position]) {
      containers[position] = document.createElement("div");
      containers[position].className = `flashy-container ${position}`;
      document.body.appendChild(containers[position]);
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
    const icon = config.icon || defaultIcons[config.type] || defaultIcons.default;
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
    const container = getContainer(config.position);
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

  flashy.version = "1.0.1";

  return flashy;
});
