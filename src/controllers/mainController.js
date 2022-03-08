const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const userFilePath = path.join(__dirname, '../data/userDataBase.json');
const users = JSON.parse(fs.readFileSync(userFilePath, 'utf-8'));
const { validationResult } = require("express-validator");

const userLoginFilePath = path.join(__dirname, '../data/usersLoginInfo.json');
const usersLoginInfo = JSON.parse(fs.readFileSync(userLoginFilePath, 'utf-8'));


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

    logout: (req, res) => {
		// Borramos el registro de la base de datos si existe
		const token = usersLoginInfo.find(user => user.token = req.cookies.rememberToken);
		if (token) {
			let logerDeleter = usersLoginInfo.filter(user => user.token != req.cookies.rememberToken);
			fs.writeFileSync(userLoginInfoFilePath, JSON.stringify(logerDeleter, null, ' '));
		}
		// Destruimos la sesión
		req.session.destroy();
		
		// Destruimos la cookie de recordar
		res.clearCookie('rememberToken');

		// Redirigimos a la home
		res.redirect('/');
	}

}

module.exports=mainController