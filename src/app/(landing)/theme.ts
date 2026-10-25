// Shared by the server layout (inline script) and the client toggle, so it must not live in
// a 'use client' module: server imports from one get a client reference, not the value.

export const THEME_STORAGE_KEY = 'theme'

// Runs in <head> before first paint, so a saved choice never flashes the other theme.
// Without a saved choice the page keeps following the system setting.
export const themeInitScript = `(function(){try{var t=localStorage.getItem('${THEME_STORAGE_KEY}');if(t==='dark'||t==='light'){document.documentElement.classList.add(t)}}catch(e){}})()`
