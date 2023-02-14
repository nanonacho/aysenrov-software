import { useEffect, useState } from "react"
import axios from "axios"
import Table from "./Table"

function PurcharseOrderDetail(props) {
    const [products, setProducts] = useState([])

    useEffect(() => {
        axios("http://localhost:4000/product/", {method: "GET"})
        .then(res => {
            setProducts(res.data.data)
        })
    }, [])

    return (
        <div className="text-center">
            <div className="d-flex align-items-center justify-content-center pb-4"><h3>Detalle</h3></div>
            <div className="d-flex justify-content-center">
                <div class="card m-1 col-2 text-bg-primary">
                    <div class="card-header">
                        Fecha
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item"><h3>{new Date(props.object?.date).toLocaleDateString("es-CL", {timeZone: 'UTC'})}</h3></li>
                    </ul>
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <div class="card m-1 col-2 text-bg-info" >
                    <div class="card-header">
                        Tipo
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">{props.object?.purcharse_type.name}</li>
                    </ul>
                </div>
                <div class="card m-1 col-2 text-bg-success" >
                    <div class="card-header">
                        Monto
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">{props.object?.amount}</li>
                    </ul>
                </div>
                <div class="card m-1 col-2 text-bg-danger" >
                    <div class="card-header">
                        Proveedor
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">{props.object?.supplier.name}</li>
                    </ul>
                </div>
            </div>
            <Table
            create={true}
            update={true}
            getUrl={"http://localhost:4000/purcharse-line/order/" + props.object.id} 
            postUrl={"http://localhost:4000/purcharse-line/"}
            updateUrl={"http://localhost:4000/purcharse-line/"}
            deleteUrl={"http://localhost:4000/purcharse-line/"}
            
            col={{
                "ID": ["id"],
                "Producto": ["product", "name"],
                "Descripción": ["description"],
                "Precio Unitario": ["unit_price"],
                "Cantidad": ["quantity"]
            }}
            input={{
                "description": {
                    "label": "Descripción (opcional)",
                    "type": "text",
                    "required": false
                },
                "quantity": {
                    "label": "Cantidad",
                    "type": "number",
                    "required": true
                },
                "unit_price": {
                    "label": "Precio Unitario",
                    "type": "text",
                    "required": true
                },
                "order_id": {
                    "label": "",
                    "type": "hidden",
                    "required": true,
                    "defaultValue": props.object.id
                }
            }}
            select={{
                "product_id": {
                    "label": "Producto (opcional)",
                    "required": false,
                    "options": products.map(product => {
                        const prod = {}
                        prod["label"] = product.name
                        prod["value"] = product.id
                        return prod 
                    })
                }
            }}
            />
            </div>   
    )
}

export default PurcharseOrderDetail