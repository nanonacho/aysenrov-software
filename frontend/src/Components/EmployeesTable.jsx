import { useEffect, useState } from "react"
import axios from "axios"
import EmployeesProfile from "./EmployeeProfile"
import CreateEmployee from "./CreateEmployee"
import { Autocomplete, TextField, useThemeProps } from "@mui/material"

function EmployeesTable() {
    const [employees, setEmployees] = useState(null)
    const [profile, setProfile] = useState(null)

    const [reload, setReload] = useState(false)

    const handleReload = () => setReload(reload => !reload)
    
    const handleProfile = (employee) => setProfile(employee)

    useEffect(() => {
        axios("http://localhost:4000/employee", {method: "GET"})
        .then(res => {
            setEmployees(res.data.data)
        })
    }, [reload]) 

    return (
        <div className="container">
        {
        (employees != null) && 
        <div>
            <div className="d-flex align-items-center justify-content-center pb-4"><h1>Trabajadores</h1></div>
            <div className="d-flex align-items-center justify-content-center">
                <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={employees}
                        getOptionLabel={option => option.name + " " + option.lastname + " | " + option.rut}
                        onChange={(e, profile) => setProfile(profile)}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Buscar Trabajador" />}
                        />
            </div>
        </div>
        }
        {
        (employees == null) ? (
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>

            ) : (
                !profile ? (
                    <div>
                        
                        <CreateEmployee handleReload={handleReload}/>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Rut</th>
                                    <th scope="col">Nombres</th>
                                    <th scope="col">Apellidos</th>
                                    <th scope="col">Teléfono</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Cargo</th>
                                    <th scope="col">Fecha Ingreso</th>
                                    <th scope="col">Fecha Nacimiento</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employees.map((employee, index) => 
                                <tr key={employee.id}>
                                    <td>{employee.id}</td>
                                    <td>{employee.rut}</td>
                                    <td>{employee.name}</td> 
                                    <td>{employee.lastname}</td> 
                                    <td>{employee.phone_number}</td> 
                                    <td>{employee.email}</td>
                                    <td>{employee.position}</td>
                                    <td>{new Date(employee.entry_date).toLocaleDateString("es-CL", {timeZone: 'UTC'})}</td>
                                    <td>{new Date(employee.birth_date).toLocaleDateString("es-CL", {timeZone: 'UTC'})}</td>
                                    <td>
                                        <button className="btn btn-primary" onClick={() => handleProfile(employee)}> Perfil </button>
                                    </td>

                                </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )  : (
                    <div>
                            <button className="btn btn-danger" onClick={() => setProfile(null)}>Cerrar</button>
                            <EmployeesProfile handleReload={handleReload} employee={profile}/>
                    </div>
                )
                
                )
            }  
        </div>
    )
}            


export default EmployeesTable