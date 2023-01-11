import UpdateEmployee from "./UpdateEmployee"
import EmployeeReportsTable from "./EmployeeReportsTable"

function EmployeesProfile(props) {

    return (
        <div className="container row pt-5 pb-3">
            <div className="col">
                <UpdateEmployee employee={props.employee}/>
            </div>
            <div className="col">
                <EmployeeReportsTable employee={props.employee}/>
            </div>
        </div>
    )
}            


export default EmployeesProfile