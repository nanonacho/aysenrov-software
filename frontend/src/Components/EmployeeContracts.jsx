import { Autocomplete, TextField } from "@mui/material"
import { useState, useEffect } from "react"
import axios from "axios"
import Table from "./Table"

function EmployeeContracts() {
    const [employees, setEmployees] = useState([])
    const [selectedEmployee, setSelectedEmployee] = useState(null)

    useEffect(() => {
        axios("http://localhost:4000/employee", {method: "GET"})
        .then(res => {
            setEmployees(res.data.data)
        })
    }, []) 

    return (
        <div>
            <div className="d-flex align-items-center justify-content-center pb-4"><h1>Contratos</h1></div>
            <div className="d-flex align-items-center justify-content-center">
            <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={employees}
            getOptionLabel={option => option.name + " " + option.lastname + " | " + option.rut}
            onChange={(e, selectedEmployee) => setSelectedEmployee(selectedEmployee)}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Buscar Trabajador" />}
            />
            </div>
            {
                selectedEmployee && 
                <Table
                create={true}
                update={true}
                key={selectedEmployee.id} 
                pdfUrl={"http://localhost:4000/contract/pdf/"}
                getUrl={"http://localhost:4000/contract/" + selectedEmployee.id} 
                postUrl={"http://localhost:4000/contract/"}
                updateUrl={"http://localhost:4000/contract/"}
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
                        "defaultValue": selectedEmployee.id
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
            }
        </div>
    )
}

export default EmployeeContracts