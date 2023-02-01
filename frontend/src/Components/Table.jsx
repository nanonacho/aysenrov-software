import { useEffect, useState } from "react"
import axios from "axios"
import CreateObject from "./CreateObject"
import UpdateObject from "./UpdateObject"
import DeleteObject from "./DeleteObject"
import PdfObject from "./PdfObject"

function Table(props) {
    const [objects, setObjects] = useState(null)

    const [reload, setReload] = useState(false)

    const [selectedObject, setSelectedObject] = useState(null)

    const handleReload = () => setReload(reload => !reload)

    useEffect(() => {
        axios(props.getUrl, {method: "GET"})
        .then(res => {
            setObjects(res.data.data)
            console.log(res.data.data)
        })
    }, [reload, props.getUrl]) 

    return (
        <div className="container">
            { 
            (objects == null) ? 
                (
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
                ) 
                : 
                ( 
                !selectedObject ? 
                <div>
                    {
                    props.create && <CreateObject input={props.input} select={props.select} url={props.postUrl} handleReload={handleReload}/>
                    }
                    {
                        <table className="table">
                            <thead>
                                <tr>
                                    {
                                        Object.keys(props.col).map((key, index) => 
                                            <th scope="col" key={index}>{key}</th>
                                        )
                                    }
                                </tr>
                            </thead>
                            <tbody>
                            {
                                objects.map((object, index) =>
                                    <tr key={index}>
                                    {
                                    Object.keys(props.col).map((key, index) =>
                                        <td key={index}>{object[props.col[key]]}</td>
                                    )
                                    }
                                    {
                                        props.pdfUrl && 
                                        <td>
                                            <PdfObject key={index} index={index} url={props.pdfUrl + (object.id ? object.id : object._id)} handleReload={handleReload} objectId={object.id ? object.id : object._id}/>
                                        </td>    
                                    } 
                                    {
                                        props.update && 
                                        <td>
                                            <UpdateObject key={index} index={index} input={props.input} select={props.select} url={props.updateUrl + (object.id ? object.id : object._id)} handleReload={handleReload} object={object}/>
                                        </td>
                                    }
                                    {
                                        props.update && 
                                        <td>
                                            <DeleteObject key={index} index={index} url={props.deleteUrl} handleReload={handleReload} objectId={object.id ? object.id : object._id}/>
                                        </td>    
                                    }
                                    {
                                        props.children &&
                                        <td>
                                            <button className="btn btn-primary" onClick={() => setSelectedObject(object)}>{props.childrenTitle}</button>
                                        </td>
                                    } 
                                    </tr>   
                                )
                            }
                            </tbody>
                        </table>
                    }
                </div>
                :
                <div className="">
                    <button className="btn btn-danger" onClick={() => setSelectedObject(null)}>Cerrar</button>
                    <props.children object={selectedObject}></props.children>
                </div>
                )
                }  
            </div>
        )
}

export default Table    