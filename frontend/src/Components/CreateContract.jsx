import axios from "axios"
import { useRef, useState } from "react"

function CreateContract(props) {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const [contract, setContract] = useState({"employee_id": props.employee_id})
    
    const position = useRef(null)
    const base_salary = useRef(null)
    const type = useRef(null)
    const start_date = useRef(null)
    const end_date = useRef(null)

    const resetForm = () => {
        position.current.value = ""
        base_salary.current.value = ""
        type.current.value = ""
        start_date.current.value = ""
        end_date.current.value = ""
    }

    const handleChange = (e) => {
        setContract({
            ...contract,
            [e.target.name]: e.target.value.trim()
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsLoading(true)
        axios.post("http://localhost:4000/contract", contract)
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
        setContract({"employee_id": props.employee_id})
    }

    const handleClose = () => {
        setIsLoading(false)
        setError(null)
        setContract({"employee_id": props.employee_id})
        resetForm()
    }

    return (
    <div className="d-flex ">
        <button data-bs-toggle="modal" data-bs-target="#addmodal" className="btn btn-info m-1" >Crear Contrato</button>
            <div className="modal fade" id="addmodal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Crear Contrato</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleClose}></button>
                        </div>
                        <div className="modal-body">
                        {error === true && (
                                <div className="alert alert-danger" role="alert"> Error al crear contrato! </div>
                        ) 
                        }
                        {      
                        error === false && (
                            <div className="alert alert-primary" role="alert"> Contrato Creado</div>
                        )
                        }
                        <form onSubmit={handleSubmit}>
                        <div className="form-group pt-3">
                                <label>Cargo</label>
                                <select name="position" ref={position} className="form-select" aria-label="Default select example" onChange={handleChange}>
                                    <option value=""></option>
                                    <option value="Piloto Rov">Piloto Rov</option>
                                    <option value="Gerente">Gerente</option>
                                    <option value="Jefe de Taller">Jefe de Taller</option>
                                    <option value="Jefe de Taller">Jefe de Operaciones</option>
                                </select>
                            </div>
                            <div className="form-group pt-3">
                                <label>Salario Base</label>
                                <input type="text" ref={base_salary} onChange={handleChange} name="base_salary" className="form-control" placeholder="Ingresa el salario base" />
                            </div>
                            <div className="form-group pt-3">
                                <label>Cargo</label>
                                <select name="position" ref={position} className="form-select" aria-label="Default select example" onChange={handleChange}>
                                    <option value=""></option>
                                    <option value="Piloto Rov">Piloto Rov</option>
                                    <option value="Gerente">Gerente</option>
                                    <option value="Jefe de Taller">Jefe de Taller</option>
                                    <option value="Jefe de Taller">Jefe de Operaciones</option>
                                </select>
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

export default CreateContract