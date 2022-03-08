const express = require("express")
const productController = require("../controllers/productController")
const router=express.Router()
const multer = require('multer')
const path = require('path')


// CODIGO NECESARIO PARA CARGAR IMAGENES
var storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, '../public/images/products')
    },
    filename: function(req,file,cb){
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})


var upload = multer({storage: storage})


/*** CREAR PRODUCTO ***/ 
router.get("/create", productController.index)
router.post("/create", upload.single('image'), productController.create)


/*** DETALLE DE PRODUCTO ***/ 
router.get('/:id', productController.detail); 

/*** EDITAR PRODUCTO ***/ 
router.get('/edit/:id', productController.edit); 
router.put('/edit/:id', upload.single('image'), productController.update); 

/*** ELIMINAR PRODUCTO ***/ 
router.delete('/delete/:id', productController.delete); 

module.exports=router