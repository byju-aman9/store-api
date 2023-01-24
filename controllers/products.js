const Product = require('../models/product');

const getAllProductsStatic = async(req, res) => {
    const products = await Product.find({}).sort('name');
    res.status(200).json({products});
}

const getAllProducts = async(req, res) => {
    // we can access the query string parameters using req.query 
    const {featured, company, name, sort, fields} = req.query;

    const queryObject = {};

    if(featured) queryObject.featured = featured === 'true' ? true : false;
    if(company) queryObject.company = company;
    if(name) queryObject.name = {$regex: name, $options: 'i'};

    let result = Product.find(queryObject);

    // adding the sort functionality to current route 
    if(sort) {
        const sortList = sort.split(',').join(' ');
        result = result.sort(sortList);
    } else {
        result = result.sort('createdAt');
    }
    
    // adding the select functionality to only return certain fields 
    if(fields) {
        const fieldList = fields.split(',').join(' ');
        result = result.select(fieldList);
    }

    // adding pagination 
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    result = result.skip(skip).limit(limit);

    const products = await result;
    res.status(200).json({products, nbHits: products.length});
}

module.exports = {
    getAllProducts,
    getAllProductsStatic
}