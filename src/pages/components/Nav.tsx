// import styles from './styles/nav.module.css'
import { useReducer } from "react";
import Button from '@mui/material/Button';
import { Undo, Redo } from '@mui/icons-material';

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
    // var langSet="ENG";
    const initState = {
        eng:true,
        heb:false,
    }
    const [currentPage, setPage] = useReducer(setLang, initState);
    //switchLang() is just changing the style of the button
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
    var homelink;
    // if(props.homelink!=null){
    //     homelink=props.homelink;
    // }
    // else{
    //     homelink="/"
    // }
    const initState = {
        default:true,
        structure:false,
    }
    const [currentPage, setPage] = useReducer(setNavMainUI, initState);

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
                    <button className={currentPage.default ? "selected" : ""} onClick={ () => { setPage("default") }}>Default</button>
                    <button className={currentPage.structure ? "selected" : ""} onClick={ () => { setPage("structure") } }>Structure</button>
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
