module.exports = (sequelize,DataTypes)=>{
    const Users = sequelize.define("users",{
        // userId : DataTypes.INTEGER NOT NULL auto_increment;
        userName : DataTypes.STRING,
    }); 
    return Users;    
}