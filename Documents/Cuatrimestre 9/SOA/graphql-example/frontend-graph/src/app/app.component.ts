import { Component, OnInit } from '@angular/core';
import {Apollo } from 'apollo-angular';
import * as Query from  './query'
import { variable } from '@angular/compiler/src/output/output_ast';
import { FormGroup, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'frontend-graph';
  products:any=[];
  addProductsForm :FormGroup;
  isEdit:boolean=false;
  isNew:boolean =true;
  id=0
  constructor (
    private apollo: Apollo,
    private formBuilder: FormBuilder,
    ){
    this.getProducts();
  }
  ngOnInit(){
    this.addProductsForm = this.formBuilder.group({
      nombre:[''],
      descripcion:['']
    })
  }
  
  getProducts(){
    this.apollo.watchQuery({query: Query.Products}).valueChanges.subscribe(response=>{
      console.log(response)
      this.products=response.data["products"];
    });
  }

  addProducts(){
    
    console.log(this.addProductsForm.value)
    this.apollo.mutate({
      mutation:Query.createProduct,
      variables:{
        name: this.addProductsForm.get("nombre").value,
        description: this.addProductsForm.get("descripcion").value
      },
      update:(proxy,{data:{ createProduct  }})=>{
        const data: any = proxy.readQuery({query: Query.Products});
        this.products.push(createProduct);
        proxy.writeQuery({query: Query.Products, data});
      }
      
    }).subscribe(({data})=>{
      console.log(data)
      this.addProductsForm.get("nombre").setValue("");
      this.addProductsForm.get("descripcion").setValue("");
    }), (error)=>{
      console.log("error: ",error)
      
    }
    // this.apollo.watchQuery( {query: Query.addProduct} ).valueChanges.subscribe(response=>{
    //   console.log(response)
    //   this.products=response.data["products"];
    // });
  }

  editProduct(item: any){
    console.log(item)
    this.addProductsForm.get("nombre").setValue(item.name);
    this.addProductsForm.get("descripcion").setValue(item.description);
    this.isNew=false;
    this.isEdit=true;
    this.id=item.id
  }
  updateProduct(){
    console.log(this.addProductsForm.value)
    this.apollo.mutate({
      mutation:Query.updateProduct,
      variables:{
        id:this.id,
        name: this.addProductsForm.get("nombre").value,
        description: this.addProductsForm.get("descripcion").value
      },
      update:(proxy,{data:{ updateProduct  }})=>{
        const data: any = proxy.readQuery({query: Query.Products});
        const index= this.products.findIndex(x=>x.id==this.id)
        this.products[index]=updateProduct;
        proxy.writeQuery({query: Query.Products, data});
      }
      
    }).subscribe(({data})=>{
      console.log(data)
      console.log("todo bien")
      this.isEdit=false;
      this.isNew=true;
      this.addProductsForm.reset();
      
    }), (error)=>{
      console.log("error: ",error)
      
    }
  }
  deleteProduct(id){
    this.apollo.mutate({
      mutation:Query.deleteProduct,
      variables:{
        id:id
      },
      update:(proxy,{data:{ deleteProduct  }})=>{
        const data: any = proxy.readQuery({query: Query.Products});
        const index= this.products.findIndex(x=>x.id==id)
        this.products.splice(index,1)
        proxy.writeQuery({query: Query.Products, data});
      }
    }).subscribe(({data})=>{
      console.log(data)
      console.log("todo bien")
      this.isEdit=false;
      this.isNew=true;
      this.addProductsForm.reset();
      
    }), (error)=>{
      console.log("error: ",error)
      
    }
  }
}
