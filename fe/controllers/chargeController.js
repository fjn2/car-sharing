const chargeController = {
  init: function() {
    this.bindActions();
    this.getList();
  },
  bindActions: function() {
    document.querySelector('#addChargeButton').addEventListener('click', () => { this.addChargeButtonClick(); });
  },
  getList: () => (
    chargeSvc.get().then((chargeItems) => {
      const list = document.querySelector('#charge .list');
      chargeItems.forEach((item) => {
        const li = document.createElement('li');
        const spanUsername = document.createElement('span');
        const bAmount = document.createElement('b');
        const bLiters = document.createElement('b');
        const spanDate = document.createElement('span');
        spanUsername.innerText = item.username;
        bLiters.innerText = item.liters + ' liters';
        bAmount.innerText = '$ ' + item.amount;

        spanDate.innerText = item.date ? ((new Date() - new Date(item.date)) / 1000 / 60 / 60 / 24).toPrecision(2) + ' days' : 'n/c';

        li.appendChild(spanUsername);
        li.appendChild(bAmount);
        li.appendChild(bLiters);
        li.appendChild(spanDate);

        list.appendChild(li);

      });
    })
  ),
  clearList: () => (new Promise((resolve, reject) => {
    const list = document.querySelector('#charge .list');
    list.innerHTML = '';
    resolve();
  })),
  addChargeButtonClick: async function() {
    const amount = document.querySelector('#addChargeAmount').value;
    const liters = document.querySelector('#addChargeLiters').value;

    document.querySelector('#addChargeAmount').value = '';
    document.querySelector('#addChargeLiters').value = '';

    const username = store.username;
    if (amount > 0 && liters > 0 && username.length > 0) {

      chargeSvc.addCharge(username, amount, liters)
      .then(this.clearList)
      .then(this.getList);
    } else {
      alert('Amount format not valid');
    }
  }
}