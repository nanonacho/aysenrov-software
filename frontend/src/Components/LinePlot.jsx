import { useEffect, useState } from "react"
import Plot from "react-plotly.js"
import axios from "axios"

function LinePlot(props) {

    const [error, setError] = useState(false)

    return (
        !error ? (
            <Plot
                data={[
                {
                    x: props.x,
                    y: props.y,
                    type: 'scatter',
                    mode: 'lines',
                    marker: {color: 'red'},
                }
                ]}
                layout={ {width: 800, height: 400, title: props.title} }
            />
        ) : (
            <div className="container">
                <div className="alert alert-danger" role="alert">
                    Datos no disponibles. Intenta más tarde.
                </div>
            </div>
        )
        
    )
}

export default LinePlot