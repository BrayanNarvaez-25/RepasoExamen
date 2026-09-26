import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// GET /entregas
router.get('/', async (req, res) => {
  const entregas = await prisma.entrega.findMany();
  res.json(entregas);
});

// POST /entregas
router.post('/', async (req, res) => {
  try {
    const { guia, destinatario, montoCobro, fotoBase64 } = req.body;
    const nuevaEntrega = await prisma.entrega.create({
      data: { guia, destinatario, montoCobro, fotoBase64 },
    });
    res.status(201).json(nuevaEntrega);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear la entrega' });
  }
});

// PUT /entregas/:id
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { guia, destinatario, montoCobro, fotoBase64 } = req.body;
    const entregaActualizada = await prisma.entrega.update({
      where: { id: Number(id) },
      data: { guia, destinatario, montoCobro, fotoBase64 },
    });
    res.json(entregaActualizada);
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar la entrega' });
  }
});

// DELETE /entregas/:id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.entrega.delete({ where: { id: Number(id) } });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: 'Error al eliminar la entrega' });
  }
});

export default router;