import express from 'express';
import * as reservations from '../controllers/reservations.js';
import requireAuth from '../middleware/requireAuth.js';

const router = express.Router();

// router.use(requireAuth);
router.get('/', reservations.getReservations);
router.get('/:id', reservations.getReservation);
router.put('/:id', reservations.updateReservation);
router.post('/', reservations.createReservation);
router.delete('/:id', reservations.removeReservation);

export default router;

