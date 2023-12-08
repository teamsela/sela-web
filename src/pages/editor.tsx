import ButtonAppBar from "./AppBar";
import Toolbar from '@mui/material/Toolbar';
import { Undo, Redo } from '@mui/icons-material';
import Link from "next/link";

import {NavMain,NavTools} from "./components/Nav"
import { useState,useReducer } from "react";

export default function Editor() {

    const [language, setLanguage] = useState("ENG");
    const handleLanguageChange = () => {
      setLanguage((prevLanguage) => (prevLanguage === "ENG" ? "HEB" : "ENG"));
      console.log(language);
    };

    const [selectedButton, setSelectedButton] = useState("default");
    const handleSelectButton = (button) => {
      setSelectedButton(button);
      console.log(selectedButton);
    };

    return (
        <div>
            <NavMain 
                onLanguageChange={handleLanguageChange}
                selectedButton={selectedButton}
                onSelectButton={handleSelectButton}
            />
            <NavTools selectedButton={selectedButton}/>
            {/* <ButtonAppBar /> */}
            <Toolbar className="flex-container">
                <Link href="/">home</Link>
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