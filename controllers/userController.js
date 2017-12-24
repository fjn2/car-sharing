const userController = {
  init: function() {
    this.bindActions();
    this.setDefaults();
  },
  setDefaults: function() {
    store.username = defaults.username;

    document.querySelector('#userName').value = store.username;
  },
  bindActions: function() {
    document.querySelector('#userButton').addEventListener('click', () => { this.userButtonClick(); });
  },
  userButtonClick: function () {
    const name = document.querySelector('#userName').value;
    if (name !== '') {
      store.username = name;
      alert('Username updated');
    } else {
      alert('Username not valid');
    }
  }
}