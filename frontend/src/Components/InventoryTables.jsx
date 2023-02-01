import { useState } from "react"
import { useEffect } from "react"
import axios from "axios"
import Table from "./Table"
import ProductProfile from "./ProductProfile"
import { Autocomplete, TextField } from "@mui/material"

function InventoryTables() {
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(null)

    useEffect(() => {
        axios("http://localhost:4000/category/", {method: "GET"})
        .then(res => {
            setCategories(res.data.data)
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
            renderInput={(params) => <TextField {...params} label="Buscar Categoría" />}
            />
            </div>
                {selectedCategory ?
                        <div className="card m-2" key={selectedCategory.id}>
                            <div className="card-header">
                                {selectedCategory.name}
                            </div>
                            <div className="card-body">
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
                                    "ID": "id",
                                    "Nombre": "name"
                                }}
                                input={{
                                    "name": {
                                        "label": "Nombre",
                                        "type": "text",
                                        "required": true
                                    },
                                    "category_id": {
                                        "label": "",
                                        "type": "hidden",
                                        "required": true,
                                        "defaultValue": selectedCategory.id
                                    }
                                }}
                                select={{}}
                                />         
                            </div>    
                        </div> 
                        :
                        <div className="card m-2">
                            <div className="card-header">
                                Todos
                            </div>
                            <div className="card-body">
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
                                    "ID": "id",
                                    "Nombre": "name"
                                }}
                                input={{
                                    "name": {
                                        "label": "Nombre",
                                        "type": "text",
                                        "required": true
                                    },
                                    "category_id": {
                                        "label": "",
                                        "type": "hidden",
                                        "required": true
                                    }
                                }}
                                select={{}}
                                />         
                            </div>    
                        </div>
                }
        </div>
    )
}

export default InventoryTables