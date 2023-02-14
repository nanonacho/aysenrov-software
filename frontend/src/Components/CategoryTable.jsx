import Table from "./Table"

function CategoryTable(props) {
    return (
        <Table
        create={true}
        update={true}
        getUrl={"http://localhost:4000/category/"} 
        postUrl={"http://localhost:4000/category/"}
        updateUrl={"http://localhost:4000/category/"}
        deleteUrl={"http://localhost:4000/category/"}
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

export default CategoryTable