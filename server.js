const express=require('express')
const app=express()
const multer =require('multer')
const path =require('path')
const fs=require('fs')
const {db,users,products,cart}=require('./db')
const ProductRoute=require('./products')
const UsersRoute=require('./users')


app.use(express.json())
app.use(express.urlencoded(({extended:true})))

app.set('view engine','hbs')
app.use('/',express.static(__dirname+'/public'))
app.use('/products',ProductRoute)
app.use('/users',UsersRoute)

const uploadFolder = "./public/uploads";
if (!fs.existsSync(uploadFolder)) {
    fs.mkdirSync(uploadFolder);
  }
  
  var storage = multer.diskStorage({
    destination: function(req, file, callback) {
      callback(null, uploadFolder);
    },
    filename: function(req, file, callback) {
      callback(null, Date.now() + path.extname(file.originalname));
    }
  });
  
  var upload = multer({ storage: storage });
  

app.post('/decquant',(req,res)=>{
    // Model.decrement('number', { where: { foo: 'bar' });
    cart.decrement('quantity',{where :{name:req.body.name}})
    cart.findAll({where :{name:req.body.name}}).then(t=>{
        console.log(t[0].dataValues.quantity)
        
        res.sendStatus(parseInt(t[0].dataValues.quantity))
    })
})


app.post('/tobeaddedtocart',(req,res)=>{
    products.findOne({
        where:{
            name:req.body.name
        }
    }).then((item)=>{
        // console.log(item)
        console.log(item.dataValues.name)
  
    cart.create(item.dataValues).then(cartitem=>{
            res.json(cartitem)
        }).catch(()=>{
            cart.findAll({where:{name :item.dataValues.name}}).then(r=>{
                console.log(r)
               cart.increment('quantity',{where:{name : item.dataValues.name}})
            })
        }) 
    })
})

// app.get('/upsert',(req,res)=>{
//     cart.upsert({
//         name : 'abc',
//         quantity : quantity+1,
//     }).then((t)=>{
//         console.log(t)
//     })
// })

// app.get('/incr',(req,res)=>{
//     // Model.increment('number', { where: { foo: 'bar' });
//  cart.increment('quantity',{where:{name : 'abc'}})
// })

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

app.post('/delcart',(req,res)=>{
    cart.destroy({where : {name :req.body.name}}).then(t=>{
        res.sendStatus(200)
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
