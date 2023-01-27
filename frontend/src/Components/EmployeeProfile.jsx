import UpdateEmployee from "./UpdateEmployee"
import ReportsTable from "./ReportsTable"
import LastContract from "./LastContract"

function EmployeesProfile(props) {
    return (
        <div className="container row pt-5 pb-3">
            <div className="col-4">
                <UpdateEmployee key={props.employee.id} employee={props.employee} handleReload={props.handleReload}/>
            </div>
            <div className="col">
                <div className="card">
                    <div className="card-header">Último contrato</div>
                    <div className="card-body">
                        <LastContract employee={props.employee}/>
                    </div>
                </div>
                <div className="card mt-3">
                    <div className="card-header">
                        Observaciones
                    </div>
                    <div className="card-body">
                        <ReportsTable employee={props.employee}/>
                    </div>
                </div>
            </div>
        </div>
    )
}            

export default EmployeesProfile