const useSvc = {
  getList: () => (new Promise((resolve, reject) => {
    fetch(serverUrl + '/use', {})
    .then(function(response) {
      return response.json();
    })
    .then(function (data) {
      resolve(data);
    });
    // const mockItems = [{
    //   user: 'Federico',
    //   isPick: !!Math.round(Math.random() * 2),
    //   km: Math.round(Math.random() * 2000) + 'km'
    // }];
  })),
  add: (name, isPick, km) => (new Promise((resolve, reject) => {
    console.log('Svc add with', name, isPick, km);
    fetch(serverUrl + '/use', {
      method: 'post',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        name,
        isPick,
        km
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