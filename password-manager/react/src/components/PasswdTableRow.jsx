import {MdDelete, MdModeEditOutline} from "react-icons/md";
import {useState} from "react";

export const PasswdTableRow = ({config, rowData, editOn, deleteOn, onDelete, onEdit}) => {

    const [editMode, setEditMode] = useState(false);

    const renderedCells = config.map(column => {
        if(editMode && column.type && column.value) {
            switch (column.type) {
                case "checkbox": {
                    return <td key={column.label} className="p-3">
                        <input type="checkbox" checked={column.value(rowData)} onChange={(e) => onEdit(e, rowData.id)}/>
                    </td>;
                }
                case "text": {
                    return <td key={column.label} className="p-3">
                        <input type="text" className="form-control" defaultValue={column.value(rowData)} onBlur={(e) => onEdit(e, rowData.id)}/>
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
