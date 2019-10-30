import model from '../models';

const { Users } = model;

const findUserByEmail = async (email) => await Users.findOne({where: {email}});

const checkUserExist = async (email) => {
    const user = await findUserByEmail(email);
    return user ? true : false;
};
const passwordValidation = (password) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/;
    console.log('????>', re.test(password));
    return re.test(password);
}

const emailValidation = email => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

const stringValidation = string => {
    return  /^([a-zA-B0-9]{2,})$/.test(String(string));
};

const integerValidation = number => {
    return /^([0-9]{1,})$/.test(number);
};

const validates = data => {
    return (
        emailValidation(data.email)
        && stringValidation(data.role)
        && stringValidation(data.name)
        && integerValidation(data.age)
        && passwordValidation(data.password)
        ) ? true : false;
        
} 

export {
    emailValidation,
    stringValidation,
    integerValidation,
    validates,
    checkUserExist
}
