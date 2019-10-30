import bcrypt from 'bcrypt';

const hashPasword = (password) => bcrypt.hash(password, bcrypt.genSaltSync(12));
  
const comparePassword = (password, hashPassword) => bcrypt.compare(password, hashPassword);

export {
    hashPasword,
    comparePassword
}