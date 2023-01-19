import { useState } from "react"
import axios from "axios"

function DeleteObject(props) {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleRemoveClick = (e, objectId) => {
        e.preventDefault()
        setIsLoading(true)
        axios.delete(props.url + `${objectId}`)
        .then(res => {
            setIsLoading(false)
            setError(false)
            props.handleReload()
            console.log(res)
        })
        .catch(error => {
            console.error(error)
            setIsLoading(false)
            setError(true)     
        })
    }  
    return (
        <div>
            {
                isLoading ? (
                    <button type="button" className="btn btn-danger">
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        Eliminar
                    </button>
                ) : (
                    <button data-bs-toggle="modal" data-bs-target={"#deletemodal" + props.index} className="btn btn-danger" >Eliminar</button>
                )
            }
            <div className="modal fade" id={"deletemodal" + props.index} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">¿Estás seguro de eliminar?</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" data-bs-target={"#deletemodal" + props.index}></button>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" data-bs-target={"#deletemodal" + props.index}>Cancelar</button>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={e => handleRemoveClick(e, props.objectId)}>Eliminar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteObject