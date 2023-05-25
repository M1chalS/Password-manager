import {Table} from "react-bootstrap";

const PasswdTable = ({ data, config, keyFn }) => {

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
            </tr>
        );
    });

    return <Table striped bordered hover>
        <thead>
        <tr>
            {renderedHeaders}
        </tr>
        </thead>
        <tbody>
            {renderedRows}
        </tbody>
    </Table>
}

export default PasswdTable;
