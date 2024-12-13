const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const productRoutes = require('./routes/ProductRoutes');

const PORT = process.env.PORT || 5000;



dotenv.config();
const app = express();

//middleware
app.use(cors());
app.use(express.json());

//routes
app.use('/products', productRoutes);

app.get('/', (req, res) => {
    res.send('Serveur et MongoDB connectés');
});

app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));

//connect to db
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connecté'))
    .catch((err) => console.error('Erreur de connexion à MongoDB : ', err));