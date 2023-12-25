const data = {
    users : require('../model/db.json'),
    setUsers : function(data) { this.users = data}
};

const index = (req,res) => {
    res.status(200).json(data.users);
}

const getOneTask = (req,res) => {
    const user = data.users.filter((user)=> user.id === parseInt(req.params.id))
    res.status(200).json(user);
}

module.exports = { index, getOneTask };
