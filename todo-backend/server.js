const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

// Configurer l'application
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json()); // pour interpréter les requêtes JSON

// Configurer la connexion à PostgreSQL
const pool = new Pool({
  user: 'diangou-cmr',       // Remplacez par votre utilisateur PostgreSQL
  host: 'postgresql-diangou-cmr.alwaysdata.net',
  database: 'todolist',       // Remplacez par le nom de votre base de données
  password: 'Afrique2012!',   // Remplacez par votre mot de passe PostgreSQL
  port: 5432,
});

// Route pour obtenir toutes les tâches
app.get('/tasks', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tasks ORDER BY id');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des tâches' });
  }
});

// Route pour ajouter une nouvelle tâche
app.post('/tasks', async (req, res) => {
  const { name, date, time } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO tasks (name, date, time) VALUES ($1, $2, $3) RETURNING *',
      [name, date, time]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la création de la tâche' });
  }
});

// Route pour mettre à jour une tâche
app.put('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { name, date, time } = req.body;
  try {
    const result = await pool.query(
      'UPDATE tasks SET name = $1, date = $2, time = $3 WHERE id = $4 RETURNING *',
      [name, date, time, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la tâche' });
  }
});

// Route pour supprimer une tâche
app.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la suppression de la tâche' });
  }
});

// Lancer le serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
