import Table from "./Table"
import { useState, useEffect } from "react"
import axios from "axios"

function ProductProfile(props) {
    const [aquacultures, setAquacultures] = useState(null)
    const [product, setProduct] = useState(null)
    const [reload, setReload] = useState(true)

    const handleReload = () => setReload(reload => !reload)

    useEffect(() => {
        axios("http://localhost:4000/aquaculture/", {method: "GET"})
        .then(res => {
            setAquacultures(res.data.data)
        })
        axios("http://localhost:4000/product/" + props.object.id, {method: "GET"})
        .then(res => {
            setProduct(res.data.data)
        })

    }, [reload])

    return (
        <div className="text-center">
            <div className="d-flex justify-content-center">
                <div class="card m-1 col-2 text-bg-primary">
                    <div class="card-header">
                        Producto
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item"><h3>{product?.name}</h3></li>
                    </ul>
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <div class="card m-1 col-2 text-bg-info" >
                    <div class="card-header">
                        Stock Total
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">{product?.total_stock}</li>
                    </ul>
                </div>
                <div class="card m-1 col-2 text-bg-success" >
                    <div class="card-header">
                        Stock Disponible
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">{product?.total_stock - product?.not_avail_stock}</li>
                    </ul>
                </div>
                <div class="card m-1 col-2 text-bg-danger" >
                    <div class="card-header">
                        Stock Ocupado
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">{product?.not_avail_stock}</li>
                    </ul>
                </div>
            </div>
            <Table
            key={props.object.id}
            handleReload={handleReload}
            create={true}
            update={true}
            getUrl={"http://localhost:4000/item/product/" + props.object.id} 
            postUrl={"http://localhost:4000/item/"}
            updateUrl={"http://localhost:4000/item/"}
            deleteUrl={"http://localhost:4000/item/"}
            col={{
                "ID": ["id"],
                "Código": ["code"],
                "Descripción": ["description"],
                "Condición": ["condition"],
                "Centro | Lugar": ["aquaculture", "name"]
            }}
            input={{
                "code": {
                    "label": "Código (opcional)",
                    "type": "text",
                    "required": false
                },
                "description": {
                    "label": "Descripción (opcional)",
                    "type": "text",
                    "required": false
                },
                "product_id": {
                    "label": "",
                    "type": "hidden",
                    "required": true,
                    "defaultValue": props.object.id
                }
            }}
            select={{
                "condition": {
                    "label": "Condición",
                    "required": true,
                    "options": [
                        {
                            "label": "BUEN ESTADO",
                            "value": "BUEN ESTADO"
                        },
                        {
                            "label": "MAL ESTADO",
                            "value": "MAL ESTADO"
                        },
                        {
                            "label": "REQUIERE REPARACIÓN",
                            "value": "REQUIERE REPARACIÓN"
                        }
                    ]
                },
                "aquaculture_id": {
                    "label": "Centro | Lugar (opcional)",
                    "required": false,
                    "options": !aquacultures ? [] : aquacultures.map(aquaculture => {
                        const aq = {}
                        aq["label"] = aquaculture.name
                        aq["value"] = aquaculture.id
                        return aq 
                    })
                }
            }}
            />
        </div>
    )
}

export default ProductProfile