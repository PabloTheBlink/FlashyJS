const React = require('react');
const flashy = require('./dist/flashy.cjs');

function Toaster(options) {
  React.useEffect(() => {
    flashy.setDefaults(Object.fromEntries(Object.entries(options).filter(([, value]) => value !== undefined)));
  }, [options.position, options.theme, options.duration, options.visibleToasts]);
  return null;
}

function useFlashy() {
  return flashy;
}

module.exports = { Toaster, useFlashy };
