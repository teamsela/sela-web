// import styles from './styles/nav.module.css'
import { useReducer } from "react";
import Button from '@mui/material/Button';
import { Undo, Redo } from '@mui/icons-material';
import Link from "next/link";

import { PoemView } from "./stanzas"


function setLang(currentPage,setPage){
    switch(setPage){
        case "ENG":
            return {
                eng:true,
                heb:false,
            };
        case "HEB":
            return {
                eng:false,
                heb:true,
            };
        default:
            return currentPage;
    }
}
const NavMainLang = ({onLanguageChange}) => {
    //onLanguageChange function detects changes in language and indicates the main app in editor.tsx, so changes could be applied to real contents
    const initState = {
        eng:true,
        heb:false,
    }
    const [currentPage, setPage] = useReducer(setLang, initState);
    //switchLang() is just changing the style of the button
    //change style part could use some improvement, see NavMain buttons
    function switchLang(lang){
        setPage(lang);
        if(lang=="ENG"){
            console.log("ENG")
        }
        else{
            console.log("HEB")
        }
    }
    var langSwitch = (
        <button className="lang" onClick={ () => { onLanguageChange; switchLang(currentPage.eng ? "HEB" : "ENG"); } }>
            <p className={currentPage.eng ? "selected" : ""}>ENG</p>
            <p className={currentPage.heb ? "selected" : ""}>HEB</p>
        </button>
    );

    return langSwitch;
}
function setNavMainUI(currentPage,setPage){
    switch(setPage){
        case "default":
            return {
                default:true,
                structure:false,
            };
        case "structure":
            return {
                default:false,
                structure:true,
            };
        default:
            return currentPage;
    }
}
export const NavMain = ({ onLanguageChange, selectedButton, onSelectButton }) => {
    var navStructure;
    navStructure=(
        <>
        <nav className="navMain nav">
            <div className="navGroupMain left">
                <NavMainLang onLanguageChange={onLanguageChange} lang="ENG"/>
                <div className="chapter">
                {/* https://www.simplilearn.com/tutorials/reactjs-tutorial/how-to-create-functional-react-dropdown-menu */}
                    <select>
                        <option value="Pslam 29">Pslam 29</option>
                        <option value="Pslam 30">Pslam 30</option>
                        <option value="Pslam 31">Pslam 31</option>
                    </select>
                </div>
                <nav className="navOptions">
                    <button className={selectedButton === "default" ? "selected" : ""} onClick={ () => { onSelectButton("default") }}>Default</button>
                    <button className={selectedButton === "structure" ? "selected" : ""} onClick={ () => { onSelectButton("structure") } }>Structure</button>
                    <button>Motif</button>
                    <button >Syntax</button>
                    <button>Sounds</button>
                </nav>
            </div>
            <div className='navGroupMain right'>
                <Button color="inherit">Login</Button>
                <img className="logo" src="/img/selaLogo.png"/>
            </div>
        </nav>
        </>
    )
    return navStructure;
}


export const NavTools = ( {selectedButton, poem} ) => {
    //adjust right side buttons on the secondary nav based on which page the user is in
    var navStanzaEdit;
    switch (selectedButton) {
        case "default":
            navStanzaEdit = (
                <div></div>
            );
          break;
        case "structure":
            navStanzaEdit = (
                <div className="stanzaEdit">
                    <NavToolsButton title="New Stanza"/>
                    <NavToolsButton title="New Strophe"/>
                    <NavToolsButton title="Move Up"/>
                    <NavToolsButton title="Move Down"/>
                    <NavToolsButton title="Indent"/>
                    <NavToolsButton title="Block Size"/>
                </div>
            );
          break;
        default:
            navStanzaEdit = (
                <div></div>
            );
      }
    var navStructure = (
        <>
            <nav className="navTools nav">
                <NavBasicTools />
                {navStanzaEdit}
            </nav>

            <PoemView poemContent={poem} />
        </>
    )
    return navStructure;
}

const NavBasicTools = () => {
    return (
        <div className="basicTools">
            <div>
                <Link href="/">home</Link>
                <button className="flex-items">
                    <Undo onClick={() => console.log("Undo")} />
                </button>
                <button className="flex-items">
                    <Redo onClick={() => console.log("Redo")} />
                </button>
            </div>
            <div>
                <img src="/img/navTools/zoomin.png" />
            </div>
            <div>
                <img src="/img/navTools/bg.png" />
                <img src="/img/navTools/border.png" />
                <img src="/img/navTools/text.png" />
            </div>
        </div>
    )
}

const NavToolsButton = (props) => {
    return (
        <button className="">{props.title}</button>
    );
}