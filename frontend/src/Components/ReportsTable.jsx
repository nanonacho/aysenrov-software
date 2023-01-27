import Table from "./Table"

function ReportsTable(props) {
    return (
        <Table 
        key={props.employee.id}
        create={true}
        update={true}
        getUrl={"http://localhost:4000/employee-report/" + props.employee.id}
        postUrl={"http://localhost:4000/employee-report/"}
        updateUrl={"http://localhost:4000/employee-report/"}
        deleteUrl={"http://localhost:4000/employee-report/"}
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
    )
}

export default ReportsTable