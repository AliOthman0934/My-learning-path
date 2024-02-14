import { hash, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';

let users = [{
  id: 1,
  name: "Ali",
  message: "Hey there, Ali is here",
  password: "121322csnfndsjfsnie"
},
{
  id: 2,
  name: "Carmen",
  message: "Hey there, Carmen is here",
  password: "12rgdcsnfndsjfsniehhrt"
}];

const JWT_SECRET = "your_secret_key_here";
const SALT_ROUNDS = 12;

export const getUsers = async (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      users: users
    }
  });
};

export const addUser = async (req, res) => {
  try {
    validateUser(req.body);

    const { name, message, password } = req.body;

    const user = {
      id: Date.now().toString(),
      name,
      message,
      password: await hash(password, SALT_ROUNDS)
    };
    console.log(user);
    users.push(user);
    return res.status(201).json({ id: user.id, name, message });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Invalid request body" });
  }
};

export const login = async (req, res) => {
  try {
    const { name, password } = req.body;


    if (!name || !password) {
      res.status(400).json({ error: "Please write your name and password" });
      return;
    }

    const user = findUserByName(name);
    if (!user) {
      res.status(401).json({
        status: "fail",
        error: "Invalid account. Please try again"
      });
      return;
    }

    const passwordMatches = await compare(password, user.password);
    if (!passwordMatches) {
      res.status(401).json({
        status: "fail",
        error: "Invalid account. Please try again"
      });
      return;
    }

    const token = jwt.sign(tokenPayload, JWT_SECRET);
    res.status(200).json({ token });
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const validateUser = (user) => {
  const { name, message, password } = user;

  if (!name || !message || !password) {
    throw "Please provide name, message, and password";
  }

  if (name.length < 3) {
    throw "Name is too short";
  }

  if (password.length < 8) {
    throw "Password must be at least 8 characters long.";
  }

  return true;
}

const findUserByName = (name) => {
  return users.find(user => user.name === name);
};

