import ButtonAppBar from "./AppBar";
import Toolbar from '@mui/material/Toolbar';
import { Undo, Redo } from '@mui/icons-material';
import Link from "next/link";

import { NavMain, NavTools, NavBasicTools } from "./components/Nav"
import { useState, useReducer } from "react";


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
        setColour((prevColour) => ({
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

    const [wordStatus, setWordStatus] = useState(false);
    const setNewWordStatus = (newState) => {
        setWordStatus(newState);
        console.log(wordStatus);
    }

    // console.log("colour is: " + colour.color.r);


    /*const poemTest = [
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
    ];*/

    const poemTest = {
        "verses": [
            {
                "text": "A Psalm",
                "chapter": "",
                "verse": "",
                "book": "psalm"
            },
            {
                "text": "of David",
                "chapter": "",
                "verse": "",
                "book": "psalm"
            },
            {
                "text": "1 Give",
                "chapter": "",
                "verse": "",
                "book": "psalm"
            },
            {
                "text": "unto Yahweh",
                "chapter": "",
                "verse": "",
                "book": "psalm"
            },
            {
                "text": "sons",
                "chapter": "",
                "verse": "",
                "book": "psalm"
            },
            {
                "text": "You mighty ones",
                "chapter": "",
                "verse": "",
                "book": "psalm"
            },
            {
                "text": "Give",
                "chapter": "",
                "verse": "",
                "book": "psalm"
            },
            {
                "text": "unto Yahweh",
                "chapter": "",
                "verse": "",
                "book": "psalm"
            },
            {
                "text": "glory",
                "chapter": "",
                "verse": "",
                "book": "psalm"
            },
            {
                "text": "and strength",
                "chapter": "",
                "verse": "",
                "book": "psalm"
            },
            {
                "text": "2 Give",
                "chapter": "",
                "verse": "",
                "book": "psalm"
            },
            {
                "text": "unto Yahweh",
                "chapter": "",
                "verse": "",
                "book": "psalm"
            },
            {
                "text": "The glory due to",
                "chapter": "",
                "verse": "",
                "book": "psalm"
            },
            {
                "text": "His name",
                "chapter": "",
                "verse": "",
                "book": "psalm"
            },
            {
                "text": "Worship",
                "chapter": "",
                "verse": "",
                "book": "psalm"
            },
            {
                "text": "Yahweh",
                "chapter": "",
                "verse": "",
                "book": "psalm"
            },
            {
                "text": "In the beauty",
                "chapter": "",
                "verse": "",
                "book": "psalm"
            },
            {
                "text": "of Holiness",
                "chapter": "",
                "verse": "",
                "book": "psalm"
            },
            {
                "text": "3 The voice",
                "chapter": "",
                "verse": "",
                "book": "psalm"
            },
            {
                "text": "of Yahweh",
                "chapter": "",
                "verse": "",
                "book": "psalm"
            },
            {
                "text": "[is] over",
                "chapter": "",
                "verse": "",
                "book": "psalm"
            },
            {
                "text": "the waters",
                "chapter": "",
                "verse": "",
                "book": "psalm"
            },
            {
                "text": "the God",
                "chapter": "",
                "verse": "",
                "book": "psalm"
            },
            {
                "text": "of glory",
                "chapter": "",
                "verse": "",
                "book": "psalm"
            },
            {
                "text": "thunders",
                "chapter": "",
                "verse": "",
                "book": "psalm"
            },
            {
                "text": "Yahweh [is]",
                "chapter": "",
                "verse": "",
                "book": "psalm"
            },
            {
                "text": "over",
                "chapter": "",
                "verse": "",
                "book": "psalm"
            },
            {
                "text": "waters",
                "chapter": "",
                "verse": "",
                "book": "psalm"
            },
            {
                "text": "many",
                "chapter": "",
                "verse": "",
                "book": "psalm"
            },
            {
                "text": "4 The voice",
                "chapter": "",
                "verse": "",
                "book": "psalm"
            },
            {
                "text": "of Yahweh",
                "chapter": "",
                "verse": "",
                "book": "psalm"
            },
            {
                "text": "[is] powerful",
                "chapter": "",
                "verse": "",
                "book": "psalm"
            },
            {
                "text": "The voice",
                "chapter": "",
                "verse": "",
                "book": "psalm"
            },
            {
                "text": "of Yahweh",
                "chapter": "",
                "verse": "",
                "book": "psalm"
            },
            {
                "text": "[is full] of majesty",
                "chapter": "",
                "verse": "",
                "book": "psalm"
            },
            {
                "text": "5 the voice",
                "chapter": "",
                "verse": "",
                "book": "psalm"
            },
            {
                "text": "of Yahweh",
                "chapter": "",
                "verse": "",
                "book": "psalm"
            },
            {
                "text": "breaks",
                "chapter": "",
                "verse": "",
                "book": "psalm"
            },
            {
                "text": "the cedars",
                "chapter": "",
                "verse": "",
                "book": "psalm"
            },
            {
                "text": "And yes splinters",
                "chapter": "",
                "verse": "",
                "book": "psalm"
            },
            {
                "text": "Yahweh",
                "chapter": "",
                "verse": "",
                "book": "psalm"
            },
            {
                "text": "-",
                "chapter": "",
                "verse": "",
                "book": "psalm"
            },
            {
                "text": "the cedars",
                "chapter": "",
                "verse": "",
                "book": "psalm"
            },
            {
                "text": "of lebanon",
                "chapter": "",
                "verse": "",
                "book": "psalm"
            }
        ]
    }

    const poemTest2 = [
        {
            id: 1,
            content: ["A Psalm", "of David"]
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
                wordStatus={wordStatus}
                setWordStatus={setNewWordStatus}
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


