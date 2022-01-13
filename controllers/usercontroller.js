const db = require('../models');  
const userImage = require('../models/userImage');
const User = db.users;
const UserImage = db.userImage;

const addUser =  async(req,res)=>{
    try{
     
        if (req.files.length>1) {
            let data1 = {userName :req.body.name};
            let addUser = await User.create(data1);
            let userId = await addUser.id;
            let data2 = [];
            for (var i = 0; i < req.files.length; i++) {
                    data2.push({ image: 'http://127.0.0.1:3000/public/images/' + req.files[i].filename, img_name: req.body.img_desc[i], userId })
                }
                let adduserImage = await UserImage.bulkCreate(data2);
                res.redirect('/UserList');

        }else{
                console.log(req.files[0].filename);
                let username = {userName :req.body.name};
                let addUser = await User.create(username); 
                let userId = await addUser.id;
                let imageNames =  { img_name : req.body.img_desc , image:'http://127.0.0.1:3000/public/images/'+req.files[0].filename,userId};

                let adduserImage = await UserImage.create(imageNames);
                res.redirect('/UserList');
            } 
    } catch (err) {
        console.log(err);
      }
}

const createUser = (req,res)=>{
    res.render('createUser'); 
}

const userList = async (req,res)=>{
    let allUser = await User.findAll({ 
        include: [{
            model : UserImage,
            as:"userImages", 
            attributes : ['image','img_name','userId','id'],
        }]
     });
    // console.log(allUser);
    res.render("userList",{result : allUser});
    // res.json(allUser); 
}

const userDetail = async (req,res)=>{
    let id = req.params.id;
    let singleUser = await User.findByPk( id,{ 
        include: [{
            model : UserImage,
            as:"userImages", 
            // attributes : ['image','img_name','userId','id'],
        }]
     });
    // console.log(singleUser);
    res.render("userDetails",{ result : singleUser}); 
    // res.json(singleUser);
}

const about = (req,res)=>{ 
    res.render("about");
}

const userEditPage = async (req,res)=>{
    let id = req.params.id;
    let singleUser = await User.findByPk( id,{ 
        include: [{
            model : UserImage,
            as:"userImages", 
            // attributes : ['image','img_name','userId','id'],
        }]
     });
    // res.json(singleUser);
    res.render("editUser",{result:singleUser}); 
}

const userEdit = async (req,res)=>{
    console.log("user id :" + req.body.userId);
    console.log("userName :",req.body.userName);
    console.log("user selected images :" + req.body.selected_img);
  
    let newImage = "http://127.0.0.1:3000/public/images/"+req.files[0].filename;
    // console.log("new image name :", newImage);
    let id = req.body.userId;
    let editUserName = await User.update({userName:req.body.userName},{
        where :{id}
    });
    let editImage = await UserImage.update({image : newImage},{
        where:{
            image : req.body.selected_img,
        }
    });
      res.redirect("/userList");
}

const userDelete = async (req,res)=>{ 
    let id = req.params.id;
    let deleteUser = await User.findByPk( id,{ 
        include: [{
            model : UserImage,
            as:"userImages", 
            // attributes : ['image','img_name','userId','id'],
        }]
     });
    let deleteduser = await deleteUser.destroy({});
    res.json({ redirect: "/userList" });
}

const imgDelete = async (req,res)=>{
    let singleImg_delete = await UserImage.destroy({
        where:{
            image : req.body.data
        }
    })
    res.json({ redirect: "/userList" });
}


module.exports = {
    addUser,
    createUser,
    userList,
    userDetail,
    about,
    userDelete,
    userEditPage,
    userEdit,
    imgDelete,
}