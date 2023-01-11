import { useState, useRef } from "react"
import axios from "axios"

function UpdateUser(props) {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [user, setUser] = useState({})

    const rut = useRef(null)
    const name = useRef(null)
    const lastname = useRef(null)
    const email = useRef(null)
    const role = useRef(null)

    const resetForm = () => {
        rut.current.value = props.user.rut
        name.current.value = props.user.name
        lastname.current.value = props.user.lastname
        email.current.value = props.user.email
        role.current.value = props.user.role
    }

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value.trim()
        })
    }

    const handleSubmit = (e, userId) => {
        e.preventDefault()
        setIsLoading(true)
        axios.put(`http://localhost:4000/user/${userId}`, user)
        .then(res => {
            setIsLoading(false)
            props.handleReload()
            setError(false)
            console.log(res)
        })
        .catch(error => {
            setIsLoading(false)
            setError(true)
            console.error("Error al modificar usuario")
        })
        resetForm()
        setUser({})
    }
    
    const handleClose = () => {
        setIsLoading(false)
        setError(null)
        setUser({})
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
                                <div className="alert alert-danger" role="alert"> Error al actualizar usuario! </div>
                            ) 
                            }
                            {      
                            error === false && (
                                <div className="alert alert-primary" role="alert"> Usuario Actualizado</div>
                            )
                            }
                            <form>
                                <div className="form-group pt-3">
                                    <label>Rut</label>
                                    <input type="text" ref={rut} onChange={handleChange} name="rut" className="form-control" defaultValue={props.user.rut}/>
                                </div>
                                <div className="form-group pt-3">
                                    <label>Nombre</label>
                                    <input type="text" ref={name} onChange={handleChange} name="name" className="form-control" defaultValue={props.user.name} placeholder="Ingresa el nombre" />
                                </div>
                                <div className="form-group pt-3">
                                    <label>Apellido</label>
                                    <input type="text" ref={lastname} onChange={handleChange} name="lastname" className="form-control" defaultValue={props.user.lastname} placeholder="Ingresa el apellido"/>
                                </div>
                                <div className="form-group pt-3">
                                    <label>Email</label>
                                    <input type="email" ref={email} onChange={handleChange} name="email" className="form-control" defaultValue={props.user.email} placeholder="Ingresa el email"/>
                                </div>
                                <div className="form-group pt-3">
                                    <label>Permisos</label>
                                    <select name="role" ref={role} defaultValue={props.user.role} className="form-select" aria-label="Default select example" onChange={handleChange}>
                                        <option value="1111">Administrador</option>
                                        <option value="2222">Recursos Humanos</option>
                                        <option value="3333">Finanzas</option>
                                    </select>
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
                                            <button type="button" className="btn btn-warning" onClick={(e) => handleSubmit(e, props.user._id)}>Modificar</button>
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

export default UpdateUser