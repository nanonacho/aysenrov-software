import PurcharseOrdersTable from "../Components/PurcharseOrdersTable"
import PurcharseStats from "../Components/PurcharseStats"

function PurcharseOrders() {
    return (
        <div>
            <div className="d-flex align-items-center justify-content-center pb-4"><h1>Gastos</h1></div>
            <PurcharseStats/>
            <PurcharseOrdersTable/>
        </div>
    )
}

export default PurcharseOrders