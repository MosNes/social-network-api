const { User } = require('../models');

const userController = {
    //get all users
    getAllUsers(req, res) {
        User.find({})
        //do not return version data
        .select('-__v')
        //sort in descending order, returning most recent users first
        .sort({ _id: -1 })
        .then(userData => res.json(userData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    }
    //get single user by ID and populate thought and friend data
    //create new user
}