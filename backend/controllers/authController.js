import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = 'secretkey';

// In-memory users
const users = [];

export function register(req, res) {
  const { full_name, email, password, role, subscription_type } = req.body;
  const existing = users.find(u => u.email === email);
  if (existing) return res.status(400).json({ error: 'User already exists' });

  const password_hash = bcrypt.hashSync(password, 10);
  const newUser = { id: users.length + 1, full_name, email, password_hash, role, subscription_type };
  users.push(newUser);
  res.json({ message: 'Registered successfully', user: newUser });
}

export function login(req, res) {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  const isMatch = bcrypt.compareSync(password, user.password_hash);
  if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token, full_name: user.full_name, email: user.email, role: user.role, subscription_type: user.subscription_type });
}
