import {MdDelete, MdModeEditOutline} from "react-icons/md";
import {useState} from "react";

export const PasswdTableRow = ({config, rowData, editOn, deleteOn, onDelete, onEdit}) => {
    const [data, setData] = useState(rowData);
    const [editMode, setEditMode] = useState(false);

    const handleCheckBox = (e, fieldName) => {
        const newData = {...data, [fieldName]: e.target.checked ? 1 : 0};
        setData(newData);
        onEdit(e, newData);
    }

    const handleText = (e, fieldName) => {
        const newData = {...data, [fieldName]: e.target.value};
        setData(newData);
        onEdit(e, newData);
    }

    const renderedCells = config.map(column => {
        if(editMode && column.type && column.field) {
            switch (column.type) {
                case "checkbox": {
                    return <td key={column.label} className="p-3">
                        <input type="checkbox" checked={data[column.field] !== 0} onChange={(e) => handleCheckBox(e, column.field)}/>
                    </td>;
                }
                case "text": {
                    return <td key={column.label} className="p-3">
                        <input type="text" className="form-control" value={data[column.field]} onChange={(e) => handleText(e, column.field)}/>
                    </td>;
                }
                default: break;
            }
        }

        return <td key={column.label} className="p-3">{column.render(rowData)}</td>;
    });

    return (<tr>
        {renderedCells}
        {(editOn || deleteOn) && <td>
            {editOn && <MdModeEditOutline className="cursor-pointer" style={{fontSize: "1.5rem"}}
                                          onClick={() => setEditMode(!editMode)}/>}
            {deleteOn && <MdDelete className="cursor-pointer" style={{fontSize: "1.5rem"}}
                                   onClick={() => onDelete(rowData.id)}/>}
        </td>}
    </tr>)
}
