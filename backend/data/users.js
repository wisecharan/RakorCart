import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: bcrypt.hashSync('password123', 10),
    isAdmin: false,
  },
];

export default users;