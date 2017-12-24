const menuController = {
  init: () => {
    const menuItems = [{
      name:'Overview',
      sectionId:'overview'
    },{
      name:'Use',
      sectionId:'use'
    },{
      name:'Charge',
      sectionId:'charge'
    },{
      name:'User',
      sectionId:'user'
    }];
    const list = document.querySelector('.menu .list');
    menuItems.forEach((item) => {
      const li = document.createElement('li');
      li.innerText = item.name;
      li.id = 'menu' + item.sectionId;
      li.addEventListener('click', () => {
        menuItems.forEach((mi) => {
          document.querySelector(`#${mi.sectionId}`).style.display = 'none';
        });
        document.querySelector(`#${item.sectionId}`).style.display = 'block';
      });
      list.appendChild(li);
    });

    // force the first interaction
    document.querySelector(`#menu${defaults.sectionId}`).click();
  }
}