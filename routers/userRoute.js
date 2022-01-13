const express= require('express');
const router = express.Router();
const userCtrl = require('../controllers/usercontroller');
const upload = require('../middleware/upload');

router.get('/userList',userCtrl.userList);

router.get('/about',userCtrl.about);

router.get('/',userCtrl.createUser);

router.get('/create-user',userCtrl.createUser);

router.post('/add-userdata',upload.array("images"),userCtrl.addUser);

router.get('/user-detail/:id',userCtrl.userDetail);

router.get('/edit-user/:id',userCtrl.userEditPage);

router.post('/edit-user/:id',upload.array("images"),userCtrl.userEdit);

router.delete('/singleImg-del/:id',userCtrl.imgDelete);

router.delete('/delete-user/:id',userCtrl.userDelete);




module.exports = router;
