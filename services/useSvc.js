const useSvc = {
  getList: () => (new Promise((resolve, reject) => {
    const mockItems = [{
      user: 'Federico',
      isPick: !!Math.round(Math.random() * 2),
      km: Math.round(Math.random() * 2000) + 'km'
    },{
      user: 'Federico',
      isPick: !!Math.round(Math.random() * 2),
      km: Math.round(Math.random() * 2000) + 'km'
    }];
    resolve(mockItems);
  })),
  add: (name, isPick, km) => (new Promise((resolve, reject) => {

  }))
};