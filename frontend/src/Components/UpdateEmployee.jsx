import { useRef, useState } from "react"
import axios from "axios"

function UpdateEmployee(props) {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [employee, setEmployee] = useState(props.employee)

    const rut = useRef(null)
    const name = useRef(null)
    const lastname = useRef(null)
    const email = useRef(null)
    const phone_number = useRef(null)
    const position = useRef(null)
    const entry_date = useRef(null)
    const birth_date = useRef(null)
    const address = useRef(null)
    const afp = useRef(null)
    const city = useRef(null)
    const salud = useRef(null)
    const bank = useRef(null)
    const account_type = useRef(null)
    const account = useRef(null)

    const handleChange = (e) => {
        setEmployee({
            ...employee,
            [e.target.name]: e.target.value.trim()
        })
    }
    
    const resetForm = () => {
        rut.current.value = employee.rut
        name.current.value = employee.name
        lastname.current.value = employee.lastname
        email.current.value = employee.email
        phone_number.current.value = employee.phone_number
        position.current.value = employee.position
        entry_date.current.value = employee.entry_date
        birth_date.current.value = employee.birth_date
        address.current.value = employee.address
        afp.current.value = employee.afp
        salud.current.value = employee.salud
        city.current.value = employee.city
        bank.current.value = employee.bank
        account_type.current.value = employee.account_type
        account.current.value = employee.account
    }

    const handleSubmit = (e, employeeId) => {
        e.preventDefault()
        setIsLoading(true)
        axios.put(`http://localhost:4000/employee/${employeeId}`, employee)
        .then(res => {
            setIsLoading(false)
            setError(false)
            console.log(res)
        })
        .catch(error => {
            setIsLoading(false)
            setError(true)
            console.error("Error al modificar trabajador")
        })
        resetForm()
    }

    return (
        <div className="card">
            <div className="card-header">
                Datos Trabajador
            </div>
            <form className="p-3">
                {error === true && (
                    <div className="alert alert-danger" role="alert"> Error al modificar trabajador! </div>
                    ) 
                }
                {      
                error === false && (
                    <div className="alert alert-primary" role="alert"> Usuario modificado</div>
                    )
                }
                <div className="form-group pt-3">
                    <label>Rut</label>
                    <input ref={rut} type="text" onChange={handleChange} name="rut" className="form-control" defaultValue={employee.rut}/>
                </div>
                <div className="form-group pt-3">
                    <label>Nombres</label>
                    <input type="text" ref={name} onChange={handleChange} name="name" className="form-control" defaultValue={employee.name} placeholder="Ingresa el nombre" />
                </div>
                <div className="form-group pt-3">
                    <label>Apellidos</label>
                    <input type="text" ref={lastname} onChange={handleChange} name="lastname" className="form-control" defaultValue={employee.lastname} placeholder="Ingresa el apellido"/>
                </div>
                <div className="form-group pt-3">
                    <label>Email</label>
                    <input type="email" ref={email} onChange={handleChange} name="email" className="form-control" defaultValue={employee.email} placeholder="Ingresa el email"/>
                </div>
                <div className="form-group pt-3">
                    <label>Teléfono</label>
                    <input type="tel" ref={phone_number} onChange={handleChange} name="phone_number" className="form-control" defaultValue={employee.phone_number} placeholder="Ingresa el teléfono"/>
                </div>
                <div className="form-group pt-3">
                    <label>Dirección</label>
                    <input type="text" ref={address} onChange={handleChange} name="address" className="form-control" defaultValue={employee.address} placeholder="Ingresa la dirección"/>
                </div>
                <div className="form-group pt-3">
                    <label>Cargo</label>
                    <select name="position" ref={position} defaultValue={employee.position} className="form-select" aria-label="Default select example" onChange={handleChange}>
                        <option value="Piloto Rov">Piloto Rov</option>
                        <option value="Gerente">Gerente</option>
                        <option value="Jefe de Taller">Jefe de Taller</option>
                    </select>
                </div>
                <div className="form-group pt-3">
                    <label>Fecha Ingreso</label>
                    <input type="date" ref={entry_date} onChange={handleChange} name="entry_date" className="form-control" defaultValue={employee.entry_date} placeholder="Ingresa el email"/>
                </div>
                <div className="form-group pt-3">
                    <label>Fecha Nacimiento</label>
                    <input type="date" ref={birth_date} onChange={handleChange} name="birth_date" className="form-control" defaultValue={employee.birth_date} placeholder="Ingresa el email"/>
                </div>
                <div className="form-group pt-3">
                    <label>AFP</label>
                    <select name="afp" ref={afp} defaultValue={employee.afp} className="form-select" aria-label="Default select example" onChange={handleChange}>
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
                    <select name="salud" ref={salud} defaultValue={employee.salud} className="form-select" aria-label="Default select example" onChange={handleChange}>
                        <option value=""></option>
                        <option value="ISAPRE">ISAPRE</option>
                        <option value="FONASA">FONASA</option>
                    </select>
                </div>
                <div className="form-group pt-3">
                    <label>Banco</label>
                    <input type="bank" ref={bank} defaultValue={employee.bank} onChange={handleChange} name="bank" className="form-control" placeholder="Ingresa el banco"/>
                </div>
                <div className="form-group pt-3">
                    <label>Tipo de cuenta</label>
                    <input type="account_type" ref={account_type} defaultValue={employee.account_type} onChange={handleChange} name="account_type" className="form-control" placeholder="Ingresa el tipo de cuenta"/>
                </div>
                <div className="form-group pt-3">
                    <label>Número de Cuenta</label>
                    <input type="account" ref={account} defaultValue={employee.account} onChange={handleChange} name="account" className="form-control" placeholder="Ingresa el número de cuenta"/>
                </div>
                {error === true && (
                    <div className="alert alert-danger" role="alert"> Error al modificar trabajador! </div>
                    ) 
                }
                {      
                error === false && (
                    <div className="alert alert-primary" role="alert"> Usuario modificado</div>
                    )
                }
                <div className="form-group pt-3">
                    { isLoading ? (
                    <button type="button" className="btn btn-info">
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        Modificar
                    </button>
                    ) : (
                    <button className="btn btn-warning" onClick={(e) => handleSubmit(e, employee.id)}>Modificar</button>
                    )
                    }
                </div>
            </form>
        </div>
    )
}

export default UpdateEmployee