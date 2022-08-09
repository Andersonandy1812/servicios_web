var express = require('express');
var bodyParser = require('body-parser');

var App = express();
var port = process.env.PORT || 3550;

App.use(bodyParser.urlencoded({extended:false}));
App.use(bodyParser.json());

let contacts = [];

//do the contact with the variable contact
fetch('http://www.raydelto.org/agenda.php')
.then(expression => expression.json())
.then(content => contacts = content);


App.get('/', function(res){
	res.status(200).send({
		message: 'GET Home route working fine!'
	});
});

//save contact
App.post('/contacts', (req, res) => {
    const contact = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        telefono: req.body.telefono
    }

    contacts.push(contact)

    const response = {
        data: contact,
        message: 'Contacto agregado correctamente'
    }

    res.send(response)
})

//list
app.get('/contacts', (req, res) => {
    const response = {
        data: contacts
    }

    res.send(response)
})

app.listen(port, function(){
	console.log(`Server running in http://localhost:${port}`);
	console.log('Defined routes:');
	console.log('	[GET] http://localhost:3550/');
});