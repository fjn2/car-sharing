const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser')


const filePersistName = '/db.json';
const persistToDiskInterval = process.env.PERSIST_INTERVAL || 5000;
const db = {
  use: [],
  charge: []
};
const app = express();

const port = process.env.PORT || 3050;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());

app.get('/overview', (req, res, next) => {
  console.log('GET /overview');
  const dashboard = {
    usage: calculateKilometerPerDriver(db.use),
    charge: calculateChargePerDriver(db.charge)
  }
  res.send(dashboard);
});

app.get('/use', (req, res, next) => {
  console.log('GET /use');
  res.send(db.use);
});
app.post('/use', (req, res, next) => {
  console.log('POST /use with body:', req.body);
  db.use.push({
    ...req.body,
    date: new Date()
  });
  res.send({
    status: 'ok'
  });
});

app.get('/charge', (req, res, next) => {
  console.log('GET /charge');
  res.send(db.charge);
});
app.post('/charge', (req, res, next) => {
  console.log('POST /charge with body:', req.body);

  db.charge.push({
    ...req.body,
    date: new Date()
  });

  res.send({
    status: 'ok'
  });
});

app.listen(port, function() {
  console.log('listening on ' + port);
})

function readInit() {
  console.log('readInit');
  const content = fs.readFileSync(process.cwd() + filePersistName);
  console.log('Getting this content:', content + '');
  if (content.length > 0) {
    Object.assign(db, JSON.parse(content));
  }
}

function persistToDisk() {
  console.log('persistToDisk', JSON.stringify(db));
  fs.writeFileSync(process.cwd() + filePersistName, JSON.stringify(db));
}

readInit();

setInterval(persistToDisk, persistToDiskInterval);


//////

function calculateKilometerPerDriver(actions) {
  const users = {
    unknown: {
      km: 0
    }
  };
  const currentDriver = {
    name: '',
    km: 0
  };

  let sortedActions = actions.sort((a, b) => {
    if (a.km === b.km) {
      return a.isPick;
    } else {
      return a.km * 1 - b.km * 1
    }
  });

  for (let i = 0; i < sortedActions.length; i++) {
    if (i === 0) {
      users.unknown.km -= sortedActions[i].km - currentDriver.km;
    }
    if (!users[sortedActions[i].name]) {
      // creates the user
      users[sortedActions[i].name] = {
        km: 0
      };
    }
    if (sortedActions[i].isPick) {
      if (currentDriver.name !== '') {
        // here the previous driver forgot the leave
        users[currentDriver.name].km += sortedActions[i].km - currentDriver.km;
      } else {
        // if there is difference in the km it is unknown
        users.unknown.km += sortedActions[i].km - currentDriver.km;
      }

      // set the current driver information
      currentDriver.name = sortedActions[i].name;
    } else {
      if (currentDriver.name === '') {
        // here the driver forgot the pick
        users[sortedActions[i].name].km += sortedActions[i].km - currentDriver.km;
      } else {
        users[currentDriver.name].km += sortedActions[i].km - currentDriver.km;
      }
      // make the car free
      currentDriver.name = '';
    }
    // advance in the km
    currentDriver.km = sortedActions[i].km;
  }
  return users;
}

function calculateChargePerDriver(actions) {
  const users = {};
  for (let i = 0; i < actions.length; i++) {
    if (!users[actions[i].username]) {
      // creates the user
      users[actions[i].username] = {
        liters: 0,
        amount: 0
      };
    }
    users[actions[i].username].liters += actions[i].liters * 1;
    users[actions[i].username].amount += actions[i].amount * 1;
  }
  return users;
}