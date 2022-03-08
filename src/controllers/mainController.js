const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));



const mainController={

    // MOSTRAR PAGINA HOME
    home: (req,res)=>{
        if(req.session.username == 'undefined'){ 
            const usuario='undefined'
             res.render("home", {usuario})
        }else{
            const usuario = req.session.username
             res.render("home", {usuario})
        }
    },

    // MOSTRAR PAGINA TSHIRTS
    tshirts: (req,res)=>{

        if(req.session.username == 'undefined'){ 
            const usuario='undefined'
            return res.render("tshirts", {usuario, products})
        }else{
            const usuario = req.session.username
            return res.render("tshirts", {usuario, products})
        }

        // return res.render("tshirts")
    },

    // MOSTRAR PAGINA SOCKS
    socks: (req,res)=>{

        if(req.session.username == 'undefined'){ 
            const usuario='undefined'
            return res.render("socks", {usuario, products})
        }else{
            const usuario = req.session.username
            return res.render("socks", {usuario, products})
        }

    },

    // MOSTRAR PAGINA BAGS
    bags: (req,res)=>{

        if(req.session.username == 'undefined'){ 
            const usuario='undefined'
            return res.render("bags", {usuario, products})
        }else{
            const usuario = req.session.username
            return res.render("bags", {usuario, products})
        }

    },

    // MOSTRART PAGINA HODDIES
    hoodies: (req,res)=>{

        if(req.session.username == 'undefined'){ 
            const usuario='undefined'
            return res.render("hoodies", {usuario, products})
        }else{
            const usuario = req.session.username
            return res.render("hoodies", {usuario, products})
        }

    },

    // MOSTRAR PAGINA HATS
    hats: (req,res)=>{

        if(req.session.username == 'undefined'){ 
            const usuario='undefined'
            return res.render("hats", {usuario, products})
        }else{
            const usuario = req.session.username
            return res.render("hats", {usuario, products})
        }

    },

    // BARRA DE BUSQUEDA
    search:(req,res)=>{
        // let busquedaDeUsuario=req.query.query
        // res.send(busquedaDeUsuario)
    },


    // MOSTRAR PAGINA LOGIN 
    login:(req,res)=>{
        return res.render("login")
    },
}

module.exports=mainController