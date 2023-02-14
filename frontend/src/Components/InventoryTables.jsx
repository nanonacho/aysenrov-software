import { useState } from "react"
import { useEffect } from "react"
import axios from "axios"
import Table from "./Table"
import ProductProfile from "./ProductProfile"
import { Autocomplete, TextField } from "@mui/material"

function InventoryTables() {
    const [categories, setCategories] = useState([])
    const [products, setProducts] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [selectedProduct, setSelectedProduct] = useState(null)

    useEffect(() => {
        axios("http://localhost:4000/category/", {method: "GET"})
        .then(res => {
            setCategories(res.data.data)
        })

        axios("http://localhost:4000/product/", {method: "GET"})
        .then(res => {
            setProducts(res.data.data)
        })

    }, [])

    return (
        
        <div className="row justify-content-center">
            <div className="d-flex align-items-center justify-content-center">
            <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={categories}
            getOptionLabel={option => option.name}
            onChange={(e, selectedCategory) => setSelectedCategory(selectedCategory)}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Filtrar por Categoría" />}
            />
            <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={products}
            getOptionLabel={option => option.name + " | " + option.id}
            onChange={(e, selectedProduct) => setSelectedProduct(selectedProduct)}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Buscar Producto" />}
            />
            </div>
            {selectedProduct ? 
                <div>
                    <button className="btn btn-danger" onClick={() => setSelectedProduct(null)}>Cerrar</button>
                    <ProductProfile object={selectedProduct}/>
                </div>
            :
                selectedCategory ?
                        <div className="" key={selectedCategory.id}>
                                <Table
                                key={selectedCategory.id}
                                create={true}
                                update={true}
                                getUrl={"http://localhost:4000/product/category/" + selectedCategory.id} 
                                postUrl={"http://localhost:4000/product/"}
                                updateUrl={"http://localhost:4000/product/"}
                                deleteUrl={"http://localhost:4000/product/"}
                                children={ProductProfile}
                                childrenTitle={"Stock"}
                                col={{
                                    "ID": ["id"],
                                    "Categoría": ["category_id"],
                                    "Nombre": ["name"],
                                    "Stock Total": ["total_stock"],
                                    "Stock Ocupado" : ["not_avail_stock"]
                                }}
                                input={{
                                    "name": {
                                        "label": "Nombre",
                                        "type": "text",
                                        "required": true
                                    }
                                }}
                                select={{
                                    "category_id": {
                                        "label": "Categoría",
                                        "required": true,
                                        "options": categories.map(category => {
                                            const categ = {}
                                            categ["label"] = category.name
                                            categ["value"] = category.id
                                            return categ 
                                        })
                                    }
                                }}
                                />         
                        </div> 
                        :
                        <div className="">
                                <Table
                                create={true}
                                update={true}
                                getUrl={"http://localhost:4000/product/"} 
                                postUrl={"http://localhost:4000/product/"}
                                updateUrl={"http://localhost:4000/product/"}
                                deleteUrl={"http://localhost:4000/product/"}
                                children={ProductProfile}
                                childrenTitle={"Stock"}
                                col={{
                                    "ID": ["id"],
                                    "Categoría": ["category_id"],
                                    "Nombre": ["name"],
                                    "Stock Total": ["total_stock"],
                                    "Stock Ocupado" : ["not_avail_stock"]
                                }}
                                input={{
                                    "name": {
                                        "label": "Nombre",
                                        "type": "text",
                                        "required": true
                                    }
                                }}
                                select={{
                                    "category_id": {
                                        "label": "Categoría",
                                        "required": true,
                                        "options": categories.map(category => {
                                            const categ = {}
                                            categ["label"] = category.name
                                            categ["value"] = category.id
                                            return categ 
                                        })
                                    }
                                }}
                                />         
                              
                        </div>
                }
        </div>                                                                                                          
    )
}

export default InventoryTables