import express from 'express';
import {loginUser,registerUser} from '../controllers/userControllers.js' 
import {protect, admin} from '../middleware/authMiddleware.js';

const router = express.Router();


router.post('/login',loginUser);
router.post('/register', registerUser)
/*router.post('/login',loginUser);
router.route('/:id').get(getUserbyId)
.post(registerUser).get(getUserbyId)
*/
export default router;