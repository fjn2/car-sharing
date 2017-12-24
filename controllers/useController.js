const useController = {
  init: function() {
    this.bindActions();
    this.getList();
  },
  bindActions: function() {
    document.querySelector('#usePickButton').addEventListener('click', () => { this.addUseClick(true); });
    document.querySelector('#useLeaveButton').addEventListener('click', () => { this.addUseClick(false); });
  },
  getList: () => (new Promise((resolve, reject) => {
    useSvc.getList().then((useItems) => {
      const list = document.querySelector('#use .list');
      useItems.forEach((item) => {
        const li = document.createElement('li');
        const span = document.createElement('span');
        const b = document.createElement('b');
        li.innerText = item.user;
        span.innerText = item.isPick ? 'Pick': 'Leave';
        b.innerText = item.km;
        li.appendChild(span);
        li.appendChild(b);

        list.appendChild(li);
      });
    })
  })),
  clearList: () => (new Promise((resolve, reject) => {
    const list = document.querySelector('#use .list');
    list.innerHTML = '';
    resolve();
  })),
  addUseClick: function(isPick) {
    const username = store.username;
    const km = document.getElementById('useKilometer').value;
    useSvc.add(username, isPick, km)
    .then(this.clearList)
    .then(this.getList)
    .catch((err) => {
      console.error(err);
    });
  }
};