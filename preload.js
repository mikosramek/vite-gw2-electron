// preload.js

const { contextBridge, ipcRenderer } = require('electron');

// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(`${dependency}-version`, process.versions[dependency]);
  }
});

contextBridge.exposeInMainWorld(
  'api', {
    //send: (channel, data) => {
    sendMessage : (channel, data) => {
      // whitelist channels
      const validChannels = ['openOptions', 'closeOptions', 'openNew', 'closeNew', 'options:setup', 'options:set', 'options:get'];
      if (validChannels.includes(channel)) {
        ipcRenderer.send(channel, data);
      }
    },

    //receive: (channel, func) => {
    listen : (channel, func) => {
      const validChannels = ['options:get'];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.on(channel, (event, ...args) => func(...args));
      }
    }
  }
);


