import {Table} from "react-bootstrap";
import {MdDelete, MdModeEditOutline} from "react-icons/md";

const PasswdTable = ({ data, config, keyFn, editOn = true, deleteOn = true, onDelete }) => {

    const renderedHeaders = config.map((column) => {
        return <th key={column.label}>
            {column.label}
        </th>
    });

    const renderedRows = data.map((rowData) => {

        const renderedCells = config.map(column => {
            return <td key={column.label} className="p-3">{column.render(rowData)}</td>;
        });

        return (
            <tr key={keyFn(rowData)}>
                {renderedCells}
                {(editOn || deleteOn) && <td>
                    {editOn && <MdModeEditOutline className="cursor-pointer" style={{ fontSize: "1.5rem" }}/>}
                    {deleteOn && <MdDelete className="cursor-pointer" style={{fontSize: "1.5rem"}} onClick={() => onDelete(rowData.id)}/>}
                </td>}
            </tr>
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
