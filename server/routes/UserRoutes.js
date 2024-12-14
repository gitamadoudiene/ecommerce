// routes/UserRoutes.js
const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Inscription d'un nouvel utilisateur
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const newUser  = new User({ username, email, password });
        await newUser .save();
        res.status(201).json({ message: 'Utilisateur créé avec succès' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Connexion d'un utilisateur
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Identifiants invalides' });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtenir les informations de l'utilisateur
router.get('/me', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Accès refusé' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password'); // Exclure le mot de passe
        res.json(user);
    } catch (error) {
        res.status(400).json({ message: 'Token invalide' });
    }
});

module.exports = router;