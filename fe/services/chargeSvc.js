const chargeSvc = {
  get: () => (new Promise((resolve, reject) => {
    // const mockItems = [{
    //   user: 'Foo',
    //   amount: Math.round(Math.random() * 2000)
    // }];
    fetch(serverUrl + '/charge', {})
    .then(function(response) {
      return response.json();
    })
    .then(function (data) {
      resolve(data);
    });
  })),
  addCharge: (username, amount, liters) => (new Promise((resolve, reject) => {
    console.log('addCharge', username, amount, liters);
    fetch(serverUrl + '/charge', {
      method: 'post',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        username,
        amount,
        liters
      })
    })
    .then(function(response) {
      return response.json();
    })
    .then(function (data) {
      resolve(data);
    })
    .catch(function (error) {
      console.log('Request failed', error);
      reject(error);
    });
  }))
};