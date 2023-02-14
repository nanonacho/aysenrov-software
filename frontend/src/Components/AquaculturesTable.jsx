import { useEffect, useState } from "react"
import axios from "axios"
import Table from "./Table"

function AquaculturesTable() {
    const [customers, setCustomers] = useState([])

    useEffect(() => {
        axios("http://localhost:4000/customer/", {method: "GET"})
        .then(res => {
            setCustomers(res.data.data)
        })
    }, [])

    return (
        <div>
            <Table
            create={true}
            update={true}
            getUrl={"http://localhost:4000/aquaculture/"} 
            postUrl={"http://localhost:4000/aquaculture/"}
            updateUrl={"http://localhost:4000/aquaculture/"}
            deleteUrl={"http://localhost:4000/aquaculture/"}
            col={{
                "ID": ["id"],
                "Nombre": ["name"],
                "Ubicación": ["location"],
                "Empresa": ["customer", "name"]
            }}
            input={{
                "name": {
                    "label": "Nombre",
                    "type": "text",
                    "required": true
                },
                "location": {
                    "label": "Ubicación (opcional)",
                    "type": "text",
                    "required": false
                }
            }}
            select={{
                "customer_id": {
                    "label": "Empresa",
                    "required": true,
                    "options": customers.map(customer => {
                        const cust = {}
                        cust["label"] = customer.name
                        cust["value"] = customer.id
                        return cust
                    })
                }
            }}
            />   
        </div>
    )
}

export default AquaculturesTable