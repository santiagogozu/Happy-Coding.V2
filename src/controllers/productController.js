const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const userController={


    // MUSTRA PAGINA PRODUCTOS CREATE
    index:(req,res)=>{

      if(req.session.username == 'undefined'){ 
        const usuario='undefined'
        res.render("productCreate", {usuario})
      }else{
        const usuario = req.session.username
        res.rend<er("productCreate", {usuario})
       }
    },


    // SE CREA PRODUCTO
    create:(req,res)=>{
        const {name,price, category, description, image}=req.body
        console.log(name)
       const nuevoProducto={
         id: products[products.length - 1].id + 1, //ID SE CREA CON RESPECTO AL ULTIMO ID
        name:name,
        price:price,
         category:category,
        description:description,
        image:req.file.filename
       }

       products.push(nuevoProducto)
       fs.writeFile(productsFilePath, JSON.stringify(products, null, ' '),(err)=>{
        if (err) {
            console.log("Fallo en la creación del usuario");
          } else {
            console.log("Usuario creado exitosamente");
          }
        });
        
        res.redirect("/");
    },

    // MUESTREA PAGINA PARA EDITAR PRODUCTOS
    edit: (req, res) => {
      let id = req.params.id
      let productToEdit = products.find(product => product.id == id)

      if(req.session.username == 'undefined'){ 
        const usuario='undefined'
        res.render("productEdit", {usuario, productToEdit})
      }else{
        const usuario = req.session.username
        res.render("productEdit", {usuario, productToEdit})
       }
    },

    // EDITAMOS PRODUCTOS
    update: (req, res) => {
      let id = req.params.id;
		  let productToEdit = products.find(product => product.id == id)
      console.log(productToEdit)

      let image

      // COMPARAMOS SI CAMBIAMOS LA IMAGEN POR UNA NUEVA, SI NO ES ASI, GUARDAMOS LA IMAGEN ANTERIOR
      if(req.file != undefined){
      	image = req.file.filename
      } else {
      	image = productToEdit.image
      }

      productToEdit = {
        id: productToEdit.id,
        name:req.body.name,
        price:req.body.price,
        category:req.body.category,
        description:req.body.description,
        image: req.file ? req.file.filename : productToEdit.image
      };

      let newProducts = products.map(product => {
        if (product.id == productToEdit.id) {
          return product = {...productToEdit};
        }
        return product;
      })
  
      fs.writeFileSync(productsFilePath, JSON.stringify(newProducts, null, ' '));

      if(req.session.username == 'undefined'){ 
        const usuario='undefined'
        res.redirect('/');
      }else{
        const usuario = req.session.username
        res.redirect('/');
       }

    }, 


    // MUESTRA EL DETALLE DEL PRODUCTO SELECCIONADO
    detail:(req,res)=>{
      
      let id = req.params.id
      console.log(id)
      let product = products.find(product => product.id == id)
      
      if(req.session.username == 'undefined'){ 
        const usuario='undefined'
        res.render("productDetail.ejs", {usuario, product})
    }else{
        const usuario = req.session.username
        res.render("productDetail.ejs", {usuario, product})
    }

    },
    
    // BORRAMOS EL PRODUCTO
    delete:(req,res)=>{
        let id = req.params.id;
        let finalProducts = products.filter(product => product.id != id);
        fs.writeFileSync(productsFilePath, JSON.stringify(finalProducts, null, ' '));
        res.redirect('/');
    },


}

module.exports=userController