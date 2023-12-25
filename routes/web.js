const express = require('express');
const router = express.Router();
const users = require('../controllers/UserController');
const data = {
    users : require('../model/db.json'),
    setUsers : function(data) { this.users = data}
};

router.route('/')
    .get(users.index)
    .post(users.store);

router.route('/:id')
    .put(users.updated)
    .delete(users.deleted)

router.param('id', (req,res,next,id) => {
    req.user = data.users.find(input => input.id === parseInt(id));
    next();
})

module.exports = router;