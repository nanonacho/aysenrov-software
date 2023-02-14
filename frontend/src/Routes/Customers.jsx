import CustomersTable from "../Components/CustomersTable"

function Customers() {
    return (
        <div>
            <div className="d-flex align-items-center justify-content-center pb-4"><h1>Clientes</h1></div>
            <CustomersTable/>
        </div>
    )
}

export default Customers