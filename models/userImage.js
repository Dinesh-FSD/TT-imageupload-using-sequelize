module.exports = (sequelize,DataTypes)=>{
    const UserImage = sequelize.define('userImages',{
        img_name : DataTypes.STRING,
        image : DataTypes.STRING,
    },{
        tableName: 'userImages',
        createdAt : false,
        updatedAt : false
    }) 
    return UserImage; 
}
 
