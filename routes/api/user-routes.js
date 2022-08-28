const router = require('express').Router();
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require('../../controllers/user-controller');

//GET all users and POST a user at /api/users/
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

//GET, PUT, and DELETE user by ID at /api/users/:id
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

module.exports = router;