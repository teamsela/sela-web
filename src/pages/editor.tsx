import ButtonAppBar from "./AppBar";
import Toolbar from '@mui/material/Toolbar';
import { Undo, Redo } from '@mui/icons-material';
import Link from "next/link";

import {NavMain,NavTools} from "./components/Nav"
import { useState,useReducer } from "react";


import { PoemView } from "./components/stanzas"

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

    const poemTest = [
        [["A Psalm","of David"]],
        [["1 Give", "unto Yahweh", "sons", "You mighty ones"], ["Give", "unto Yahweh", "glory", "and strength"]],
        [["2 Give", "unto Yahweh", "The glory due to", "His name"], ["Worship", "Yahweh", "In the beauty", "of Holiness"]],
        [["3 The voice", "of Yahweh", "[is] over", "the waters"], ["the God", "of glory", "thunders"], ["Yahweh [is]", "over", "waters", "many"]],];
    
    const poemTest2 = [
        { 
            id: 1, 
            content: ["A Psalm","of David"] 
        },
        { id: 2, name: 'Item 2' },
        { id: 3, name: 'Item 3' },
    ];
    return (
        <div>
            <NavMain 
                onLanguageChange={handleLanguageChange}
                selectedButton={selectedButton}
                onSelectButton={handleSelectButton}
            />
            <NavTools selectedButton={selectedButton} poem={poemTest}/>
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

            {/* <PoemView /> */}
            <p>Editor</p>
        </div>
    )
}