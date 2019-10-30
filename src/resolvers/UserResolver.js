import model from '../models';
import {
    checkUserExist,
    validates
} from '../helpers/signupValidations';
import { hashPasword, comparePassword } from '../helpers/hash';

const {Users, Todo} = model;

const signupResolver = async (parent, args) => {
    if(validates(args)) {
        const check = await checkUserExist(args.email);
        const hash = await hashPasword(args.password);
        console.log('????>', hash);
        if(check === false){
            const data = Users.create({
                name: args.name,
                email: args.email,
                age: args.age,
                role: args.role,
                password: hash,
            });

            if(!data){
                return new Error('No data found!');
            }
            return data;
        }
        return new Error(`The user with ${args.email} exist!`);
    }
    return new Error('Name, age and email must be complited');
};

const getUserByIdResolver = (parent, args) => {
    const users = Users.findOne({where: {id: args.id}})

    if(!users){
        throw new Error('Error');
    }
    return users;
};

const getAllUsersResolver = (parent, args) => {
    const users = Users.findAll();
    if(!users){
        throw new Error('Error');
    }
    return users;

}

export {
    signupResolver,
    getUserByIdResolver,
    getAllUsersResolver,
}
