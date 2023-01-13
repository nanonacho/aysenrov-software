import { Autocomplete, TextField } from "@mui/material"
import { useState, useEffect } from "react"
import axios from "axios"
import ContractsTable from "./ContractsTable"
import { useSlotProps } from "@mui/base"

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
            <h1>Contratos</h1>
            <div className="container m-4">
            <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={employees}
            getOptionLabel={option => option.name + " " + option.lastname + " | " + option.rut}
            onChange={(e, selectedEmployee) => setSelectedEmployee(selectedEmployee)}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Trabajador" />}
            />
            </div>
            {
                selectedEmployee && <ContractsTable employee={selectedEmployee}/>
            }
        </div>
    )
}

export default EmployeeContracts