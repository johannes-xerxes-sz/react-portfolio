const express = require('express');
const router = express.Router();
const {
    getUsers,
    createUser,
    deleteUsers,
    getUser,
    updateUser, 
    deleteUser,
    login,
    forgotPassword,
    resetPassword,
    logout,
    updatePassword
 
} = require('../controllers/userController');
// const protectedRoute = require('../middlewares/auth')
const reqRecievedLogger  = require('../middlewares/reqRecievedLogger');
const {
    userValidator,
} = require('../middlewares/utils/validators')

//root

router.route('/')
    .get(reqRecievedLogger, getUsers) //protectedRoute, 
    .post(reqRecievedLogger, userValidator, createUser)
    .delete(reqRecievedLogger, deleteUsers) //protectedRoute, 


router.route('/login')
    .post(reqRecievedLogger, login)
 
    router.route('/forgotpassword')
    .post(reqRecievedLogger, forgotPassword)

router.route('/resetpassword')
    .put(reqRecievedLogger, resetPassword) //protectedRoute, 

router.route('/updatepassword')
    .put(reqRecievedLogger, updatePassword)

router.route('/logout')
    .get(reqRecievedLogger, logout) //protectedRoute, 


router.route('/:userId')
    .get(reqRecievedLogger, getUser) 
    .put(reqRecievedLogger, updateUser) //protectedRoute, 
    .delete(reqRecievedLogger, deleteUser) //protectedRoute, 

    module.exports = router;