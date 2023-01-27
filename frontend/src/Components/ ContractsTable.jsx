import Table from "./Table"

function ContractsTable(props) {
    return (
        <Table
        create={true}
        update={true}
        key={props.selectedEmployee.id} 
        pdfUrl={"http://localhost:4000/contract/pdf/"}
        getUrl={"http://localhost:4000/contract/" + props.selectedEmployee.id} 
        postUrl={"http://localhost:4000/contract/"}
        updateUrl={"http://localhost:4000/contract/"}
        deleteUrl={"http://localhost:4000/contract/"}
        col={{
            "ID": "id",
            "Cargo": "position",
            "Salario Base": "base_salary",
            "Tipo": "type",
            "Fecha Inicio": "start_date",
            "Fecha Termino": "end_date"
        }}
        input={{
            "base_salary": {
                "label": "Salario Base",
                "type": "text",
                "required": true
            },
            "start_date": {
                "label": "Fecha Inicio",
                "type": "date",
                "required": true
            },
            "end_date": {
                "label": "Fecha Termino",
                "type": "date",
                "required": false
            },
            "employee_id": {
                "label": "",
                "type": "hidden",
                "required": true,
                "defaultValue": props.selectedEmployee.id
            }
        }}
        select={{
            "position": {
                "label": "Cargo",
                "options": [
                    {
                        "label": "Piloto Rov",
                        "value": "PILOTO ROV"
                    },
                    {
                        "label": "Gerente",
                        "value": "GERENTE"
                    },
                    {
                        "label": "Practicante",
                        "value": "PRACTICANTE"
                    },
                    {
                        "label": "Jefe Taller",
                        "value": "JEFE TALLER"
                    },
                    {
                        "label": "Jefe Operaciones",
                        "value": "JEFE OPERACIONES"
                    },
                    {
                        "label": "Prevencionista",
                        "value": "PREVENCIONISTA"
                    }
                ]
            },
            "type": {
                "label": "Tipo",
                "options": [
                    {
                        "label": "Plazo Fijo",
                        "value": "PLAZO FIJO"
                    },
                    {
                        "label": "Indefinido",
                        "value": "INDEFINIDO"
                    }
                ]
            }
        }}
        />
    )
}

export default ContractsTable