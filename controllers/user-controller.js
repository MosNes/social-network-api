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
    },
    //get single user by ID and populate thought and friend data
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .select('-__v')
            //also return attached thoughts
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            //also return attached friends
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .then(userData => {
                //if no user found
                if (!userData) {
                    res.status(404).json({ message: 'No user found with this id' });
                    return;
                }
                res.json(userData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    //create new user
    createUser({ body }, res) {
        //expects "username": "user", "email": "user@user.com"
        User.create(body)
            .then(userData => res.json(userData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    //update user by id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            body,
            { new: true, runValidators: true }
        )
            .then(userData => {
                //if no user found
                if (!userData) {
                    res.status(404).json({ message: 'No user found with this id' });
                    return;
                }
                res.json(userData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    //delete user by id
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(userData => {
                //if no user found
                if (!userData) {
                    res.status(404).json({ message: 'No user found with this id' });
                    return;
                }
                res.json(userData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    }
}