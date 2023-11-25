import ButtonAppBar from "./AppBar";
import Toolbar from '@mui/material/Toolbar';
import { Undo, Redo } from '@mui/icons-material';


export default function Editor() {

    return (
        <div>
            <ButtonAppBar />
            <Toolbar className="flex-container">
                <button className="flex-items">
                    <Undo onClick={() => console.log("Undo")} />
                </button>
                <button className="flex-items">
                    <Redo onClick={() => console.log("Redo")} />
                </button>
            </Toolbar>

            <p>Editor</p>
        </div>
    )
}