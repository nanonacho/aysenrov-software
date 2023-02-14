import Table from "./Table"

function LastContract(props) {
    return (
        <Table
        key={props.employee.id}
        create={false}
        update={false}
        getUrl={"http://localhost:4000/contract/last/" + props.employee.id}
        postUrl={"http://localhost:4000/contract/"}
        updateUrl={"http://localhost:4000/contract/"}
        deleteUrl={"http://localhost:4000/contract/"}
        col={{
            "ID": ["id"],
            "Cargo": ["position"],
            "Salario Base": ["base_salary"],
            "Tipo": ["type"],
            "Fecha Inicio": ["start_date"],
            "Fecha Termino": ["end_date"]
        }}
        input={{}}
        select={{}}
        />
    )
}

export default LastContract