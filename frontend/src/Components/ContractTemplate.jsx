import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import axios from "axios"

function ContractTemplate(props) {
    const {
        register,
        handleSubmit,
        reset,
        formState,
        formState: { isSubmitSuccessful }
      } = useForm()
    
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [object, setObject] = useState(props.object)

    const onSubmit = (object) => {
        console.log(object)
        setIsLoading(true)
        setObject(object)
        axios.put(props.url, object)
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
            console.error("Error al modificar")
        })
    }

    const handleClose = () => {
        setIsLoading(false)
        setError(null)
        reset(object)
    }

    useEffect(() => {
        if (formState.isSubmitSuccessful) {
            reset(object)
          }  
    }, [formState, isSubmitSuccessful, reset, object])

    return (
        <div className="card">
            <div className="card-header">
                Contrato
            </div>
            {
            error === true && (
                    <div className="alert alert-danger" role="alert"> Error! </div>
                    ) 
            }
            {      
            error === false && (
                <div className="alert alert-primary" role="alert"> Actualizado </div>
                )
            }
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group pt-3">
                <label>Título</label>
                <input {...register("title")} defaultValue={""} type="text" name="title" className="form-control" />
            </div>  
                { 
                isLoading ? ( 
                    <div>
                        <button type="button" className="btn btn-secondary m-1" disabled>Cancelar</button>
                        <button type="button" className="btn btn-warning">
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            Actualizar
                        </button>
                    </div>
                    ) : (
                    error === null || error === true ? (
                        <div>
                            <button type="button" className="btn btn-secondary m-1" data-bs-dismiss="modal" onClick={handleClose}>Cancelar</button>
                            <input type="submit" value="Actualizar" className="btn btn-warning"/>
                        </div>
                        ) : (
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleClose}>Cerrar</button>
                            )
                            ) 
                }
            </form>
        </div>
    )
}

export default ContractTemplate