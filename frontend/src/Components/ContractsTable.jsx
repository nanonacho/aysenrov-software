import { useEffect, useState } from "react"
import axios from "axios"

function ContractsTable(props) {
    const [contracts, setContracts] = useState(null)
    
    const [reload, setReload] = useState(false)

    const handleReload = () => setReload(reload => !reload)
    
    useEffect(() => {
        axios(`http://localhost:4000/contract/${props.employee.id}`, {method: "GET"})
        .then(res => {
            setContracts(res.data.data)
        })
    }, [reload]) 

    return (
        <div>
        { 
        (contracts == null) ? (
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>

            ) : ( 
                <table className="table caption-top">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Rut</th>
                            <th scope="col">Trabajador</th>
                            <th scope="col">Cargo</th>
                            <th scope="col">Sueldo Base</th>
                            <th scope="col">Tipo</th>
                            <th scope="col">Fecha Inicio</th>
                            <th scope="col">Fecha Fin</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contracts.map((contract, index) => 
                        <tr key={contract.id}>
                            <td>{props.employee.rut}</td>
                            <td>{props.employee.name + props.employee.lastname}</td>
                            <td>{contract.position}</td>
                            <td>{contract.base_salary}</td> 
                            <td>{contract.type}</td>
                            <td>{contract.start_date}</td>
                            <td>{contract.end_date}</td> 
                        </tr>
                        )}
                        
                    </tbody>
                </table>
            )
            }  
        </div>
    )
}            


export default ContractsTable