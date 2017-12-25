const overviewSvc = {
  get: () => (new Promise((resolve, reject) => {
    const mockItems = [
    // complete with the contract
    ];
    resolve(mockItems);
  })),
  add: (userName, kms, action) => (new Promise((resolve, reject) => {
    const mockItem = {
      status: 'OK'
    };
    resolve(mockItem);
  }))
};