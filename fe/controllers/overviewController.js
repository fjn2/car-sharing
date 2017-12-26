const overviewController = {
  init: function() {
    this.bindActions();
    this.getView();
  },
  bindActions: function() {

  },
  getView: () => (
    overviewSvc.get().then((overviewResult) => {
      const list = document.querySelector('#overview .list');
      Object.keys(overviewResult.usage).forEach((username) => {
        const li = document.createElement('li');
        const spanUsername = document.createElement('span');
        const bAmountKm = document.createElement('b');
        const bLiters = document.createElement('b');
        const bTotalPesos = document.createElement('b');

        spanUsername.innerText = username;
        bAmountKm.innerText = overviewResult.usage[username].km + ' km';
        if (overviewResult.charge[username]) {
          bLiters.innerText = overviewResult.charge[username].liters + ' liters';
          bTotalPesos.innerText = '$ ' + overviewResult.charge[username].amount;
        }


        li.appendChild(spanUsername);
        li.appendChild(bAmountKm);
        li.appendChild(bLiters);
        li.appendChild(bTotalPesos);

        list.appendChild(li);
      });
    })
  )
}