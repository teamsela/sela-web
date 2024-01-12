import ButtonAppBar from "./AppBar";
import Toolbar from '@mui/material/Toolbar';
import { Undo, Redo } from '@mui/icons-material';
import Link from "next/link";

import {NavMain,NavTools, NavBasicTools} from "./components/Nav"
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

    const [fontSize, setFontSize] = useState(16);
    const increaseFontSize = () => {
        setFontSize(prevSize => prevSize + 2);
    };
    const decreaseFontSize = () => {
        setFontSize(prevSize => prevSize - 2);
    };


    const [colour, setColour] = useState(
        {
            color: {
                r: '255',
                g: '255',
                b: '255',
                a: '1',
            },
        }
    );
    const setNewColour = (newColour) => {
        // setColour(newColour);
        setColour( (prevColour) => ({
                color: {
                    r: newColour.r,
                    g: newColour.g,
                    b: newColour.b,
                    a: newColour.a,
                },
            })
        )
        console.log(colour);
    }

    const [pickerStatus, setPickerStatus] = useState(false);
    const setNewPickerStatus = (newState) => {
        setPickerStatus(newState);
        console.log(pickerStatus);
    }

    // console.log("colour is: " + colour.color.r);


    const poemTest = [
        [["A Psalm","of David"]],
        [["1 Give", "unto Yahweh", "sons", "You mighty ones", "Give", "unto Yahweh", "glory", "and strength"]],
        [["2 Give", "unto Yahweh", "The glory due to", "His name", "Worship", "Yahweh", "In the beauty", "of Holiness"]],
        [["3 The voice", "of Yahweh", "[is] over", "the waters", "the God", "of glory", "thunders", "Yahweh [is]", "over", "waters", "many"]],
        [["4 The voice", "of Yahweh", "[is] powerful", "The voice", "of Yahweh", "[is full] of majesty"]],
        [["5 the voice", "of Yahweh", "breaks", "the cedars", "And yes splinters", "Yahweh", "-", "the cedars", "of lebanon",]],

        [["5 the voice", "of Yahweh", "breaks", "the cedars", "And yes splinters", "Yahweh", "-", "the cedars", "of lebanon",]],
        [["5 the voice", "of Yahweh", "breaks", "the cedars", "And yes splinters", "Yahweh", "-", "the cedars", "of lebanon",]],
        [["5 the voice", "of Yahweh", "breaks", "the cedars", "And yes splinters", "Yahweh", "-", "the cedars", "of lebanon",]],
        [["5 the voice", "of Yahweh", "breaks", "the cedars", "And yes splinters", "Yahweh", "-", "the cedars", "of lebanon",]],
        [["5 the voice", "of Yahweh", "breaks", "the cedars", "And yes splinters", "Yahweh", "-", "the cedars", "of lebanon",]],
        [["5 the voice", "of Yahweh", "breaks", "the cedars", "And yes splinters", "Yahweh", "-", "the cedars", "of lebanon",]],
        [["5 the voice", "of Yahweh", "breaks", "the cedars", "And yes splinters", "Yahweh", "-", "the cedars", "of lebanon",]],
        [["5 the voice", "of Yahweh", "breaks", "the cedars", "And yes splinters", "Yahweh", "-", "the cedars", "of lebanon",]],
        [["5 the voice", "of Yahweh", "breaks", "the cedars", "And yes splinters", "Yahweh", "-", "the cedars", "of lebanon",]],
        [["5 the voice", "of Yahweh", "breaks", "the cedars", "And yes splinters", "Yahweh", "-", "the cedars", "of lebanon",]],
    ];
    
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
            <NavTools 
                selectedButton={selectedButton} 
                poem={poemTest} 
                fontSize={fontSize} 
                onFontSizeUp={increaseFontSize} 
                onFontSizeDown={decreaseFontSize}
                color={colour.color}
                setNewColour={setNewColour}
                pickerStatus={pickerStatus}
                setPickerStatus={setNewPickerStatus}
            />
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


