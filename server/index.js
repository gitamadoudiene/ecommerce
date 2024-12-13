const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const productRoutes = require('./routes/ProductRoutes');

dotenv.config(); // Charger les variables d'environnement

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' })); // Augmenter la limite de la taille de requête
app.use(express.urlencoded({ limit: '10mb', extended: true })); // Pour les formulaires

// Routes
app.use('/products', productRoutes);

// Route de base pour tester le serveur
app.get('/', (req, res) => {
    res.send('Serveur et MongoDB connectés');
});

// Connexion à MongoDB
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('MongoDB connecté');
        // Lancer le serveur uniquement après la connexion réussie
        app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
    })
    .catch((err) => {
        console.error('Erreur de connexion à MongoDB : ', err.message);
        process.exit(1); // Arrêter l'application en cas d'échec critique
    });
