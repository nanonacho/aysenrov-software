import Table from "./Table"
import positions from "../Data/positions.json"
import afp from "../Data/afp.json"
import prevision from "../Data/prevision.json"
import banks from "../Data/banks.json"
import account_types from "../Data/account_types.json"
import EmployeesProfile from "./EmployeeProfile"

function EmployeesTable2() {
    return (
        <Table
        create={true}
        update={true} 
        getUrl={"http://localhost:4000/employee/"}
        postUrl={"http://localhost:4000/employee/"}
        updateUrl={"http://localhost:4000/employee/"} 
        deleteUrl={"http://localhost:4000/employee/"}
        children={EmployeesProfile}
        childrenTitle={"Perfil"}
        col={{
            "ID": ["id"], 
            "Rut": ["rut"],
            "Nombres": ["name"],
            "Apellidos": ["lastname"],
            "Teléfono": ["phone_number"],
            "Email": ["email"],
            "Cargo": ["position"],
            "Fecha Ingreso": ["entry_date"],
            "Fecha Nacimiento": ["birth_date"]
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
            "phone_number": {
                "label": "Teléfono",
                "type": "text",
                "required": true
            },
            "email": {
                "label": "Email",
                "type": "email",
                "required": true
            },
            "city": {
                "label": "Ciudad",
                "type": "text",
                "required": true
            },
            "address": {
                "label": "Dirección",
                "type": "text",
                "required": true
            },
            "entry_date": {
                "label": "Fecha Ingreso",
                "type": "date",
                "required": true
            },
            "birth_date": {
                "label": "Fecha Nacimiento",
                "type": "date",
                "required": true
            },
            "account": {
                "label": "Número de Cuenta Banco (opcional)",
                "type": "text",
                "required": false
            }
        }}
        select={{
            "bank": {
                "label": "Banco (opcional)",
                "options": banks
            },
            "account_type": {
                "label": "Tipo de Cuenta (opcional)",
                "options": account_types
            },
            "position": {
                "label": "Cargo",
                "options": positions
            },
            "afp": {
                "label": "AFP (opcional)",
                "options": afp
            },
            "salud": {
                "label": "Previsión Salud (opcional)",
                "options": prevision
            }
        }}
    />
    )
}

export default EmployeesTable2