const product = require('../models/product.Schema')

exports.getAllProducts =async  (req,res) => {
    const products = await product.find({});
    res.send(products);
}

exports.getProductById =async  (req,res) => {
    const id = req.params.id;
    const wantedProduct = await product.findOne({_id : id})
    res.send(wantedProduct)
}

exports.addProduct =async (req,res) => {
    const {title , description , price , category , stock , published} = req.body;
    const newProduct = new product(
        {title : title ,
        description : description ,
        price : price ,
        category : category ,
        owner : req.user.username ,
        stock : stock ,
        published : published == 'true' ? true : false})
    const check  = await newProduct.save();
    res.send(check)
}

exports.updateProduct =async (req,res) => {
    const username = req.user.username;
    const id = req.params.id;
    const {title , description , price , category , stock , published} = req.body;
    const wantedProduct = await product.findOne({_id : id})
    let updatedProduct;
    if(wantedProduct.owner == username){
        updatedProduct = await product.updateOne({_id : id},{
            title : title , 
            description : description , 
            price : price , 
            category : category , 
            stock : stock , 
            published : published == 'true' ? true : false
    })
    res.send('Product Updated Successfully')
}
else res.send('you have an Error')
}

exports.deleteProduct =async (req,res) => {
    try {
        const username = req.user.username;
        const id = req.params.id;
        const wantedProduct = await product.findOne({_id : id})
        console.log(wantedProduct)
        if(wantedProduct.owner == username) {
            const check = await product.deleteOne({_id : id})
            res.send('Product Deleted Successfully')
        }
        
    } catch (error) {
        res.send(error.message)
    }
}