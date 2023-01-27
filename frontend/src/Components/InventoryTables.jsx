import { useState } from "react"
import { useEffect } from "react"
import axios from "axios"
import Table from "./Table"

function InventoryTables() {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        axios("http://localhost:4000/category/", {method: "GET"})
        .then(res => {
            setCategories(res.data.data)
        }, [])
    })
    return (
        
        <div>
            {
                categories.map((object) => 
                    <div className="card" key={object.id}>
                        <div className="card-header">
                            {object.name}
                        </div>
                        <div className="card-body">
                            <Table
                            key={object.id}
                            create={true}
                            update={true}
                            getUrl={"http://localhost:4000/product/category/" + object.id} 
                            postUrl={"http://localhost:4000/product/"}
                            updateUrl={"http://localhost:4000/product/"}
                            deleteUrl={"http://localhost:4000/product/"}
                            col={{
                                "ID": "id",
                                "Código": "code",
                                "Categoria": "category_id",
                                "Nombre": "name",
                                "Cantidad": "quantity",
                                "Condición": "condition",
                                "Observación": "observation"
                            }}
                            input={{
                                "code": {
                                    "label": "Código",
                                    "type": "text",
                                    "required": false
                                },
                                "name": {
                                    "label": "Nombre",
                                    "type": "text",
                                    "required": true
                                },
                                "quantity": {
                                    "label": "Cantidad",
                                    "type": "number",
                                    "required": true
                                },
                                "observation": {
                                    "label": "Observación",
                                    "type": "text",
                                    "required": false
                                },
                                "category_id": {
                                    "label": "",
                                    "type": "hidden",
                                    "required": true,
                                    "defaultValue": object.id
                                }
                            }}
                            select={{
                                "condition": {
                                    "label": "Condición",
                                    "options": [
                                        {
                                            "label": "Buen Estado",
                                            "value": "BUEN ESTADO"
                                        },
                                        {
                                            "label": "Mal Estado",
                                            "value": "MAL ESTADO"
                                        },
                                        {
                                            "label": "Requiere Reparación",
                                            "value": "REPARACIÓN"
                                        }
                                    ]
                                }
                            }}
                            />         
                        </div>    
                    </div>
            )
            }
        </div>
    )
}

export default InventoryTables