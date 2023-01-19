exports.title = "Contrato Individual de Trabajo"

exports.first_par = (employee, contract) => {
    start_date = new Date(contract.start_date)
    start_date = start_date.toLocaleDateString("es-CL", {
        weekday: "long", // narrow, short
        year: "numeric", // 2-digit
        month: "long", // numeric, 2-digit, narrow, long
        day: "numeric" // 2-digit
    })
    
    birth_date = new Date(employee.birth_date)
    birth_date = birth_date.toLocaleDateString("es-CL")

    return `En Aysén, a ${start_date}, entre la empresa AYSÉN ROV SPA RUT: 77.071.089-8, representada por don CARLOS ALFREDO DIAZ VARELA en su calidad de Representante legal cédula de identidad N° 10.490.921-3, con domicilio en Sargento Aldea #1149, comuna de Aysén, de la ciudad de Aysén, en adelante, "el empleador"; y don ${employee.name + " " + employee.lastname} de nacionalidad Chilena, cédula de identidad N° ${employee.rut}, de estado civil, fecha de nacimiento ${birth_date}, con el cargo ${contract.position}, domiciliado en ${employee.address.toUpperCase()}, ${employee.city.toUpperCase()} y, en consecuencia, capaz de celebrar contrato de trabajo en adelante "el trabajador"; las partes han convenido celebrar el presente contrato de trabajo al tenor de las siguientes:`
}
