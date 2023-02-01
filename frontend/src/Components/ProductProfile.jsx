import Table from "./Table"

function ProductProfile(props) {
    return (
        <div>
            <div class="card m-1" >
                <div class="card-header">
                    {props.object.name}
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">Stock total</li>
                    <li class="list-group-item">Stock disponible</li>
                    <li class="list-group-item">Stock no disponible</li>
                </ul>
            </div>
            <Table
            key={props.object.id}
            create={true}
            update={true}
            getUrl={"http://localhost:4000/item/product/" + props.object.id} 
            postUrl={"http://localhost:4000/item/"}
            updateUrl={"http://localhost:4000/item/"}
            deleteUrl={"http://localhost:4000/item/"}
            children={<ProductProfile/>}
            childrenTitle={"Stock"}
            col={{
                "ID": "id",
                "Código": "code",
                "Descripción": "description",
                "Condición": "condition"
            }}
            input={{
                "code": {
                    "label": "Código",
                    "type": "text",
                    "required": false
                },
                "description": {
                    "label": "Descripción",
                    "type": "text",
                    "required": false
                },
                "condition": {
                    "label": "Condición",
                    "type": "text",
                    "required": true
                },
                "product_id": {
                    "label": "",
                    "type": "hidden",
                    "required": true,
                    "defaultValue": props.object.id
                }
            }}
            select={{}}
            />
        </div>
    )
}

export default ProductProfile