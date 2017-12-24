const chargeSvc = {
  get: () => (new Promise((resolve, reject) => {
    const mockItems = [{
      user: 'Foo',
      amount: Math.round(Math.random() * 2000)
    }, {
      user: 'Bar',
      amount: 300
    }];
    resolve(mockItems);
  })),
  addCharge: (userName, amount, liters) => (new Promise((resolve, reject) => {
    console.log('addCharge', userName, amount, liters);
    resolve({
      status: 'ok'
    });
  }))
};