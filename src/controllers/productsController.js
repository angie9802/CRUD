const fs = require('fs');
const path = require('path');

const productsFilePath = path.resolve(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const pathViews = (viewName)=>{
    return '../views/'+viewName+'.ejs'
}
const lastId= ()=>{
	let last = 0;
	products.forEach(product=>{
		if(product.id > last){
			last = product.id
		}
	});
	return last+1
}
const controller = {
	// Root - Show all products
	index: (req, res) => {
		// Do the magic
		res.render('products', {products})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		// Do the magic
		let id = req.params.id;
        let product = products.find(item =>{
                return item.id == id
        })
        res.render('detail',{ product })
	},

	// Create - Form to create
	create: (req, res) => {
		// Do the magic
		res.render('product-create-form')
	},
	
	// Create -  Method to store
	store: (req, res) => {
		// Do the magic
		
		let product={
			id: lastId(),
			...req.body,
			image: "default-image.png"
		}
		
		products.push(product)

		let jsonProducts = JSON.stringify(products,null,4);
		fs.writeFileSync(productsFilePath,jsonProducts);
		res.redirect('/')
	},

	// Update - Form to edit
	edit: (req, res) => {
		// Do the magic
		res.send("edit")
	},
	// Update - Method to update
	update: (req, res) => {
		// Do the magic
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		// Do the magic
		let id = req.params.id;
		let deleted = products.find(product => product.id === id)
		
		res.redirect('/')
	}
};

module.exports = controller;