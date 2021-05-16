const express = require('express');

const router = express.Router();
const userApi = require("../../../controllers/api/v1/users_api");

// router.get('/',postApi.index)
// router.delete('/:id',pApi.destroy)

router.post('/create-session',userApi.createSession);



module.exports=router;