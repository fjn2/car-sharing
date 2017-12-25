const serverUrl = 'http://localhost:3050';
const defaults = {
  sectionId:'overview',
  username: localStorage.username
};
const store = new Proxy({}, {
  set: function(target, property, value, receiver) {
    target[property] = value;
    localStorage[property] = value;
    console.debug('Storing the property' + property + '  in localStorage with the value ' + localStorage[property]);
    return true;
  }
});

(() => {
  menuController.init();
  chargeController.init();
  userController.init();
  useController.init();
})();