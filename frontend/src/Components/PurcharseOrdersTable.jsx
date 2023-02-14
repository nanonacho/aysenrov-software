import { useState } from "react"
import { useEffect } from "react"
import axios from "axios"
import Table from "./Table"
import ProductProfile from "./ProductProfile"
import { Autocomplete, TextField } from "@mui/material"
import PurcharseOrderDetail from "./PurcharseOrderDetail"

function PurcharseOrdersTable() {
    const [types, setTypes] = useState([])
    const [orders, setOrders] = useState([])
    const [suppliers, setSuppliers] = useState([])
    const [selectedType, setSelectedType] = useState(null)
    const [selectedOrder, setSelectedOrder] = useState(null)

    useEffect(() => {
        axios("http://localhost:4000/purcharse-type/", {method: "GET"})
        .then(res => {
            setTypes(res.data.data)
        })

        axios("http://localhost:4000/purcharse-order/", {method: "GET"})
        .then(res => {
            setOrders(res.data.data)
        })

        axios("http://localhost:4000/supplier/", {method: "GET"})
        .then(res => {
            setSuppliers(res.data.data)
        })

    }, [])

    return (

        <div className="row justify-content-center">
            <div className="d-flex align-items-center justify-content-center">
            <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={types}
            getOptionLabel={option => option.name}
            onChange={(e, selectedType) => setSelectedType(selectedType)}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Filtrar por Tipo" />}
            />
            <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={orders}
            getOptionLabel={option => new Date(option.date).toLocaleDateString("es-CL", {timeZone: 'UTC'}) + " | " + option.id + " | " + option.supplier.name + " | " + option.purcharse_type.name}
            onChange={(e, selectedOrder) => setSelectedOrder(selectedOrder)}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Buscar Orden de Compra" />}
            />
            </div>
            {selectedOrder ? 
                <div>
                    <button className="btn btn-danger" onClick={() => setSelectedOrder(null)}>Cerrar</button>
                    
                </div>
            :
                selectedType ?
                        <div className="" key={selectedType.id}>
                                <Table
                                key={selectedType.id}
                                create={true}
                                update={true}
                                getUrl={"http://localhost:4000/purcharse-order/type/" + selectedType.id} 
                                postUrl={"http://localhost:4000/purcharse-order/"}
                                updateUrl={"http://localhost:4000/purcharse-order/"}
                                deleteUrl={"http://localhost:4000/purcharse-order/"}
                                children={PurcharseOrderDetail}
                                childrenTitle={"Detalle"}
                                col={{
                                    "ID": ["id"],
                                    "Tipo": ["purcharse_type", "name"],
                                    "Fecha": ["date"],
                                    "Proveedor": ["supplier", "name"],
                                    "Monto": ["amount"],
                                    "Descripción": ["description"]
                                }}
                                input={{
                                    "amount": {
                                        "label": "Monto",
                                        "type": "text",
                                        "required": true
                                    },
                                    "date": {
                                        "label": "Fecha",
                                        "type": "date",
                                        "required": true
                                    },
                                    "description": {
                                        "label": "Descripción (opcional)",
                                        "type": "text",
                                        "required": false
                                    }
                                }}
                                select={{
                                    "type_id": {
                                        "label": "Tipo",
                                        "required": true,
                                        "options": types.map(type => {
                                            const tp = {}
                                            tp["label"] = type.name
                                            tp["value"] = type.id
                                            return tp 
                                        })
                                    },
                                    "supplier_id": {
                                        "label": "Proveedor",
                                        "required": true,
                                        "options": suppliers.map(supplier => {
                                            const sup = {}
                                            sup["label"] = supplier.name
                                            sup["value"] = supplier.id
                                            return sup 
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
                                getUrl={"http://localhost:4000/purcharse-order/"} 
                                postUrl={"http://localhost:4000/purcharse-order/"}
                                updateUrl={"http://localhost:4000/purcharse-order/"}
                                deleteUrl={"http://localhost:4000/purcharse-order/"}
                                children={PurcharseOrderDetail}
                                childrenTitle={"Detalle"}
                                col={{
                                    "ID": ["id"],
                                    "Tipo": ["purcharse_type", "name"],
                                    "Fecha": ["date"],
                                    "Proveedor": ["supplier", "name"],
                                    "Monto": ["amount"],
                                    "Descripción": ["description"]
                                }}
                                input={{
                                    "amount": {
                                        "label": "Monto",
                                        "type": "text",
                                        "required": true
                                    },
                                    "date": {
                                        "label": "Fecha",
                                        "type": "date",
                                        "required": true
                                    },
                                    "description": {
                                        "label": "Descripción (opcional)",
                                        "type": "text",
                                        "required": false
                                    }
                                }}
                                select={{
                                    "type_id": {
                                        "label": "Tipo",
                                        "required": true,
                                        "options": types.map(type => {
                                            const tp = {}
                                            tp["label"] = type.name
                                            tp["value"] = type.id
                                            return tp 
                                        })
                                    },
                                    "supplier_id": {
                                        "label": "Proveedor",
                                        "required": true,
                                        "options": suppliers.map(supplier => {
                                            const sup = {}
                                            sup["label"] = supplier.name
                                            sup["value"] = supplier.id
                                            return sup 
                                        })
                                    }
                                }}
                                />      
                              
                        </div>
                }
        </div>                                                                                                          
    )
}

export default PurcharseOrdersTable