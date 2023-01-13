import axios from "axios"
import { useRef, useState } from "react"

function CreateEmployeeReport(props) {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const [employeeReport, setEmployeeReport] = useState({"employee_id": props.employee_id})
    
    const date = useRef(null)
    const customer = useRef(null)
    const place = useRef(null)
    const description = useRef(null)

    const resetForm = () => {
        date.current.value = ""
        customer.current.value = ""
        place.current.value = ""
        description.current.value = ""
    }

    const handleChange = (e) => {
        setEmployeeReport({
            ...employeeReport,
            [e.target.name]: e.target.value.trim()
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsLoading(true)
        axios.post("http://localhost:4000/employee-report", employeeReport)
        .then(res => {
            setIsLoading(false)
            setError(false)
            props.handleReload()
            console.log(res)
        })
        .catch(error => {
            console.log(error)
            setIsLoading(false)
            setError(true)
            console.error("Error al crear observación de trabajador")
        })
        resetForm()
        setEmployeeReport({"employee_id": props.employee_id})
    }

    const handleClose = () => {
        setIsLoading(false)
        setError(null)
        setEmployeeReport({"employee_id": props.employee_id})
        resetForm()
    }

    return (
    <div className="d-flex ">
        <button data-bs-toggle="modal" data-bs-target="#addmodal" className="btn btn-info m-1" >Crear Observación</button>
            <div className="modal fade" id="addmodal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Crear Observación</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleClose}></button>
                        </div>
                        <div className="modal-body">
                        {error === true && (
                                <div className="alert alert-danger" role="alert"> Error al crear observación! </div>
                        ) 
                        }
                        {      
                        error === false && (
                            <div className="alert alert-primary" role="alert"> Observación Creada</div>
                        )
                        }
                        <form onSubmit={handleSubmit}>
                            <div className="form-group pt-3">
                                <label>Fecha</label>
                                <input type="date" ref={date} onChange={handleChange} name="date" className="form-control" placeholder="Ingresa la fecha" />
                            </div>
                            <div className="form-group pt-3">
                                <label>Cliente</label>
                                <input type="text" ref={customer} onChange={handleChange} name="customer" className="form-control" placeholder="Ingresa el cliente" />
                            </div>
                            <div className="form-group pt-3">
                                <label>Lugar</label>
                                <input type="text" ref={place} onChange={handleChange} name="place" className="form-control" placeholder="Ingresa el lugar"/>
                            </div>
                            <div className="form-group pt-3">
                                <label>Descripción</label>
                                <input type="description" ref={description} onChange={handleChange} defaultValue="" name="description" className="form-control" placeholder="Ingresa la descripción"/>
                            </div>
                        </form>
                        </div>
                        <div className="modal-footer">
                            { isLoading ? ( 
                                <div>
                                    <button type="button" className="btn btn-secondary m-1" disabled>Cancelar</button>
                                    <button type="button" className="btn btn-info">
                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                        Crear
                                    </button>
                                </div>
                                ) : (
                                error === null ? (
                                    <div>
                                        <button type="button" className="btn btn-secondary m-1" data-bs-dismiss="modal" onClick={handleClose}>Cancelar</button>
                                        <button type="button" onClick={handleSubmit} className="btn btn-info">Crear</button>
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

export default CreateEmployeeReport