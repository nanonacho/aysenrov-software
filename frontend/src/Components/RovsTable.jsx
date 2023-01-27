import Table from "./Table"

function RovsTable(props) {
    return (
        <div className="card">
            <div className="card-header">
                Equipos Rov
            </div>
            <div className="card-body">
                <Table
                create={true}
                update={true}
                getUrl={"http://localhost:4000/product/category/1"} 
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
                        "defaultValue": "1"
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

export default RovsTable