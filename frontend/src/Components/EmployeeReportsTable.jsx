import { useEffect, useState } from "react"
import axios from "axios"
import UpdateEmployee from "./UpdateEmployee"

function EmployeeReportsTable(props) {
    const [employeeReports, setEmployeeReports] = useState(null)
    
    const [reload, setReload] = useState(false)

    const handleReload = () => setReload(reload => !reload)
    
    useEffect(() => {
        axios(`http://localhost:4000/employee-report/${props.employee.id}`, {method: "GET"})
        .then(res => {
            setEmployeeReports(res.data.data)
        })
    }, [reload]) 

    return (
        <div>
        { 
        (employeeReports == null) ? (
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>

            ) : ( 
            <div className="card">
                <div className="card-header">
                    Observaciones
                </div>
                <table className="table caption-top">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Fecha</th>
                            <th scope="col">Cliente</th>
                            <th scope="col">Lugar</th>
                            <th scope="col">Descripción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employeeReports.map((employeeReport, index) => 
                        <tr key={employeeReport.id}>
                            <td>{employeeReport.id}</td>
                            <td>{employeeReport.date}</td>
                            <td>{employeeReport.customer}</td>
                            <td>{employeeReport.place}</td> 
                            <td>{employeeReport.description}</td> 
                        </tr>
                        )}
                    </tbody>
                </table>
            </div>
            )
            }  
        </div>
    )
}            


export default EmployeeReportsTable