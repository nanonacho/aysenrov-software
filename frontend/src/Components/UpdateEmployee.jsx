import { useRef, useState } from "react"

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

    const handleChange = (e) => {
        setEmployee({
            ...employee,
            [e.target.name]: e.target.value.trim()
        })
    }

    return (
        <div class="card" style={{"width": "25rem"}}>
            <div className="card-header">
                Datos Trabajador
            </div>
            <form className="p-3">
                <div className="form-group pt-3">
                    <label>Rut</label>
                    <input type="text" ref={rut} onChange={handleChange} name="rut" className="form-control" defaultValue={employee.rut}/>
                </div>
                <div className="form-group pt-3">
                    <label>Nombre</label>
                    <input type="text" ref={name} onChange={handleChange} name="name" className="form-control" defaultValue={employee.name} placeholder="Ingresa el nombre" />
                </div>
                <div className="form-group pt-3">
                    <label>Apellido</label>
                    <input type="text" ref={lastname} onChange={handleChange} name="lastname" className="form-control" defaultValue={employee.lastname} placeholder="Ingresa el apellido"/>
                </div>
                <div className="form-group pt-3">
                    <label>Email</label>
                    <input type="email" ref={email} onChange={handleChange} name="email" className="form-control" defaultValue={employee.email} placeholder="Ingresa el email"/>
                </div>
                <div className="form-group pt-3">
                    <label>Teléfono</label>
                    <input type="text" ref={phone_number} onChange={handleChange} name="phone_number" className="form-control" defaultValue={employee.phone_number} placeholder="Ingresa el teléfono"/>
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
                    <label>Email</label>
                    <input type="email" ref={email} onChange={handleChange} name="email" className="form-control" defaultValue={employee.email} placeholder="Ingresa el email"/>
                </div>
                <div className="form-group pt-3">
                    <label>Fecha Ingreso</label>
                    <input type="date" ref={entry_date} onChange={handleChange} name="entry_date" className="form-control" defaultValue={employee.entry_date} placeholder="Ingresa el email"/>
                </div>
                <div className="form-group pt-3">
                    <label>Fecha Nacimiento</label>
                    <input type="date" ref={birth_date} onChange={handleChange} name="birth_date" className="form-control" defaultValue={employee.birth_date} placeholder="Ingresa el email"/>
                </div>
            </form>
        </div>
    )
}

export default UpdateEmployee