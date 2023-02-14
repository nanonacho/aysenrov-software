import LinePlot from "./LinePlot"

function PurcharseStats() {
    return (
        <div className="text-center mb-5">
            <div className="d-flex justify-content-center">
                <div class="card m-1 col-2 text-bg-primary">
                    <div class="card-header">
                        Total Gastos {new Intl.DateTimeFormat("es-CL", {month: "long"}).format(new Date())}
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item"><h3></h3></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default PurcharseStats