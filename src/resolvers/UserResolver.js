/* eslint-disable camelcase */
/* eslint-disable consistent-return */
import model from '../models';
import {
  checkUserExist,
  validates,
} from '../helpers/signupValidations';
import { hashPasword, comparePassword } from '../helpers/hash';
import { tokenGenerater } from '../helpers/tokenHelper';


const { user } = model;

const signupResolver = async (parent, args) => {
  const {
    firstName, lastName, email, age, role, password, image_url, image_secure_url,
  } = args;
  if (!validates(args).check) {
    throw new Error('Name, age and email must be complited');
  } else {
    const check = await checkUserExist(email);
    if (check.exist) {
      throw new Error(`Email ${email} exits in the system!`);
    }
    const hash = await hashPasword(password);
    if (!check.exist) {
      const data = user.create({
        firstName,
        lastName,
        email,
        age,
        role,
        password: hash,
        image_url,
        image_secure_url,
      });

      if (!data) {
        throw new Error('No data found!');
      }
      return data;
    }
  }
};

const getUserByIdResolver = async (parent, args) => {
  const users = await user.findByPk(args.id);
  if (!users) {
    throw new Error('No user found');
  }
  return users;
};

const getAllUsersResolver = async () => {
  const users = await user.findAll();
  if (!users.length) {
    throw new Error('No user found');
  }
  return users;
};

const signinResolver = async (parent, args) => {
  const User = await checkUserExist(args.email);
  const passwordCheck = await ((User.exist && args.password)
    ? comparePassword(args.password, User.User.dataValues.password)
    : false);
  if (User.exist && passwordCheck) {
    const {
      email, image_secure_url, image_url, role, id, firstName,
    } = User.User.dataValues;
    const token = await tokenGenerater({
      email,
      role,
      image_secure_url,
      image_url,
      id,
    });

    return {
      firstName,
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
