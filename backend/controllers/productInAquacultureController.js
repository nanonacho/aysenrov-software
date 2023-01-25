const ProductInAquaculture = require("../models/ProductInAquaculture")

/*
Functionality: Get one productAq by id 
*/
exports.getProductAq = async (req, res) => {
    try {
        const productAq = await ProductInAquaculture.findOne({ where: {id : req.params.id }})
        if (productAq == null) res.status(404).send({error: "Product in aquaculture not found", data: null})
        else {
            res.status(200).send({error: null, data: shift})
        }
    } catch {
        res.status(500).send({error: "Internal server error", data: null})
    }
}

/*
Functionality: Get all productAq by product_id 
*/
exports.getpProductAqByProduct = async (req, res) => {
    try {
        const productAq = await ProductInAquaculture.findOne({ where: {product_id : req.params.product_id }})
        if (productAq == null) res.status(404).send({error: "Product in aquaculture not found", data: null})
        else {
            res.status(200).send({error: null, data: shifts})
        }
    } catch {
        res.status(500).send({error: "Internal server error", data: null})
    }
}

/*
Functionality: Get all productAq by aquaculture_id 
*/
exports.getProductAqByAquaculture = async (req, res) => {
    try {
        const productAqs = await ProductInAquaculture.findOne({ where: {aquaculture_id : req.params.aquaculture_id }})
        if (productAqs == null) res.status(404).send({error: "Product in aquaculture not found", data: null})
        else {
            res.status(200).send({error: null, data: shifts})
        }
    } catch {
        res.status(500).send({error: "Internal server error", data: null})
    }
}

/*
Functionality: Get all productAqs 
*/
exports.getProductAq = async (req, res) => {
    try {
        const productAqs = await ProductInAquaculture.findAll()
        //setTimeout(() => {  res.status(200).send({error: null, data: users}) }, 5000);
        res.status(200).send({error: null, data: productAqs})
    } catch {
        res.status(500).send({error: "Internal server error", data: null})
    }
}

/*
Functionality: Create a new productAq 
*/
exports.postProductAq = async (req, res) => {
    try {
        const productAq = new ProductInAquaculture({
            product_id: req.body.product_id,
            aquaculture_id: req.body.aquaculture_id,
            quantity: req.body.quantity,
            start_date: req.body.start_date,
            end_date: req.body.end_date
        })
    
        await productAq.save()
        res.status(201).send({error: null, data: productAq})
    } catch (error) {
        res.status(400).send({error: error, data: null})
    }
    
}

/*
Functionality: Find and update a productAq by id
*/
exports.putProductAq = async (req, res) => {
    try {
        const productAq = await ProductInAquaculture.update(req.body, { where: {id: req.params.id} })
        if (productAq == 1) res.status(200).send({error: null, data: productAq}) 
        else res.status(404).send({error: "Product in aquaculture not found", data: null})
    } catch (error) {
        res.status(400).send({error: error, data: null})
    }
}

/*
Functionality: Delete one productAq by id
*/
exports.deleteProductAq = async (req, res) => {
    try {
        const response = await ProductInAquaculture.destroy({where: {id: req.params.id}})
        
        if (response == 1) res.status(200).send({error: null, data: "Product in aquaculture removed"})
        else res.status(404).send({error: null, data: "Product in aquaculture not found"})
        
       console.log(response)
    } catch (error) {
        res.status(500).send({error: "Internal server error", data: null})
    }
}