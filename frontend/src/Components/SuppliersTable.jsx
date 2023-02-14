import Table from "./Table"

function SuppliersTable() {
    return (
        <Table
        create={true}
        update={true} 
        getUrl={"http://localhost:4000/supplier/"} 
        postUrl={"http://localhost:4000/supplier/"}
        updateUrl={"http://localhost:4000/supplier/"}
        deleteUrl={"http://localhost:4000/supplier/"}
        col={{
            "ID": ["id"],
            "Rut": ["rut"],
            "Nombre": ["name"],
            "Dirección": ["address"],
            "Email": ["email"],
            "Teléfono": ["phone_number"],
            "Fecha Ingreso": ["entry_date"]
        }}
        input={{
            "rut": {
                "label": "Rut (opcional)",
                "type": "text",
                "required": false
            },
            "name": {
                "label": "Nombre",
                "type": "text",
                "required": true
            },
            "address": {
                "label": "Dirección (opcional)",
                "type": "text",
                "required": false
            },
            "email": {
                "label": "Email (opcional)",
                "type": "text",
                "required": false
            },
            "phone_number": {
                "label": "Teléfono (opcional)",
                "type": "text",
                "required": false
            },
            "entry_date": {
                "label": "Fecha Ingreso (opcional)",
                "type": "date",
                "required": false
            }
        }}
        select={{}}
        />
    )
}

export default SuppliersTable