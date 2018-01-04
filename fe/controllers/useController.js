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
      useItems.forEach((item, index) => {
        const li = document.createElement('li');
        const spanUsername = document.createElement('span');
        const spanAction = document.createElement('span');
        const b = document.createElement('b');
        const spanDate = document.createElement('span');
        spanUsername.innerText = item.name;
        spanAction.innerText = item.isPick ? 'Pick': 'Leave';

        const diffWithPrevious = index ? item.km * 1 - useItems[index - 1].km * 1 : 0;

        b.innerText = item.km + ' km (+' + diffWithPrevious + ')';

        spanDate.innerText = new Date(item.date).toDateString();

        li.appendChild(spanUsername);
        li.appendChild(spanAction);
        li.appendChild(b);
        li.appendChild(spanDate);

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
    if (km > 0) {
      useSvc.add(username, isPick, km)
      .then(this.clearList)
      .then(this.getList)
      .catch((err) => {
        console.error(err);
      });
    } else {
      alert('The kilometers are not valid');
    }

  }
};