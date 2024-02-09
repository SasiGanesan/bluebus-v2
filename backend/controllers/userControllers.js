import generateToken from "../utils/generateToken.js";
// import User from '../model/userModel.js';
import { loginUser,findUserById,UserRegister } from "../service/userService.js";


//@desc  Auth user & get token
//@route POST /api/users/login
//@access Public
const authUser = async(req,res)=>{
    const {email,password}=req.body;
    // console.log(email)
    // console.log(password)
    const user = await loginUser(email,password)
    // console.log(user)
    try{ 
        if(user){
            generateToken(res,user._id);
            res.status(201).json({
                _id:user._id,
                name:user.name,
                email:user.email,
                isAdmin:user.isAdmin,
            });
        }else{
            res.status(401).json({
                message: "Invalid email or password "
            })
        }
        }catch(error){
        // console.log(error)
        res.status(500).json({message:"You're not registered , Please Sign Up"});
    }
};

// @desc Register user
// @route POST /api/users
// @access Public
const registerUser = async(req,res)=>{
    const {name ,email,password,confirmPassword,isAdmin }=req.body;
    try {
        if (password !== confirmPassword) {
            return res.status(400).json({
              message: "Password do not match",
            });
          }
        // const userExists = await User.findOne({email});
        // if(userExists){
        //     res.status(400).json({
        //         message: "User already exists"
        //     })
        // }
        const user =await UserRegister(name,email,password,confirmPassword,isAdmin);
            generateToken(res,user._id);
            res.status(201).json({
                _id:user._id,
                name: user.name,
                email:user.email,
                isAdmin:user.isAdmin,
            })
        }
     catch (error) {
        res.status(500).json({message:"User already exists"});
        // console.log(error)
    }
}  


//@desc  Get user by Id
//@route Get /api/users/id
//@access Public

const getUserById =async(req,res)=>{

    try {
        const user=await findUserById(req.params.id)
        // console.log(user)
        if(user){
             res.status(200).json(user);
        }else{
            res.status(400).json({
                message: "User Not Found"
            })
    
        }
    } catch (error) {
        res.status(500).json({message:"Enter valid User Id"});
        // console.log(error)
    }
  
}



export{authUser,registerUser,getUserById}








