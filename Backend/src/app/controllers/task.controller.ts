import { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../lib/database';
import { CreateTaskDTO, UpdateTaskDTO } from '../../types/task.types';
import { AuthRequest } from '../middlewares/auth.middleware';

export const getTasks = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    console.log("Get Tasks Request - User ID:", userId);

    const tasks = db.getTasksByUser(userId);
    res.json(tasks);

    // Log the response data (number of tasks fetched)
    console.log("Get Tasks Response - Tasks Fetched:", tasks.length);
  } catch (error) {
    console.error("Get Tasks Error:", error);
    res.status(500).json({ message: 'Error fetching tasks' });
  }
};

export const createTask = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { title, description, priority = 'medium', category }: CreateTaskDTO = req.body;

    console.log("Create Task Request Body:", { title, description, priority, category });

    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }

    const task = {
      id: uuidv4(),
      title,
      description,
      status: 'pending' as const,
      priority,
      category,
      userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const createdTask = db.createTask(task);
    res.status(201).json(createdTask);

    // Log the created task
    console.log("Create Task Response - Task Created:", {
      id: createdTask.id,
      title: createdTask.title,
      status: createdTask.status,
    });
  } catch (error) {
    console.error("Create Task Error:", error);
    res.status(500).json({ message: 'Error creating task' });
  }
};

export const updateTask = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { id } = req.params;
    const updates: UpdateTaskDTO = req.body;

    console.log("Update Task Request Body:", { id, updates });

    const task = db.getTaskById(id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (task.userId !== userId) {
      return res.status(403).json({ message: 'Not authorized to update this task' });
    }

    const updatedTask = {
      ...task,
      ...updates,
      updatedAt: new Date(),
    };

    const result = db.updateTask(id, updatedTask);
    res.json(result);

    // Log the updated task
    console.log("Update Task Response - Task Updated:", {
      id: result.id,
      title: result.title,
      status: result.status,
    });
  } catch (error) {
    console.error("Update Task Error:", error);
    res.status(500).json({ message: 'Error updating task' });
  }
};

export const deleteTask = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { id } = req.params;

    console.log("Delete Task Request - Task ID:", id);

    const task = db.getTaskById(id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (task.userId !== userId) {
      return res.status(403).json({ message: 'Not authorized to delete this task' });
    }

    db.deleteTask(id);
    res.status(204).send();

    // Log the deleted task ID
    console.log("Delete Task Response - Task Deleted:", id);
  } catch (error) {
    console.error("Delete Task Error:", error);
    res.status(500).json({ message: 'Error deleting task' });
  }
};