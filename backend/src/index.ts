import express from 'express';
import entregaRoutes from './controllers/entregaController.js';

const app = express();

app.use(express.json({ limit: '10mb' }));

app.use('/entregas', entregaRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});