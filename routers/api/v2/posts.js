const express = require('express');

const router = express.Router();
const postApi = require("../../../controllers/api/v2/posts_api2");

router.get('/', postApi.indexnew);



module.exports=router;