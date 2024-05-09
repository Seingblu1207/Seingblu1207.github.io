const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/loginDB')
  .then(() => console.log('Conexión a MongoDB exitosa'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

app.post('/register', async (req, res) => {
  console.log('Solicitud de registro recibida:', req.body);
  const { name, email, password } = req.body;
  const user = new User({ name, email, password });
  try {
    await user.save();
    res.status(201).send();
  } catch (err) {
    console.error('Error al registrar usuario:', err);
    res.status(500).send(); // 500 es el código de estado para "Error interno del servidor"
  }
});

app.post('/login', async (req, res) => {
  console.log('Solicitud de inicio de sesión recibida:', req.body);
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    if (!user) return res.status(400).send();
    res.status(200).send();
  } catch (err) {
    console.error('Error al iniciar sesión:', err);
    res.status(500).send();
  }
});

app.listen(4000, () => console.log('Server started'));

app.get('/users', async (req, res) => {
  const users = await User.find();
  res.send(users);
});