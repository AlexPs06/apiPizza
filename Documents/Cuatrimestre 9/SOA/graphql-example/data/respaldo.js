var mysql = require('mysql');
var connection = mysql.createConnection({
    host : 'localhost',
    port: 3306,
    user : 'root',
    password : '',
    database : 'graphql'
})
connection.connect();

let products=[
    {
        id: 1,
        name: "coca cola",
        description: "Refresco"
    },
    {
        id: 2,
        name: "tequila",
        description: "Se mexcla con la coca cola"
    },
    {
        id: 3,
        name: "tonayan",
        description: "Mas corriente mas ambiente"
    }
];

const addProducts = (name, description)=>{
    
    id=0;
    if(products.length>0){
        id = products[products.length-1].id+1;
    } 
    
    const newProduct={id,name,description};
    products=[...products, newProduct];
    return{...newProduct}
}

const getProducts =()=>{
    return products;
}
const deleteProduct = (id)=>{
    const product = products.find(p => p.id === id);
    const index= products.indexOf(product,0);
    products.splice(index,1);
    return products;
}
const updateProduct = (id, name ,description)=>{
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