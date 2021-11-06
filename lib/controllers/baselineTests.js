const { Router } = require('express');
const BaselineTest = require('../models/BaselineTest');
const BaselineTestService = require('../services/BaselineTestService');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const newUser = await BaselineTest.register(
        req.body.contact,
        req.body.passing
      );
      res.send(newUser);
    } catch (err) {
      next(err);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const replicants = await BaselineTest.getAll();
      res.send(replicants);
    } catch (err) {
      next(err);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const replicant = await BaselineTest.getId(id);
      res.send(replicant);
    } catch (err) {
      next(err);
    }
  })

  .patch('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const { contact } = req.body;
      const { passing } = req.body;
      const replicant = await BaselineTestService.updateReplicant(
        contact,
        passing,
        id
      );
      res.send(replicant);
    } catch (err) {
      next(err);
    }
  });

// .delete('/:id', async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const order = await OrderService.deleteOrder(id);
//     res.status(204);
//     res.send(order);
//   } catch (err) {
//     next(err);
//   }
// });
