import UpdateEmployee from "./UpdateEmployee"
import Table from "./Table"

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
                        <Table
                        key={props.employee.id}
                        create={false}
                        update={false}
                        getUrl={"http://localhost:4000/contract/last/" + `${props.employee.id}`}
                        postUrl={"http://localhost:4000/contract/"}
                        updateUrl={"http://localhost:4000/contract/"}
                        col={{
                            "ID": "id",
                            "Cargo": "position",
                            "Salario Base": "base_salary",
                            "Tipo": "type",
                            "Fecha Inicio": "start_date",
                            "Fecha Termino": "end_date"
                        }}
                        input={{}}
                        select={{}}
                        />
                    </div>
                </div>
                <div className="card mt-3">
                    <div className="card-header">
                        Observaciones
                    </div>
                    <div className="card-body">
                        <Table 
                        key={props.employee.id}
                        create={true}
                        update={true}
                        getUrl={"http://localhost:4000/employee-report/" + `${props.employee.id}`}
                        postUrl={"http://localhost:4000/employee-report/"}
                        updateUrl={"http://localhost:4000/employee-report/"}
                        col={{
                            "ID": "id", 
                            "Fecha": "date",
                            "Cliente": "customer",
                            "Lugar": "place",
                            "Descripción": "description"
                        }}
                        input={{
                            "date": {
                                "label": "Fecha",
                                "type": "date",
                                "required": true
                            },
                            "customer": {
                                "label": "Cliente",
                                "type": "text",
                                "required": true
                            },
                            "place": {
                                "label": "Lugar",
                                "type": "text",
                                "required": true
                            },
                            "description": {
                                "label": "Descripción",
                                "type": "text",
                                "required": true
                            },
                            "employee_id": {
                                "type": "hidden",
                                "defaultValue": props.employee.id
                            }
                        }}
                        select={{
                        }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}            


export default EmployeesProfile