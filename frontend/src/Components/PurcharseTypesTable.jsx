import Table from "./Table"

function PurcharseTypesTable() {
    return (
        <Table
        create={true}
        update={true}
        getUrl={"http://localhost:4000/purcharse-type/"} 
        postUrl={"http://localhost:4000/purcharse-type/"}
        updateUrl={"http://localhost:4000/purcharse-type/"}
        deleteUrl={"http://localhost:4000/purcharse-type/"}
        col={{
            "ID": ["id"],
            "Nombre": ["name"]
        }}
        input={{
            "name": {
                "label": "Nombre",
                "type": "text",
                "required": true
            }
        }}
        select={{}}
        />
    )
}

export default PurcharseTypesTable