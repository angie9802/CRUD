const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const pathViews = (viewName)=>{
    return '../views/'+viewName+'.ejs'
}
const controller = {
	index: (req, res) => {
		let visited = products.filter( product =>{
			return product.category == "visited"
		});
		let insale = products.filter( product =>{
			return product.category == "in-sale"
		});
		res.render(path.resolve(__dirname,pathViews('index')),{visited,insale})
	},
	search: (req, res) => {
		// Do the magic
	},
};

module.exports = controller;
