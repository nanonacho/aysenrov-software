import Table from "./Table"

function CustomerContacts(props) {
    return(
        <div>
            <div className="text-center">
                <div className="d-flex justify-content-center">
                    <div class="card m-1 col-3 text-bg-primary">
                        <div class="card-header">
                            Cliente
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item"><h3>{props.object?.name}</h3></li>
                        </ul>
                    </div>
                </div>
            </div>
            <Table
            key={props.object.id}
            create={true}
            update={true}
            getUrl={"http://localhost:4000/customer-employee/" + props.object.id} 
            postUrl={"http://localhost:4000/customer-employee/"}
            updateUrl={"http://localhost:4000/customer-employee/"}
            deleteUrl={"http://localhost:4000/customer-employee/"}
            col={{
                "ID": ["id"],
                "Nombre": ["name"],
                "Apellido": ["lastname"],
                "Rut": ["rut"],
                "Teléfono": ["phone_number"],
                "Email" : ["email"],
                "Cargo": ["position"]
            }}
            input={{
                "name": {
                    "label": "Nombre",
                    "type": "text",
                    "required": true
                },
                "lastname": {
                    "label": "Apellido",
                    "type": "text",
                    "required": true
                },
                "rut": {
                    "label": "Rut (opcional)",
                    "type": "text",
                    "required": false
                },
                "phone_number": {
                    "label": "Teléfono (opcional)",
                    "type": "text",
                    "required": false
                },
                "email": {
                    "label": "Email (opcional)",
                    "type": "text",
                    "required": false
                },
                "position": {
                    "label": "Cargo (opcional)",
                    "type": "text",
                    "required": false
                },
                "customer_id": {
                    "label": "",
                    "type": "hidden",
                    "required": true,
                    "defaultValue": props.object.id
                }
            }}
            select={{}}
            />
        </div>
    )
}

export default CustomerContacts