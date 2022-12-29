import { useEffect, useState } from "react"
import axios from "axios"

function UsersTable() {
    const [users, setUsers] = useState(null)
    
    useEffect(() =>{
        axios("http://localhost:4000/user", {method: "GET"})
        .then(res => {
            setUsers(res.data.data)
        })
    }, [])

    const handleRemoveClick = (e, userId) => {
        e.preventDefault()
        axios.delete(`http://localhost:4000/user/${userId}`)
        .then(res => console.log(res))
        .catch(error => console.error(error))
    }   

    const [isUpdating, setIsUpdating] = useState(false)
    const [user, setUser] = useState({})

    const handleModifyClick = (e, user) => {
        setIsUpdating(current => !current)
        setUser(user)
    }

    return (
        <div className="container">
        { 
        isUpdating ?
            (
                <form>
                    <div className="form-group pt-3">
                        <label>Rut</label>
                        <input type="text" name="rut" className="form-control" value={user.rut}/>
                    </div>
                    <div className="form-group pt-3">
                        <label>Nombre</label>
                        <input type="text" name="name" className="form-control" value={user.name} placeholder="Ingresa el nombre" />
                    </div>
                    <div className="form-group pt-3">
                        <label>Apellido</label>
                        <input type="text" name="lastname" className="form-control" value={user.lastname} placeholder="Ingresa el apellido"/>
                    </div>
                    <div className="form-group pt-3">
                        <label>Email</label>
                        <input type="email" name="email" className="form-control" value={user.email} placeholder="Ingresa el email"/>
                    </div>
                    <div className="form-group pt-3">
                        <button className="btn btn-warning m-2" name="actualizar">Actualizar</button>
                        <button onClick={() => setIsUpdating(false)} className="btn btn-danger m-2">Cancelar</button>
                    </div>
                </form>
            )
            :
            (
                (users == null) ? 
                (
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                )
                :
                (
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Rut</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Apellido</th>
                                <th scope="col">Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => 
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.rut}</td>
                                <td>{user.name}</td> 
                                <td>{user.lastname}</td> 
                                <td>{user.email}</td>
                                <td>
                                    <button onClick={e => handleRemoveClick(e, user._id)} className="btn btn-danger" >Eliminar</button>
                                </td>
                                <td>
                                    <button onClick={e => handleModifyClick(e, user)} className="btn btn-warning" >Modificar</button>
                                </td>  
                            </tr>
                            )}
                        </tbody>
                    </table>
                )
            )
        }              
        </div>
    )
}            


export default UsersTable