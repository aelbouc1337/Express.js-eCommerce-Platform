const { productImage } = require('../helpers/productImages');
const product = require('../models/product.Schema')


const getAllProducts =async () => {
    const products = await product.find({});
    return products;
}


exports.handleQueries =async (req,res) => {
    const query = req.query
    if(query.category)
        res.send (await showByCategory(query.category));
    else if(query.sortBy){
        const field = query.sortBy 
        const order = query.order
        res.send(await showSortedBy(field ,order));
    }
    else if (query.search)
        res.send( await searchByKeyword(query.search))
    else if (query.minPrice)
        res.send ( await showByPriceRange(query.minPrice,query.maxPrice))
    else if (query.page)
       res.send( await showPagination(query.page , query.limit))
    else res.send(await getAllProducts())
}


exports.getProductById =async  (req,res) => {
    const id = req.params.id;
    const wantedProduct = await product.findOne({_id : id})
    res.send(wantedProduct)
}

exports.addProduct =async (req,res) => {
    const {title , description , price , category , stock , published} = req.body;
    const filenames = productImage(req.files)
    const newProduct = new product(
        {title : title ,
        description : description ,
        price : price ,
        category : category ,
        owner : req.user.username ,
        stock : stock ,
        Images : filenames,
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
    const filenames = productImage(req.files)
    if(wantedProduct.owner == username){
        updatedProduct = await product.updateOne({_id : id},{
            title : title , 
            description : description , 
            price : price , 
            category : category , 
            stock : stock , 
            Images : filenames,
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


const showByCategory =async (category) => {
    const Products = await product.find({category : category});
    return Products;
}

const showSortedBy = async (field,order) => {
    const sortedProducts = await product.find({}).sort({ [field]: order})
    return sortedProducts;
}

const searchByKeyword = async (keyword) => {
    const Products = await product.find({
        $or :[{title : {$regex : keyword , $options : 'i'}},
        {description : {$regex : keyword , $options : 'i'}}],
    })
    return Products;
}

const showByPriceRange = async (minPrice,maxPrice) => {
    const Products = await product.find({price : {$gte : minPrice , $lte : maxPrice}})
    return Products;
}

const showPagination = async (page , limit) => {
    const skip = (page - 1) * limit;
    const Products = product.find({}).skip(skip).limit(limit);
    return Products;
}

exports.getStats = async (req, res) => {
    console.log('eee');
    try {
        const stats = await product.aggregate([
            {
                $match : {
                    category : 'Electronique'
                }
            },
            {
                $group : {
                    _id : "$category",
                    averagePrice : { $avg : '$price'},
                    averageStock: {$sum : '$stock'}
                }
            }
,
        ]);
        res.send(stats);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error', message: error.message });
    }
};