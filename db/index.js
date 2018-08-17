const Sequelize = require('sequelize');
const db = new Sequelize(
  process.env.URL_DATABASE || 'postgres://localhost/acmdb3',
  { logging: false }
);

const User = db.define('user', {
  name: Sequelize.STRING,
  email: Sequelize.STRING,
});

const Thing = db.define('thing', {
  name: Sequelize.STRING,
});

const UserThing = db.define('user_thing', {
  name: Sequelize.STRING,
});

UserThing.belongsTo(User);
UserThing.belongsTo(Thing);

User.hasMany(UserThing);
Thing.hasMany(UserThing);

const sync = () => {
  return db.sync({ force: true });
};

const seed = () => {
  return Promise.all([
    User.create({ name: 'moe' }),
    User.create({ name: 'larry' }),
    User.create({ name: 'curly' }),
    User.create({ name: 'shep' }),
    User.create({ name: 'joe' }),
    Thing.create({ name: 'foo' }),
    Thing.create({ name: 'bazz' }),
  ]).then(([moe, larry, curly, shep, joe, foo, bazz]) => {
    return Promise.all([
      UserThing.create({ thingId: foo.id, userId: moe.id }),
      UserThing.create({ thingId: foo.id, userId: moe.id }),
      UserThing.create({ userId: larry.id, thingId: foo.id }),
      UserThing.create({ userId: larry.id, thingId: bazz.id }),
      UserThing.create({ userId: shep.id, thingId: bazz.id }),
    ]);
  });
};

module.exports = {
  sync,
  seed,
  models: {
    User,
    Thing,
    UserThing,
  },
};
