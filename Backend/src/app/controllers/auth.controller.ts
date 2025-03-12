import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../lib/database';
import * as UserDTO from '../../types/user.types';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const register = async (req: Request, res: Response) => {
    try {
      const { email, password, name }: UserDTO.UserRegisterDTO = req.body;
  
      console.log("Registration Request Body:", { email, name });
  
      if (!email || !password || !name) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      const existingUser = db.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: 'Email already registered' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = {
        id: uuidv4(),
        email,
        password: hashedPassword,
        name,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
  
      db.createUser(user);
  
      const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '24h' });
  
      const responseData = {
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      };
  
      res.status(201).json(responseData);
  
      // Log only the relevant parts of the response
      console.log("Registration Response Data:", {
        status: 201,
        user: { id: user.id, email: user.email, name: user.name },
      });
    } catch (error) {
      console.error("Registration Error:", error);
      res.status(500).json({ message: 'Error creating user' });
    }
  };

export const login = async (req: Request, res: Response) => {
    try {
      const { email, password }: UserDTO.UserLoginDTO = req.body;
  
      console.log("Login Request Body:", { email });
  
      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }
  
      const user = db.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '24h' });
  
      const responseData = {
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      };
  
      res.json(responseData);
  
      // Log only the relevant parts of the response
      console.log("Login Response Data:", {
        status: 200,
        user: { id: user.id, email: user.email, name: user.name },
      });
    } catch (error) {
      console.error("Login Error:", error);
      res.status(500).json({ message: 'Error logging in' });
    }
  };