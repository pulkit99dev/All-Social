const express= require('express');
const router = express.Router();
const passport=require('passport');
const postsController=require('../controllers/posts_controller');//this is for accessing the models

// router.get('/post',postsController.postPage);// this is after signing page rendering to the posts psge
router.post('/create',passport.checkAuthentication,postsController.create);//this is for calling the controller to create
router.get('/destroy/:id',passport.checkAuthentication,postsController.destroy)

module.exports=router;