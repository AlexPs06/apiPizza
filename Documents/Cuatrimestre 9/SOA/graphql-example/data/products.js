// var mysql = require('mysql');
// var connection = mysql.createConnection({
//     host : 'localhost',
//     port: 3306,
//     user : 'root',
//     password : '',
//     database : 'graphql'
// });
config={
    host : 'localhost',
    port: 3306,
    user : 'root',
    password : '',
    database : 'graphql'   
}
// connection.connect();
var database = require("./Database") ;
var db =new database.Database(config)
let products=[
    {
        id: 0,
        name: "no se pudo",
        description: "No"
    }
];

async function addProducts(name, description){
    let todos = {
        name: name,
        description: description
    };
    name = "'"+name+"'"
    description = "'"+description+"'"
   
      let sql ="INSERT INTO products (name, description) VALUES ("+name+","+description+")"
    item=[]
    var query = await db.query( sql );
    item={
        id:query.insertId,
        name:todos.name,
        description: todos.description
    }    
    products.push(item)
    return item;
}

 async function getProducts(){
    products=[];
    var query = await db.query( 'SELECT * FROM products' );
    console.log(query)
    query.forEach(element => {
        item={
            id:element.id,
            name: element.name,
            description: element.description
        }
        products.push(item)
    }); 
    return products
}




async function deleteProduct  (id){

    var query = await db.query( 'DELETE FROM products WHERE products.id= ?',[id] );
    console.log(query)
    const product = products.find(p => p.id === id);
    const index= products.indexOf(product,0);
    products.splice(index,1);
    return products;
}
async function updateProduct (id, name ,description){


    var query = await db.query( 'UPDATE products SET products.name =? ,products.description=? WHERE products.id = ?',[ name ,description,id] );
    console.log(query)

    const product = products.find(p => p.id === id);
    const index= products.indexOf(product,0);
    products[index].name=name;
    products[index].description=description;
    return product;
}

module.exports={
    getProducts,
    addProducts,
    deleteProduct,
    updateProduct
}
