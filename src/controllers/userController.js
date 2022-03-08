const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs')
const crypto = require('crypto');

const userFilePath = path.join(__dirname, '../data/userDataBase.json');
const users = JSON.parse(fs.readFileSync(userFilePath, 'utf-8'));
const { validationResult } = require("express-validator");

const userLoginFilePath = path.join(__dirname, '../data/usersLoginInfo.json');
const usersLoginInfo = JSON.parse(fs.readFileSync(userLoginFilePath, 'utf-8'));

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const userController={


    // MUSTRA PAGINA LOGIN
    index:(req,res)=>{
        res.render("login")
    },

    // CREAMOS NUEVO USUARIO
    create:(req,res)=>{
      let errors=validationResult(req) //CODIGO NECESARIO PARA VALIDAR LOS ERRORES DE EXPRESS VALIDATOR
      // COMPARADOR PARA VERIFICAR SI TENEMOS ERRORES EN EL LOGIN
      if(errors.isEmpty()){
        const {username1,email1, pass1, pass2}=req.body
        const nuevouser={
         id: users.length,
         username:username1,
         email:email1,
         pass1:pass1,
         pass2:pass2,
       }

       			//encriptamos la contrasenia y borramos el password para q noo se guarde en nuestro json
      nuevouser.pass1 = bcrypt.hashSync(pass1, 10);

       users.push(nuevouser)
       fs.writeFile(userFilePath, JSON.stringify(users, null, ' '),(err)=>{
        if (err) {
            console.log("Fallo en la creación del usuario");
          } else {
            console.log("Usuario creado exitosamente");
          }
        });
         res.redirect("/");
      }
      else{
        let validador =1
        return res.render("login",{errors:errors.errors, validador})
      }
    },


    // LOGUEAMOS AL USUARIO
    login:(req,res)=>{
      let errors=validationResult(req) //CODIGO NECESARIO PARA VALIDAR LOS ERRORES DE EXPRESS VALIDATOR
      // COMPARADOR PARA VERIFICAR SI TENEMOS ERRORES EN EL LOGIN
      if(errors.isEmpty()){

        
        const usuario = req.session.username

        const user = req.body.username;
        const password = req.body.pass

        //verifico si el mail q puso en el formulario esta en nuestra db

		    let userVerificado = users.find(userVerificado => userVerificado.username ==user)

        if (userVerificado){
          // verificamos conrtaseña
			    if (bcrypt.compareSync(password,userVerificado.pass1)) {
              //  req.session.userVerificado = userVerificado; //PORUQE SE HACE ESTO ???

              req.session.username = req.body.username
            
            
              if (req.body.remember) {

              const token = crypto.randomBytes(64).toString('base64');
              userVerificado.token=token
              // Lo guardamos en base, para poder chequearlo luego
        
              let userLoginInfo = [...usersLoginInfo, userVerificado]
              fs.writeFileSync(userLoginFilePath, JSON.stringify(userLoginInfo, null, ' '));
              
              // Recordamos al usuario por 3 meses         msegs  segs  mins  hs   días
              res.cookie('rememberToken', token, { maxAge: 1000 * 60  * 60 *  24 * 90 });      
            }
				    // Finalmente lo mandamos a la home
				    res.redirect('/');
          }else{
            console.log("usuario no valido")
            res.render('login', {old: req.body, errors: {usuarios: 'contraseña o usuario no valido'}});      
          }
           } else {
            // Si la contraseña esta mal
            console.log("usuario no valido")
             res.render('login', {old: req.body, errors: {usuarios: 'Usuario no valido'}});
			 }
      //  res.redirect("/");
        }
      else{
        let validador =1
        res.render("login",{errors:errors.errors, validador})
      } 
    },


    // EDITAMOS AL USUARIO
    edit: (req, res) => {
      let id = req.params.id
      let productToEdit = users.find(product => product.id == id)

      res.render('productEdit', {productToEdit})
    },

    update: (req, res) => {
      
      let id = req.params.id;
      console.log(req.body.name)
		  let productToEdit = users.find(product => product.id == id)

      let image

      if(req.files[0] != undefined){
      	image = req.files[0].filename
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

      let newusers = users.map(product => {
        if (product.id == productToEdit.id) {
          return product = {...productToEdit};
        }
        return product;
      })
  
      fs.writeFileSync(userFilePath, JSON.stringify(newusers, null, ' '));
      res.redirect('/');

    }, 

    detail:(req,res)=>{

      console.log("entra a detail")
      let id = req.params.id
      console.log(id)
      let product = users.find(product => product.id == id)
      console.log(product)
      res.render('productDetail', {product})
    },
    
    delete:(req,res)=>{
        let id = req.params.id;
        let finalusers = users.filter(product => product.id != id);
        fs.writeFileSync(userFilePath, JSON.stringify(finalusers, null, ' '));
        res.redirect('/');
    },


}

module.exports=userController