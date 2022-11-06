const Store = require('electron-store');

const defaultButtons = [];

const store = new Store({
  defaults: {
    fx_buttons: defaultButtons,
    custom_preshow_message: '',
  },
});

module.exports = store;
