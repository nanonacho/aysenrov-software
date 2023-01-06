import { useEffect, useState } from "react"
import axios from "axios"

function UsersTable() {
    const [users, setUsers] = useState(null)
    const [isModifying, setIsModifying] = useState(false)
    const [modifyIsLoading, setModifyIsLoading] = useState(false)
    const [modifyError, setModifyError] = useState(false)
    
    const [isCreating, setIsCreating] = useState(false)
    const [createIsLoading, setCreateIsLoading] = useState(false)
    const [createError, setCreateError] = useState(false)
    
    const [user, setUser] = useState({})
    const roles = {
        1111: "Administrador",
        2222: "Recursos Humanos",
        3333: "Finanzas"
    }
    useEffect(() =>{
        axios("http://localhost:4000/user", {method: "GET"})
        .then(res => {
            setUsers(res.data.data)
        })
    }, [isModifying])

    const handleRemoveClick = (e, userId) => {
        e.preventDefault()
        axios.delete(`http://localhost:4000/user/${userId}`)
        .then(res => console.log(res))
        .catch(error => console.error(error))
    }   

    

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value.trim()
        })
    }

    const handleModifyCancel = () => setUser({})
    
    const handleModifySubmit = (e, userId) => {
        e.preventDefault()
        setModifyIsLoading(true)

        axios.put(`http://localhost:4000/user/${userId}`, user)
        .then(res => {
            setIsModifying(isModifying => !isModifying)
            setModifyIsLoading(false)
            console.log(res)
        })
        .catch(error => {
            setModifyIsLoading(false)
            setModifyError(true)
            console.error("Error al modificar usuario")
        })
    }

    const handleCreateSubmit = (e) => {
        e.preventDefault()
        setCreateIsLoading(true)

        axios.post("http://localhost:4000/user", user)
        .then(res => {
            setIsCreating(isModifying => !isModifying)
            setCreateIsLoading(false)
            console.log(res)
        })
        .catch(error => {
            setCreateIsLoading(false)
            setCreateError(true)
            console.error("Error al crear usuario")
        })
    }
    return (
        <div className="container">
        { 
        (users == null) ? (
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>

            ) : ( 
            <div>
                <div className="d-flex ">
                    <button data-bs-toggle="modal" data-bs-target="#addmodal" className="btn btn-info" >Añadir Usuario</button>
                                <div className="modal fade" id="addmodal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h1 className="modal-title fs-5" id="staticBackdropLabel">Añadir Usuario</h1>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                            <form>
                                                <div className="form-group pt-3">
                                                    <label>Rut</label>
                                                    <input type="text" onChange={handleChange} name="rut" className="form-control" defaultValue={user.rut}/>
                                                </div>
                                                <div className="form-group pt-3">
                                                    <label>Nombre</label>
                                                    <input type="text" onChange={handleChange} name="name" className="form-control" defaultValue={user.name} placeholder="Ingresa el nombre" />
                                                </div>
                                                <div className="form-group pt-3">
                                                    <label>Apellido</label>
                                                    <input type="text" onChange={handleChange} name="lastname" className="form-control" defaultValue={user.lastname} placeholder="Ingresa el apellido"/>
                                                </div>
                                                <div className="form-group pt-3">
                                                    <label>Email</label>
                                                    <input type="email" onChange={handleChange} name="email" className="form-control" defaultValue={user.email} placeholder="Ingresa el email"/>
                                                </div>
                                                <div className="form-group pt-3">
                                                    <label>Permisos</label>
                                                    <select name="role" defaultValue={user.role} className="form-select" aria-label="Default select example" onChange={handleChange}>
                                                        <option value="1111">Administrador</option>
                                                        <option value="2222">Recursos Humanos</option>
                                                        <option value="3333">Finanzas</option>
                                                    </select>
                                                </div>
                                            </form>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleModifyCancel}>Cancelar</button>
                                                <button type="button" className="btn btn-info" data-bs-dismiss="modal" onClick={handleCreateSubmit}>Añadir</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Rut</th>
                            <th scope="col">Nombres</th>
                            <th scope="col">Apellidos</th>
                            <th scope="col">Email</th>
                            <th scope="col">Permisos</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => 
                        <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.rut}</td>
                            <td>{user.name}</td> 
                            <td>{user.lastname}</td> 
                            <td>{user.email}</td>
                            <td>{roles[user.role]}</td>
                            <td>
                                <button data-bs-toggle="modal" data-bs-target={"#deletemodal" + index} className="btn btn-danger" >Eliminar</button>
                                <div className="modal fade" id={"deletemodal" + index} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h1 className="modal-title fs-5" id="staticBackdropLabel">¿Estás seguro de eliminar a {user.name} {user.lastname} ?</h1>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleModifyCancel}>Cancelar</button>
                                                <button type="button" className="btn btn-danger" onClick={e => handleRemoveClick(e, user._id)}>Eliminar</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <button data-bs-toggle="modal" data-bs-target={"#modifymodal" + index} className="btn btn-warning" >Modificar</button>
                                <div className="modal fade" id={"modifymodal" + index} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h1 className="modal-title fs-5" id="staticBackdropLabel">Modificar Datos</h1>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                            <form>
                                                <div className="form-group pt-3">
                                                    <label>Rut</label>
                                                    <input type="text" onChange={handleChange} name="rut" className="form-control" defaultValue={user.rut}/>
                                                </div>
                                                <div className="form-group pt-3">
                                                    <label>Nombre</label>
                                                    <input type="text" onChange={handleChange} name="name" className="form-control" defaultValue={user.name} placeholder="Ingresa el nombre" />
                                                </div>
                                                <div className="form-group pt-3">
                                                    <label>Apellido</label>
                                                    <input type="text" onChange={handleChange} name="lastname" className="form-control" defaultValue={user.lastname} placeholder="Ingresa el apellido"/>
                                                </div>
                                                <div className="form-group pt-3">
                                                    <label>Email</label>
                                                    <input type="email" onChange={handleChange} name="email" className="form-control" defaultValue={user.email} placeholder="Ingresa el email"/>
                                                </div>
                                                <div className="form-group pt-3">
                                                    <label>Permisos</label>
                                                    <select name="role" defaultValue={user.role} className="form-select" aria-label="Default select example" onChange={handleChange}>
                                                        <option value="1111">Administrador</option>
                                                        <option value="2222">Recursos Humanos</option>
                                                        <option value="3333">Finanzas</option>
                                                    </select>
                                                </div>
                                            </form>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleModifyCancel}>Cancelar</button>
                                                <button type="button" className="btn btn-warning" data-bs-dismiss="modal" onClick={(e) => handleModifySubmit(e, user._id)}>Modificar</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </td>  
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


export default UsersTable