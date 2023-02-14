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
            "ID": ["id"],
            "Cargo": ["position"],
            "Salario Base": ["base_salary"],
            "Tipo": ["type"],
            "Fecha Inicio": ["start_date"],
            "Fecha Termino": ["end_date"],
            "Fecha de Firma": ["signature_date"],
            "AFP": ["afp"],
            "Salud": ["salud"]
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
                "label": "Fecha Termino (opcional)",
                "type": "date",
                "required": false
            },
            "signature_date": {
                "label": "Fecha de Firma",
                "type": "date",
                "required": true
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
            },
            "afp": {
                "label": "AFP",
                "options": [
                    {
                        "label": "HABITAT",
                        "value": "HABITAT"
                    },
                    {
                        "label": "PROVIDA",
                        "value": "PROVIDA"
                    },
                    {
                        "label": "MODELO",
                        "value": "MODELO"
                    },
                    {
                        "label": "PLAN VITAL",
                        "value": "PLAN VITAL"
                    },
                    {
                        "label": "CAPITAL",
                        "value": "CAPITAL"
                    }
                ]
            },
            "salud": {
                "label": "Salud",
                "options": [
                    {
                        "label": "FONASA",
                        "value": "FONASA"
                    },
                    {
                        "label": "ISAPRE",
                        "value": "ISAPRE"
                    }
                ]
            },
        }}
        />
    )
}

export default ContractsTable