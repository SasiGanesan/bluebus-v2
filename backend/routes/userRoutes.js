import express from 'express';
import {authUser,registerUser,getUserById} from '../controllers/userControllers.js' 
import {protect, admin} from '../middleware/authMiddleware.js';
import {loginValidation,registerValidation} from '../middleware/validationMiddleware.js'

const router = express.Router();


router.post('/login',loginValidation,authUser);
router.post('/register',registerValidation, registerUser)
router.get('/:id',getUserById)
/*router.post('/login',loginUser);
router.route('/:id').get(getUserbyId)
.post(registerUser).get(getUserbyId)
*/
export default router;