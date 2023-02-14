import axios from "axios"
import {useEffect, useState} from "react"
import { useForm } from "react-hook-form"

function UpdateObject(props) {
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
        <div className="d-flex ">
        <button data-bs-toggle="modal" data-bs-target={"#modifymodal" + props.index} className="btn btn-warning">Actualizar</button>
            <div className="modal fade" id={"modifymodal" + props.index} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Actualizar</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleClose}></button>
                        </div>
                        <div className="modal-body">
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
                            {
                            Object.keys(props.input).map((key, index) => 
                            key != "password" &&
                                <div className="form-group pt-3" key={index}>
                                    <label>{props.input[key].label}</label>
                                    <input {...register(key)} defaultValue={props.object[key]} type={props.input[key].type} name={key} className="form-control" required={props.input[key].required}/>
                                </div>
                                
                            )
                            }
                            {
                            Object.keys(props.select).map((key, index) =>
                                <div className="form-group pt-3" key={index}>
                                    <label>{props.select[key].label}</label>
                                    <select {...register(key)} defaultValue={props.object[key]} name={key} className="form-select" aria-label="Default select example">
                                        <option></option>
                                        {
                                        props.select[key].options.map((option, index) => 
                                            <option value={option.value} key={index}>{option.label}</option>
                                        )
                                        }
                                    </select>
                                </div>
                            )
                            }
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
                    </div>
                </div>
            </div>
    </div>
    )
}

export default UpdateObject
