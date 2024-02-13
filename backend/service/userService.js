// import generateToken from "../utils/generateToken";
import User from "../model/userModel.js";

const loginUser = async(email,password)=>{
    const user = await User.findOne({email})
    if(user && (await user.matchPassword(password))){
        return user
    }
}

// const UserExits=async(email)=>{
//     const userExits = await User.findOne(email)
//     if(userExits)
//     return userExits;
// }

const findUserById=async(user_id)=>{
    const user = await User.findById(user_id);
    return user;
}
const UserRegister=async(
    name,
    email,
    password,
    confirmPassword,isAdmin
)=>{
    const user=await User.create({
    name,
    email,
    password,
    confirmPassword,isAdmin
    });
    return user
};

export {loginUser,findUserById,UserRegister}