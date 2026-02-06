const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

function generateToken(params = {}) {
  return jwt.sign(params, process.env.JWT_SECRET || 'sua_chave_secreta_aqui', {
    expiresIn: process.env.JWT_EXPIRES_IN || '1h',
  });
}

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  if (await User.findByEmail(email)) {
    return res.status(400).json({ error: 'Usuário já existe' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword });

  user.password = undefined;

  res.status(201).json({
    user,
    token: generateToken({ id: user.id }),
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findByEmail(email);

  if (!user) {
    return res.status(400).json({ error: 'Usuário não encontrado' });
  }

  if (!(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ error: 'Senha inválida' });
  }

  user.password = undefined;

  res.json({
    user,
    token: generateToken({ id: user.id }),
  });
};

exports.createUser = async (req, res) => {
  const { name, email } = req.body;
  const user = await User.create({ name, email });
  res.status(201).json(user);
};

exports.getUsers = async (req, res) => {
  const users = await User.findAll();
  res.status(200).json(users);
};

exports.getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({ error: 'Usuário não encontrado' });
  }
  res.status(200).json(user);
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const user = await User.update(id, { name, email });
  if (!user) {
    return res.status(404).json({ error: 'Usuário não encontrado' });
  }
  res.status(200).json(user);
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.delete(id);
  if (!user) {
    return res.status(404).json({ error: 'Usuário não encontrado' });
  }
  res.status(200).json({ message: 'Usuário deletado com sucesso' });
};
