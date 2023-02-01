import InventoryTables from "../Components/InventoryTables"
import RovsTable from "../Components/RovsTable"

function Inventory() {
    return (
        <div>
            <div className="d-flex align-items-center justify-content-center pb-4"><h1>Inventario</h1></div>
            <InventoryTables/>
        </div>
    )
}

export default Inventory