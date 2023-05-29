import {Table} from "react-bootstrap";
import {PasswdTableRow} from "./PasswdTableRow.jsx";

const PasswdTable = ({ data, config, keyFn, editOn = true, deleteOn = true, onDelete, onEdit }) => {
    const renderedHeaders = config.map((column) => {
        return <th key={column.label}>
            {column.label}
        </th>
    });

    const renderedRows = data.map((rowData) => {
        return (
            <PasswdTableRow key={keyFn(rowData)} rowData={rowData} editOn={editOn} config={config} deleteOn={deleteOn} onEdit={onEdit} onDelete={onDelete} />
        );
    });

    return <Table striped bordered hover>
        <thead>
        <tr>
            {renderedHeaders}
            {(editOn || deleteOn) && <th>
                Actions
            </th>}
        </tr>
        </thead>
        <tbody>
            {renderedRows}
        </tbody>
    </Table>
}

export default PasswdTable;
