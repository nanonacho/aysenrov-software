import UpdateEmployee from "./UpdateEmployee"
import ReportsTable from "./ReportsTable"
import LastContract from "./LastContract"

function EmployeesProfile(props) {
    return (
        <div className="container row pt-5 pb-3">
            <div className="col-4">
                <UpdateEmployee key={props.object.id} employee={props.object} handleReload={props.handleReload}/>
            </div>
            <div className="col">
                <div className="card">
                    <div className="card-header">Último contrato</div>
                    <div className="card-body">
                        <LastContract employee={props.object}/>
                    </div>
                </div>
                <div className="card mt-3">
                    <div className="card-header">
                        Observaciones
                    </div>
                    <div className="card-body">
                        <ReportsTable employee={props.object}/>
                    </div>
                </div>
            </div>
        </div>
    )
}            

export default EmployeesProfile