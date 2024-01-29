const data = {
    users : require('../model/db.json'),
    setUsers : function(data) { this.users = data}
};

const index = (req,res) => {
    res.status(200).json(data.users);
}

const sortAsc = (req,res) => {
    let arr = data.users
    arr.sort((a,b) => a.id - b.id)
    res.status(200).json(arr);
}

const sortDesc = (req,res) => {
    let arr = data.users
    arr.sort((a,b) => b.id - a.id)
    res.status(200).json(arr);
}

const getOneTask = (req,res) => {
    const user = data.users.filter((user)=> user.id === parseInt(req.params.id))
    res.status(200).json(user);
}

module.exports = { index, sortAsc, sortDesc, getOneTask };
