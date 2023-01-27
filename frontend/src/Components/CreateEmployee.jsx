import axios from "axios"
import { useRef, useState } from "react"

function CreateEmployee(props) {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const [employee, setEmployee] = useState({})
    
    const rut = useRef(null)
    const name = useRef(null)
    const lastname = useRef(null)
    const email = useRef(null)
    const position = useRef(null)
    const entry_date = useRef(null)
    const birth_date = useRef(null)
    const address = useRef(null)
    const phone_number = useRef(null)
    const afp = useRef(null)
    const city = useRef(null)
    const salud = useRef(null)
    const bank = useRef(null)
    const account_type = useRef(null)
    const account = useRef(null)

    const resetForm = () => {
        rut.current.value = ""
        name.current.value = ""
        lastname.current.value = ""
        email.current.value = ""
        position.current.value = ""
        entry_date.current.value = ""
        birth_date.current.value = ""
        address.current.value = ""
        phone_number.current.value = ""
        afp.current.value = ""
        salud.current.value = ""
        city.current.value = ""
        bank.current.value = ""
        account_type.current.value = ""
        account.current.value = ""
    }

    const handleChange = (e) => {
        setEmployee({
            ...employee,
            [e.target.name]: e.target.value.trim()
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsLoading(true)
        axios.post("http://localhost:4000/employee", employee)
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
            console.error("Error al crear trabajador")
        })
        resetForm()
        setEmployee({})
    }

    const handleClose = () => {
        setIsLoading(false)
        setError(null)
        setEmployee({})
        resetForm()
    }

    return (
    <div className="d-flex mt-4">
        <button data-bs-toggle="modal" data-bs-target="#addmodal" className="btn btn-info" >Crear Trabajador</button>
            <div className="modal fade" id="addmodal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Crear Trabajador</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleClose}></button>
                        </div>
                        <div className="modal-body">
                        {error === true && (
                                <div className="alert alert-danger" role="alert"> Error al crear trabajador! </div>
                        ) 
                        }
                        {      
                        error === false && (
                            <div className="alert alert-primary" role="alert"> Trabajador Creado</div>
                        )
                        }
                        <form>
                            <div className="form-group pt-3">
                                <label>Rut</label>
                                <input required type="text" ref={rut} onChange={handleChange} name="rut" className="form-control" placeholder="Ingresa el rut (con guión y sin puntos)" />
                            </div>
                            <div className="form-group pt-3">
                                <label>Nombres</label>
                                <input type="text" ref={name} onChange={handleChange} name="name" defaultValue="" className="form-control" placeholder="Ingresa el nombre" />
                            </div>
                            <div className="form-group pt-3">
                                <label>Apellidos</label>
                                <input type="text" ref={lastname} onChange={handleChange} defaultValue="" name="lastname" className="form-control" placeholder="Ingresa el apellido"/>
                            </div>
                            <div className="form-group pt-3">
                                <label>Email</label>
                                <input type="email" ref={email} onChange={handleChange} defaultValue="" name="email" className="form-control" placeholder="Ingresa el email"/>
                            </div>
                            <div className="form-group pt-3">
                                <label>Teléfono</label>
                                <input type="tel" ref={phone_number} onChange={handleChange} name="phone_number" className="form-control" placeholder="Ingresa el teléfono"/>
                            </div>
                            <div className="form-group pt-3">
                                <label>Ciudad</label>
                                <input type="text" ref={city} onChange={handleChange} name="city" className="form-control" placeholder="Ingresa la ciudad"/>
                            </div>
                            <div className="form-group pt-3">
                                <label>Dirección</label>
                                <input type="text" ref={address} onChange={handleChange} name="address" className="form-control" placeholder="Ingresa la dirección"/>
                            </div>
                            <div className="form-group pt-3">
                                <label>Cargo</label>
                                <select name="position" ref={position} className="form-select" aria-label="Default select example" onChange={handleChange}>
                                    <option value=""></option>
                                    <option value="PILOTO ROV">Piloto Rov</option>
                                    <option value="GERENTE">Gerente</option>
                                    <option value="JEFE TALLER">Jefe Taller</option>
                                    <option value="JEFE OPERACIONES">Jefe Operaciones</option>
                                    <option value="PRACTICANTE">Practicante</option>
                                    <option value="PREVENCIONISTA">Prevencionista</option>
                                </select>
                            </div>
                            <div className="form-group pt-3">
                                <label>Fecha Ingreso</label>
                                <input type="date" ref={entry_date} onChange={handleChange} name="entry_date" className="form-control" placeholder="Ingresa la fecha de ingreso a la empresa"/>
                            </div>
                            <div className="form-group pt-3">
                                <label>Fecha Nacimiento</label>
                                <input type="date" ref={birth_date} onChange={handleChange} name="birth_date" className="form-control" placeholder="Ingresa la fecha de nacimiento"/>
                            </div>
                            <div className="form-group pt-3">
                                <label>AFP</label>
                                <select name="afp" ref={afp} className="form-select" aria-label="Default select example" onChange={handleChange}>
                                    <option value=""></option>
                                    <option value="HABITAT">HABITAT</option>
                                    <option value="PROVIDA">PROVIDA</option>
                                    <option value="MODELO">MODELO</option>
                                    <option value="PLAN VITAL">PLAN VITAL</option>
                                    <option value="CAPITAL">CAPITAL</option>
                                    <option value="MODELO">UNO</option>
                                </select>
                            </div>
                            <div className="form-group pt-3">
                                <label>Salud</label>
                                <select name="salud" ref={salud} className="form-select" aria-label="Default select example" onChange={handleChange}>
                                    <option value=""></option>
                                    <option value="ISAPRE">ISAPRE</option>
                                    <option value="FONASA">FONASA</option>
                                </select>
                            </div>
                            <div className="form-group pt-3">
                                <label>Banco</label>
                                <input type="bank" ref={bank} onChange={handleChange} name="bank" className="form-control" placeholder="Ingresa el banco"/>
                            </div>
                            <div className="form-group pt-3">
                                <label>Tipo de cuenta</label>
                                <input type="account_type" ref={account_type} onChange={handleChange} name="account_type" className="form-control" placeholder="Ingresa el tipo de cuenta"/>
                            </div>
                            <div className="form-group pt-3">
                                <label>Número de Cuenta</label>
                                <input type="account" ref={account} onChange={handleChange} name="account" className="form-control" placeholder="Ingresa el número de cuenta"/>
                            </div>
                        </form>
                        </div>
                        <div className="modal-footer">
                            {error === true && (
                                    <div className="alert alert-danger" role="alert"> Error al crear trabajador! </div>
                            ) 
                            }
                            {      
                            error === false && (
                                <div className="alert alert-primary" role="alert"> Trabajador Creado</div>
                            )
                            }
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

export default CreateEmployee