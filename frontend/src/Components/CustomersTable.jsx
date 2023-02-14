import CustomerContacts from "./CustomerContacts"
import Table from "./Table"

function CustomersTable() {
    return (
        <Table
        create={true}
        update={true} 
        getUrl={"http://localhost:4000/customer/"} 
        postUrl={"http://localhost:4000/customer/"}
        updateUrl={"http://localhost:4000/customer/"}
        deleteUrl={"http://localhost:4000/customer/"}
        children={CustomerContacts}
        childrenTitle={"Contacto"}
        col={{
            "ID": ["id"],
            "Rut": ["rut"],
            "Nombre": ["name"],
            "Fecha Ingreso": ["entry_date"]
        }}
        input={{
            "rut": {
                "label": "Rut",
                "type": "text",
                "required": true
            },
            "name": {
                "label": "Nombre",
                "type": "text",
                "required": true
            },
            "entry_date": {
                "label": "Fecha Ingreso",
                "type": "date",
                "required": true
            }
        }}
        select={{}}
        />
    )
}

export default CustomersTable