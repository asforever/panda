import express from 'express';
import MobileGame from '../models/mongodb/games/MobileGame'

const router = express.Router();

router.get('/games', (req, res, next) => {
    let query = MobileGame.find({});
    query.exec(function (err, docs) {
        console.log(docs);
        res.send(JSON.stringify(docs))
    })
});

export default router
