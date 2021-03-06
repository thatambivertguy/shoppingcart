const sequelize=require('sequelize')

const db=new sequelize({
    dialect:'sqlite',
    storage:'shop.db'
})

const products=db.define('products',{
    id:{
        type:sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    name:{
        type:sequelize.STRING,
        allowNull:false,
    },
    manufacturer:{
        type:sequelize.STRING,
    },
    price:{
        type:sequelize.FLOAT,
        allowNull:false,
        defaultValue:0.0,
    },
    type:{
        type:sequelize.STRING
    },
    Image:{
        type:sequelize.STRING
    }
    


})


const users=db.define('users',{
    id:{
        type:sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    name:{
        type:sequelize.STRING,
        allowNull:false,
    }

})


const cart=db.define('cart',{
    username:{
        type:sequelize.STRING
    },
    name:{
        primaryKey :true,
        type:sequelize.STRING,
    },
    manufacturer:{
        type:sequelize.STRING,
    },
    price:{
        type:sequelize.FLOAT,
        allowNull:false,
        defaultValue:0.0,
    },
    type:{
        type:sequelize.STRING
    },
    Image:{
        type:sequelize.STRING
    },
    quantity:{
        type:sequelize.FLOAT,
        allowNull:false,
        defaultValue:1,
    },

})





module.exports={
    db,users,products,cart
}