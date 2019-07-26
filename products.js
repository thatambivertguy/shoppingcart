const route=require('express').Router()
const {db,users,products,cart}=require('./db')


route.get('/',(req,res)=>{
    products.findAll().then((products)=>{
        res.send(products)
    })
})

//to add a new product into database
route.post('/',(req,res)=>{
     if((req.body.name !="")&&(req.body.manufacturer !="")&&(req.body.price !="")){
    products.create({
        name:req.body.name,
        manufacturer:req.body.manufacturer,
        price:req.body.price,
        type:req.body.type
    }).then((users)=>{
        
        res.render('products')
    })}
    else{this.alert('Kindly fill all the field to add')
        res.render('add',)
    }
})


module.exports=route