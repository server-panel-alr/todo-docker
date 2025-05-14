import express from 'express';
import {
  deleteTodo,
  getTodo,
  getTodos,
  postTodo,
  putTodo,
} from '../controllers';
import { verifyAuthentication } from '../middlewares';

const router = express.Router();

router.post('/', verifyAuthentication, postTodo);
router.get('/', verifyAuthentication, getTodos);
router.get('/:id', verifyAuthentication, getTodo);
router.put('/:id', verifyAuthentication, putTodo);
router.delete('/:id', verifyAuthentication, deleteTodo);

export { router as todosRoutes };
