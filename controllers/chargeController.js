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
        const span = document.createElement('b');
        li.innerText = item.user;
        span.innerText = item.amount
        li.appendChild(span);
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
    const liters = document.querySelector('#addChargeLiters').liters;
    document.querySelector('#addChargeAmount').value = '';
    document.querySelector('#addChargeLiters').value = '';
    if (amount > 0 && liters > 0) {
      const user = await userSvc.get();
      return chargeSvc.addCharge(user.name, amount, liters)
      .then(this.clearList)
      .then(this.getList)
      .then(() => {
        alert('Operation successfull');
      });
    }
    return Promise.reject('Amount format not valid');
  }
}