const hapi=require("hapi")
const app=new hapi.server({
    port:9000,
    host:"localhost"
})


const knex = require('knex')({
    client: 'postgres',
    connection: {
      host : 'localhost',
      user :'postgres',
      password : 'muskan@123',
      database : 'test'
    }
});

knex.schema.hasTable('test_ser').then((exists)=> {
  if (!exists) {
    return knex.schema.createTable('test_ser',(t)=> {
      t.increments('id').primary();
      t.string('first_name', 100);
      t.string('last_name', 100);
      t.string('hobby',100);
      t.string('age',100)
    });
  }
});

app.route([
  {
    method:"POST",
    path:"/create",
    handler: (req,res,next)=>{
        knex('test_ser').insert({
            id: req.payload.id,
            first_name: req.payload.first_name,
            last_name: req.payload.last_name,
            hobby: req.payload.hobby,
            age:req.payload.age
        }).then((data)=>{
            console.log(data)
            return "get"
          }).catch((err)=>{
              console.log(err)
          })
      }
    },
    {
      method:"Get",
      path:"/getall",
      handler:  (req,res)=>{
        return knex.select('*').from("test_ser")
      }
    },
    {
        method:"Get",
        path:"/getall/:id",
        // const { id }=req.params,
        handler:  (req,res)=>{
          return knex.select('*').from("test_ser").where("id",req.params.id)
        }
    }
]
)





//for update

app.put("/update/:id",(req,res)=>{
  knex.update({
    "first_name":req.payload.first_name,
    "last_name": req.payload.last_name,
    "bio":req.payload.bio
  })
    .table("users").where("id",req.params.id)
        .then(()=>{
          res.send("hurrey")
        })
        .catch((err)=>{
          console.log(err)
        })
})

//for delete

app.delete("/delete/:id",(req,res)=>{
  knex('users')
    .where({"id":req.params.id}).del()
    .then(()=>{
      res.send("deleted")
    })
    .catch((err)=>{
      console.log(err)
    })
})

app.listen(9000,()=>{
  console.log("welcome to express")

})
app.start()
console.log("started")