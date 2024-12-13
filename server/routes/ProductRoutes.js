const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Ajouter un produit
router.post('/', async (req, res) => {
    try {
        console.log('Données reçues:', req.body);  // Debug des données reçues

        const product = new Product(req.body);
        await product.save();

        res.status(201).json(product);
    } catch (error) {
        console.error('Erreur lors de l’ajout du produit', error.message);
        res.status(400).json({ message: error.message });
    }
});

// Récupérer tous les produits
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

console.log(Product); // Ajoutez ceci pour vérifier que Product est bien importé

router.delete('/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const result = await Product.findByIdAndDelete(productId); // Utilisez findByIdAndDelete
        if (!result) {
            return res.status(404).json({ message: 'Produit non trouvé' });
        }
        res.status(200).json({ message: 'Produit supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression du produit', error });
    }
});

// Mettre à jour un produit
router.put('/:id', async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Produit non trouvé' });
        }
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;