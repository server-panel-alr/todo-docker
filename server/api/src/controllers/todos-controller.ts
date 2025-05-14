import { Request, Response } from 'express';
import { prisma } from '../database';

/**
 * Create todo for current user in database.
 *
 * @param request
 * @param response
 * @returns promise void
 */
const postTodo = async (request: Request, response: Response) => {
  const {
    t,
    user,
    body: { status, title, description },
  } = request;
  const { error, success } = response;
  try {
    await prisma.todo.create({
      data: { user: { connect: { id: user?.id } }, status, title, description },
    });
    success();
  } catch (e) {
    error({ message: t('error_message.could_not_add_todo') });
  }
};

/**
 * Get todo list of current user from database.
 *
 * @param request
 * @param response
 * @returns promise void
 */
const getTodos = async (request: Request, response: Response) => {
  const { t, user } = request;
  const { error, success } = response;
  try {
    const todos = await prisma.todo.findMany({
      where: { userId: user?.id },
      orderBy: { createdAt: 'desc' },
    });
    success({ data: todos });
    return;
  } catch (e) {
    error({ message: t('error_message.could_not_get_todo') });
  }
};

/**
 * Get todo of current user by id from database.
 *
 * @param request
 * @param response
 * @returns promise void
 */
const getTodo = async (request: Request, response: Response) => {
  const {
    t,
    user,
    params: { id: todoId },
  } = request;
  const { error, success } = response;
  try {
    const todo = await prisma.todo.findFirst({
      where: { userId: user?.id, AND: { id: parseInt(todoId) } },
    });
    success({ data: todo });
  } catch (e) {
    error({ message: t('error_message.could_not_get_todo') });
  }
};

/**
 * Update todo of current user in database.
 *
 * @param request
 * @param response
 * @returns promise void
 */
const putTodo = async (request: Request, response: Response) => {
  const {
    t,
    user,
    params: { id: todoId },
    body: { status, title, description },
  } = request;
  const { error, success } = response;
  try {
    const todo = await prisma.todo.findFirst({
      where: { userId: user?.id, AND: { id: parseInt(todoId) } },
    });
    await prisma.todo.update({
      where: { id: todo?.id },
      data: { status, title, description },
    });
    success();
  } catch (e) {
    error({ message: t('error_message.could_not_update_todo') });
  }
};

/**
 * Remove todo of current user from database.
 *
 * @param request
 * @param response
 * @returns promise void
 */
const deleteTodo = async (request: Request, response: Response) => {
  const {
    t,
    user,
    params: { id: todoId },
  } = request;
  const { error, success } = response;

  try {
    const todo = await prisma.todo.findFirst({
      where: { userId: user?.id, AND: { id: parseInt(todoId) } },
    });
    await prisma.todo.delete({
      where: { id: todo?.id },
    });
    success();
  } catch (e) {
    error({ message: t('error_message.could_not_remove_todo') });
  }
};

export { postTodo, getTodos, getTodo, putTodo, deleteTodo };
