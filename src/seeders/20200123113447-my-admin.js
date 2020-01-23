module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('users', [{
    firstName: 'Kagabo',
    lastName: 'Faustin',
    createdAt: new Date(),
    updatedAt: new Date(),
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD_HASH,
    role: 'Admin',
    image_url: null,
    image_secure_url: null,
    age: 22,
  }], {}),

  down: (queryInterface) => queryInterface.bulkDelete('users', null, {}),
};
