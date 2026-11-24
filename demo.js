(() => {
  'use strict';
  const $ = selector => document.querySelector(selector);
  const stage = $('#fx-stage');
  if (!stage || typeof window.flashy !== 'function') return;
  let theme = 'dark';
  let position = 'top-right';
  let type = 'action';
  const examples = {
    success: ["flashy.success('Cambios guardados', {", "  description: 'Todo está actualizado.'", '});'],
    error: ["flashy.error('No se pudo guardar', {", "  description: 'Inténtalo de nuevo.'", '});'],
    warning: ["flashy.warning('Queda poco espacio', {", "  description: 'Revisa tu almacenamiento.'", '});'],
    info: ["flashy.info('Nueva versión disponible', {", "  description: 'FlashyJS 2.0 ya está aquí.'", '});'],
    promise: ["flashy.promise(guardar(), {", "  loading: 'Guardando…',", "  success: 'Guardado',", "  error: 'No se pudo guardar'", '});'],
    action: ["flashy('Elemento archivado', {", "  description: 'Puedes recuperarlo.',", "  action: { label: 'Deshacer',", '    onClick: restaurar }', '});']
  };
  function syncCode() {
    $('#fx-code').textContent = "import flashy from '@pablotheblink/flashyjs';\n\n" +
      `flashy.setDefaults({ theme: '${theme}', position: '${position}' });\n` + examples[type].join('\n');
  }
  function moveContainers() {
    document.querySelectorAll('.flashy-container').forEach(container => stage.appendChild(container));
  }
  function launch(nextType, persistent = false) {
    type = nextType;
    syncCode();
    const common = { theme, position, duration: persistent ? 0 : 5500 };
    if (nextType === 'promise') {
      window.flashy.promise(new Promise(resolve => setTimeout(resolve, 1500)), {
        loading: 'Guardando cambios…', success: 'Cambios guardados', error: 'No se pudo guardar'
      });
    } else if (nextType === 'action') {
      window.flashy('Elemento archivado', { ...common, description: 'Puedes recuperarlo.', action: {
        label: 'Deshacer', onClick: () => { window.flashy.success('Elemento restaurado', { theme, position }); moveContainers(); }
      } });
    } else {
      const messages = {
        success: ['Cambios guardados', 'Todo está actualizado.'],
        error: ['No se pudo guardar', 'Inténtalo de nuevo.'],
        warning: ['Queda poco espacio', 'Revisa tu almacenamiento.'],
        info: ['Nueva versión disponible', 'FlashyJS 2.0 ya está aquí.']
      };
      window.flashy[nextType](messages[nextType][0], { ...common, description: messages[nextType][1] });
    }
    moveContainers();
  }
  function replay() {
    window.flashy.closeAll();
    window.flashy.setDefaults({ theme, position, visibleToasts: 3 });
    launch('info', true);
    setTimeout(() => launch('success', true), 220);
    setTimeout(() => launch('action', true), 440);
  }
  $('#fx-theme').addEventListener('change', event => {
    theme = event.target.value;
    replay();
  });
  $('#fx-position').addEventListener('change', event => {
    position = event.target.value;
    replay();
  });
  document.querySelectorAll('[name="fx-type"]').forEach(button => button.addEventListener('click', () => launch(button.value)));
  $('#fx-replay').addEventListener('click', replay);
  $('#fx-copy-code').addEventListener('click', async () => {
    const button = $('#fx-copy-code');
    try { await navigator.clipboard.writeText($('#fx-code').textContent); button.textContent = 'Copiado ✓'; }
    catch { button.textContent = 'Selecciona el código'; }
    setTimeout(() => { button.textContent = 'Copiar código ⧉'; }, 1700);
  });
  document.querySelector('#fx-copy-install').addEventListener('click', async event => {
    try { await navigator.clipboard.writeText('npm i @pablotheblink/flashyjs'); event.currentTarget.textContent = 'Comando copiado ✓'; }
    catch { event.currentTarget.textContent = 'npm i @pablotheblink/flashyjs'; }
    setTimeout(() => { event.currentTarget.innerHTML = 'npm i @pablotheblink/flashyjs <span aria-hidden="true">⧉</span>'; }, 1700);
  });
  replay();
})();
