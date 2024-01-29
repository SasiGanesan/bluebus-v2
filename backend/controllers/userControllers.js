import generateToken from "../utils/generateToken.js";
import User from '../model/userModel.js';


//@desc  Auth user & get token
//@route POST /api/users/login
//@access Public
const authUser = async(req,res)=>{
    const {email,password}=req.body;

    const user = await User.findOne({email})

    try{
        if(user&& (await user.matchPassword(password))){
            generateToken(res,user._id);

            res.status(200).json({
                _id:user._id,
                name:user.name,
                email:user.email,
                isAdmin:user.isAdmin,
            });
        }else{
            res.status(401).json({
                message: "Invalid email or password"
            })
        }
        }catch(error){
        console.log(error)
        res.status(500).json({message:"server error"});
    }
};

// @desc Register user
// @route POST /api/users
// @access Public
const registerUser = async(req,res)=>{
    try {
        const {name ,email,password,confirmPassword }=req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({
              message: "Password do not match",
            });
          }

        const userExists = await User.findOne({email});
    
        if(userExists){
            res.status(400).json({
                message: "User already exists"
            })
        }
        const user =await User.create({
            name,email,password,confirmPassword
        });
    
        if(user){
    
            generateToken(res,user._id);
            res.status(201).json({
                _id:user._id,
                name: user.name,
                email:user.email,
                isAdmin:user.isAdmin,
            })
        } else{
            console.error(error);
            res.status(404).json({
                message: "Invalid user data",
            })
        }
    } catch (error) {
        res.status(500).json({message:"Enter valid details"});
    }
  
};

//@desc  Get user by Id
//@route Get /api/users/id
//@access Public

const getUserById =async(req,res)=>{
    try {
        const user=await User.findById(req.params.id)
        if(user){
            return res.json(user);
        }else{
            res.status(400).json({
                message: "Invalid user Id"
            })
    
        }
    } catch (error) {
        res.status(500).json({message:"Enter valid Id"});
    }
  
}



export{authUser,registerUser,getUserById}








