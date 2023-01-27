import { Autocomplete, TextField } from "@mui/material"
import { useState, useEffect } from "react"
import axios from "axios"
import ContractsTable from "./ ContractsTable"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import ProtectedRoutes from "./ProtectedRoutes"
import ContractTemplate from "./ContractTemplate"

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
                <ContractsTable selectedEmployee={selectedEmployee}/>
            }
        </div>
    )
}

export default EmployeeContracts