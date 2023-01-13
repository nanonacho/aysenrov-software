import { useState, useRef } from "react"
import axios from "axios"

function UpdateEmployeeReport(props) {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [employeeReport, setEmployeeReport] = useState({})

    const date = useRef(null)
    const customer = useRef(null)
    const place = useRef(null)
    const description = useRef(null)

    const resetForm = () => {
        date.current.value = props.employeeReport.date
        customer.current.value = props.employeeReport.customer
        place.current.value = props.employeeReport.place
        description.current.value = props.employeeReport.description
    }

    const handleChange = (e) => {
        setEmployeeReport({
            ...employeeReport,
            [e.target.name]: e.target.value.trim()
        })
    }

    const handleSubmit = (e, employeeReportId) => {
        e.preventDefault()
        setIsLoading(true)
        axios.put(`http://localhost:4000/employee-report/${employeeReportId}`, employeeReport)
        .then(res => {
            setIsLoading(false)
            props.handleReload()
            setError(false)
            console.log(res)
        })
        .catch(error => {
            setIsLoading(false)
            setError(true)
            console.error("Error al modificar observación")
        })
        resetForm()
        setEmployeeReport({})
    }
    
    const handleClose = () => {
        setIsLoading(false)
        setError(null)
        setEmployeeReport({})
        resetForm()
    }

    return (
        <div>
            <button data-bs-toggle="modal" data-bs-target={"#modifymodal" + props.index} className="btn btn-warning">Modificar</button>
                <div className="modal fade" id={"modifymodal" + props.index} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="staticBackdropLabel">Modificar Datos</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleClose}></button>
                            </div>
                            <div className="modal-body">
                            {error === true && (
                                <div className="alert alert-danger" role="alert"> Error al actualizar observación! </div>
                            ) 
                            }
                            {      
                            error === false && (
                                <div className="alert alert-primary" role="alert"> Observación Actualizada</div>
                            )
                            }
                            <form>
                                <div className="form-group pt-3">
                                    <label>Fecha</label>
                                    <input type="date" ref={date} onChange={handleChange} name="date" className="form-control" defaultValue={props.employeeReport.date}/>
                                </div>
                                <div className="form-group pt-3">
                                    <label>Cliente</label>
                                    <input type="text" ref={customer} onChange={handleChange} name="customer" className="form-control" defaultValue={props.employeeReport.customer} placeholder="Ingresa el cliente" />
                                </div>
                                <div className="form-group pt-3">
                                    <label>Lugar</label>
                                    <input type="text" ref={place} onChange={handleChange} name="place" className="form-control" defaultValue={props.employeeReport.place} placeholder="Ingresa el lugar"/>
                                </div>
                                <div className="form-group pt-3">
                                    <label>Descripción</label>
                                    <input type="description" ref={description} onChange={handleChange} name="description" className="form-control" defaultValue={props.employeeReport.description} placeholder="Ingresa la descripción"/>
                                </div>
                            </form>
                            </div>
                            <div className="modal-footer">
                                { isLoading ? ( 
                                    <div>
                                        <button type="button" className="btn btn-secondary" disabled>Cancelar</button>
                                        <button type="button" className="btn btn-warning">
                                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                            Modificar
                                        </button>
                                    </div>
                                    ) : (
                                    error === null ? (
                                        <div>
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleClose}>Cancelar</button>
                                            <button type="button" className="btn btn-warning" onClick={(e) => handleSubmit(e, props.employeeReport.id)}>Modificar</button>
                                        </div>
                                        ) : (
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleClose}>Cerrar</button>
                                            )
                                            ) 
                                }
                                
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default UpdateEmployeeReport