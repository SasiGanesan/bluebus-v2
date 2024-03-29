import jwt from 'jsonwebtoken';
import User from '../model/userModel.js';
import Ticket from '../model/ticketModel.js'

// Protect routes
const protect = async (req, res, next) => {
    // Read the JWT from the cookie
   let token = req.cookies.jwt;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select('-password');
            next();
        } catch (error) {
            // console.log(error);
            res.status(401);
            throw new Error('Not authorized, token failed')
        }
    } else {
        res.status(401).json({
            message: 'Not authorized as admin'
        })
    }
}

// Admin middleware
const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin){
        next();
    } else {
        res.status(401).json({
            message: 'Not authorized as admin'
        })
    }
};

// Get user Id
// const userId = (req) => {
//     const token = req.cookies.jwt;
//     if (!token) {
//         return null;
//     }
//     try {
//         const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
//         return decodedToken.userId;
//     } catch (error) {
//         console.log('Error verifying JWT:', error);
//         return null;
//     }
// };

//Get User
const checkUser= async(req,res,next)=>{
    const user_id = req.user_id
    const id = req.params.id
    try {
        const user = await User.findById(id);
        if(!user){
            return res.status(404).json({
                message: 'User Not Found'
            })
        }
        if(id === user_id){
            next();
        } else {
            return res.status(404).json({
                message: "User ID Not Found"
            })
        }
    } catch (error) {
        return res.status(400).json({
            message: 'Invalid User ID'
        })
    }
}


//Check Login User
const checkAuth=async(req,res,next)=>{
    const user_id=req.user_id
    const ticket = req.params.id

    try{
        const user =await Ticket.findById(ticket.trim());
        if(!user){
            return res.status(404).json({
                message:"Ticket not found"
            })
        }
        if(user.user_id !=user_id){
            return res.status(404).json({message:'User ticket not found'})
        }else{
            next();
        }
    }catch(error){
        return res.status(404).json({message: "Invalid ticket Id"})
    }
}

const userExist=async(req,res,next)=>{
    const {email}=req.body
    const user=await User.findOne({email})
    if(user){
        return res.status(400).json({message:"User already exists"})
    }
    next();
}

export { protect, admin,checkUser,checkAuth,userExist};