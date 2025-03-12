import { Task } from '../types/task.types';
import { User } from '../types/user.types';
import fs from 'fs';
import path from 'path';

class Database {
  private tasks: Map<string, Task>;
  private users: Map<string, User>;
  private dbPath: string;

  constructor() {
    this.tasks = new Map();
    this.users = new Map();
    this.dbPath = path.join(__dirname, '../../database/data.json');
    this.loadData();
  }

  private loadData() {
    try {
      if (fs.existsSync(this.dbPath)) {
        const data = JSON.parse(fs.readFileSync(this.dbPath, 'utf-8'));
        this.tasks = new Map(Object.entries(data.tasks || {}));
        this.users = new Map(Object.entries(data.users || {}));
      }
    } catch (error) {
      console.error('Error loading database:', error);
    }
  }

  private saveData() {
    try {
      const data = {
        tasks: Object.fromEntries(this.tasks),
        users: Object.fromEntries(this.users),
      };
      fs.writeFileSync(this.dbPath, JSON.stringify(data, null, 2));
    } catch (error) {
      console.error('Error saving database:', error);
    }
  }

  // Task methods
  getAllTasks(): Task[] {
    return Array.from(this.tasks.values());
  }

  getTasksByUser(userId: string): Task[] {
    return Array.from(this.tasks.values()).filter(task => task.userId === userId);
  }

  getTaskById(id: string): Task | undefined {
    return this.tasks.get(id);
  }

  createTask(task: Task): Task {
    this.tasks.set(task.id, task);
    this.saveData();
    return task;
  }

  updateTask(id: string, task: Task): Task {
    this.tasks.set(id, task);
    this.saveData();
    return task;
  }

  deleteTask(id: string): boolean {
    const deleted = this.tasks.delete(id);
    if (deleted) {
      this.saveData();
    }
    return deleted;
  }

  // User methods
  createUser(user: User): User {
    this.users.set(user.id, user);
    this.saveData();
    return user;
  }

  getUserByEmail(email: string): User | undefined {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  getUserById(id: string): User | undefined {
    return this.users.get(id);
  }
}

export const db = new Database(); 