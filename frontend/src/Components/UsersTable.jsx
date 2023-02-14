
import Table from "./Table"

function UsersTable() {
    return (
        <Table
        create={true}
        update={true} 
        getUrl={"http://localhost:4000/user"}
        postUrl={"http://localhost:4000/auth/register"}
        updateUrl={"http://localhost:4000/user/"} 
        deleteUrl={"http://localhost:4000/user/"}
        col={{
            "ID": ["_id"], 
            "Rut": ["rut"],
            "Nombres": ["name"],
            "Apellidos": ["lastname"],
            "Email": ["email"],
            "Permisos": ["role"]
        }}
        input={{
            "rut": {
                "label": "Rut",
                "type": "text",
                "required": true
            },
            "name": {
                "label": "Nombres",
                "type": "text",
                "required": true
            },
            "lastname": {
                "label": "Apellidos",
                "type": "text",
                "required": true
            },
            "email": {
                "label": "Email",
                "type": "email",
                "required": true
            },
            "password": {
                "label": "Contraseña",
                "type": "password",
                "required": true
            }
        }}
        select={{
            "role": {
                "label": "Permisos",
                "options": [
                {
                    "label": "Administrador",
                    "value": 1111
                },
                {
                    "label": "Recursos Humanos",
                    "value": 2222
                },
                {
                    "label": "Finanzas",
                    "value": 3333
                }
            ]
        }
        }}
    />
    )
}            


export default UsersTable