/* eslint-disable camelcase */
/* eslint-disable consistent-return */
import model from '../models';
import {
  checkUserExist,
  validates,
} from '../helpers/signupValidations';
import { hashPasword, comparePassword } from '../helpers/hash';
import { tokenGenerater } from '../helpers/tokenHelper';


const { Users } = model;

const signupResolver = async (parent, args) => {
  if (!validates(args).check) {
    throw new Error('Name, age and email must be complited');
  } else {
    const check = await checkUserExist(args.email);
    if (check.exist) {
      throw new Error(`Email ${args.email} exits in the system!`);
    }
    const hash = await hashPasword(args.password);

    if (!check.exist) {
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

const signinResolver = async (parent, args) => {
  const user = (await checkUserExist(args.email));
  const passwordCheck = (user.exist && args.password)
    ? comparePassword(args.password, user.User.dataValues.password)
    : false;

  if (user.exist && passwordCheck) {
    const {
      email, image_secure_url, image_url, role, id, name,
    } = user.User.dataValues;
    const token = await tokenGenerater({
      email,
      role,
      image_secure_url,
      image_url,
      id,
    });

    return {
      name,
      token,
    };
  }
  throw new Error('Invalid user name or password');
};

export {
  signupResolver,
  getUserByIdResolver,
  getAllUsersResolver,
  signinResolver,
};
