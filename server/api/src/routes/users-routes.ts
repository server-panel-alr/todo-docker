import express from 'express';
import { refresh, signIn, signOut, signUp } from '../controllers';

const router = express.Router();

router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/refresh', refresh);
router.post('/signout', signOut);

export { router as usersRoutes };
