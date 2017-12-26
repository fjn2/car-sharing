const overviewSvc = {
  get: () => (new Promise((resolve, reject) => {
    fetch(serverUrl + '/overview', {})
    .then(function(response) {
      return response.json();
    })
    .then(function (data) {
      resolve(data);
    });
  }))
};
