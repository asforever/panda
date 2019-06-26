import express from 'express';
import User from '../../mongooseApp/models/User'
const router = express.Router();

/* GET users listing. */
router.get('/users', (req, res, next) => {
    console.log(req.query.id)
    res.send(req.query.id);
});

export default router
