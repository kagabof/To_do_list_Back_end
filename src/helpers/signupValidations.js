/* eslint-disable no-useless-escape */
import model from '../models';

const { user } = model;

const findUserByEmail = async (email) => {
  let User;
  try {
    User = await user.findOne({ where: { email } });
  } catch (error) {
    return User;
  }
  return User;
};

const checkUserExist = async (email) => {
  const User = await findUserByEmail(email);
  return {
    exist: !!User,
    User: User || null,
  };
};
const passwordValidation = (password) => {
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/;
  return re.test(password);
};

const emailValidation = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const stringValidation = (string) => /^([a-zA-Z0-9]{2,})$/.test(String(string));

const integerValidation = (number) => /^([0-9]{1,})$/.test(number);

const validates = (data) => {
  const message = {
    email: emailValidation(data.email),
    role: stringValidation(data.role),
    name: stringValidation(data.name),
    age: integerValidation(data.age),
    password: passwordValidation(data.password),
  };
  return {
    message,
    check: !!((
      emailValidation(data.email)
    && stringValidation(data.role)
    && stringValidation(data.name)
    && integerValidation(data.age)
    && passwordValidation(data.password)
    )),
  };
};

export {
  emailValidation,
  stringValidation,
  integerValidation,
  validates,
  checkUserExist,
  findUserByEmail,
};
