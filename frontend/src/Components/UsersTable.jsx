import { useEffect, useState } from "react"
import axios from "axios"
import CreateUser from "./CreateUser"
import UpdateUser from "./UpdateUser"
import DeleteUser from "./DeleteUser"

function UsersTable() {
    const [users, setUsers] = useState(null)
    
    const [reload, setReload] = useState(false)

    const handleReload = () => setReload(reload => !reload)
    
    const roles = {
        1111: "Administrador",
        2222: "Recursos Humanos",
        3333: "Finanzas"
    }
    
    useEffect(() => {
        axios("http://localhost:4000/user", {method: "GET"})
        .then(res => {
            setUsers(res.data.data)
        })
    }, [reload]) 

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
                <div className="d-flex align-items-center justify-content-center pb-4"><h1>Usuarios</h1></div>
                <CreateUser handleReload={handleReload} />
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
                               <DeleteUser key={index} index={index} user={user} handleReload={handleReload}/> 
                            </td>
                            <td>
                                <UpdateUser key={index} index={index} user={user} handleReload={handleReload}/>
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