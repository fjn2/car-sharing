const userSvc = {
  getList: () => (new Promise((resolve, reject) => {
    const mockItems = [{
      user: 'Federico',
      chargeAmount: Math.round(Math.random() * 2000),
      useAmount: Math.round(Math.random() * 2000) + 'km'
    }, {
      user: 'Patricio',
      chargeAmount: 300,
      useAmount: Math.round(Math.random() * 2000) + 'km'
    }, {
      user: 'Liz',
      chargeAmount: 300,
      useAmount: Math.round(Math.random() * 2000) + 'km'
    }];
  }))
};