const {Sequelize,DataTypes} = require('sequelize');

const sequelize = new Sequelize('technotackle','root','',{
    host:'localhost',
    dialect : 'mysql',
    logging : false,
    pool : {
        max : 5,
        min : 0,
        idle : 1000
    }
});

sequelize.authenticate().then(()=>{
    console.log("connected to the database successfully");
}).catch( err =>{
    console.log("err",err);
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user")(sequelize,DataTypes);
db.userImage = require('./userImage')(sequelize,DataTypes);

db.users.hasMany(db.userImage,{ as : "userImages",onDelete: 'cascade', hooks:true});
db.userImage.belongsTo(db.users,{
    foreignKey : "userId",
    targetKey: "id",
    allowNull: false,
    as : "user",
});

db.sequelize.sync({force : false })
.then(()=>{
    console.log("yes to re-sync")
}).catch(err=>{
    console.log(err);
});

module.exports = db;