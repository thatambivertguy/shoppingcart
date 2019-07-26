const express=require('express')
const app=express()
const {db,users,products,cart}=require('./db')
const ProductRoute=require('./products')
const UsersRoute=require('./users')


app.use(express.json())
app.use(express.urlencoded(({extended:true})))

app.set('view engine','hbs')
app.use('/',express.static(__dirname+'/public'))
app.use('/products',ProductRoute)
app.use('/users',UsersRoute)





app.post('/tobeaddedtocart',(req,res)=>{
    products.findOne({
        where:{
            name:req.body.name
        }
    }).then((item)=>{
        // console.log(item)
        // console.log(item.dataValues)
        cart.create(item.dataValues).then(cartitem=>{
            res.json(cartitem)
        })   
    })
})
app.get('/mycart',(req,res)=>{
    res.render('cart')
})
app.get('/prod',(req,res)=>{
    products.findAll().then((all)=>{
        res.send(all)
    })
})

app.get('/addtocart',(req,res)=>{
    cart.findAll().then((all)=>{
        res.send(all)
    })
})



app.get('/',(req,res)=>{
    res.render('products')
})

app.get('/add',(req,res)=>{
    res.render('add')
})

db.sync().then(()=>{
    app.listen(4000,()=>{
        console.log('Server Started At  :  http://localhost:4000')
    })
})
