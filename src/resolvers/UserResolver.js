/* eslint-disable consistent-return */
import model from '../models';
import {
  checkUserExist,
  validates,
} from '../helpers/signupValidations';
import { hashPasword } from '../helpers/hash';

const { Users } = model;

const signupResolver = async (parent, args) => {
  if (!validates(args).check) {
    throw new Error('Name, age and email must be complited');
  } else {
    const check = await checkUserExist(args.email);
    if (check) {
      throw new Error(`Email ${args.email} exits in the system!`);
    }
    const hash = await hashPasword(args.password);

    if (!check) {
      const data = Users.create({
        name: args.name,
        email: args.email,
        age: args.age,
        role: args.role,
        password: hash,
        image_url: args.image_url,
        image_secure_url: args.image_secure_url,
      });

      if (!data) {
        throw new Error('No data found!');
      }
      return data;
    }
  }
};

const getUserByIdResolver = async (parent, args) => {
  const users = await Users.findByPk(args.id);
  if (!users) {
    throw new Error('No user found');
  }
  return users;
};

const getAllUsersResolver = async () => {
  const users = await Users.findAll();
  if (!users.length) {
    throw new Error('No user found');
  }
  return users;
};

export {
  signupResolver,
  getUserByIdResolver,
  getAllUsersResolver,
};
