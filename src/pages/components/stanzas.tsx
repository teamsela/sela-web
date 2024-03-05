import React, { Component, useCallback, useEffect, useRef, useState } from "react";
import {
    boxesIntersect,
    SelectionBox,
    useSelectionContainer
} from "@air/react-drag-to-select";

import { getRangeBetween, updateArray } from "../utils";
/*interface PoemViewProps {
    poemContent: string[][][];
    mode: string;
    fontSize: number;
    bgColour: any;
    pickerStatus: boolean;
    wordStatus: boolean;
    setWordStatus: Function;

    wordArray: [];
    updateNewArray: Function;
    childState: any;
    // wordArrayAdd: Function;
}

export class PoemView extends Component<PoemViewProps> {
    render() {
        const { poemContent, mode, fontSize, bgColour, pickerStatus, wordStatus, setWordStatus, wordArray, updateNewArray} = this.props;

        var pickerOn = pickerStatus;
        var background = bgColour;

        // console.log(poemContent);
        const componentStyle = {
            fontSize: fontSize,
        };
        var poemStructure;
        switch (mode) {
            case "structure":
                poemStructure = (
                    <>
                        <div className="poemViewPort" style={componentStyle}>
                            {
                                poemContent.map((content, index) => (
                                    <PoemParagraph
                                        key={index}
                                        color={index % 2 === 0 ? "white" : "#EFEFEF"}
                                    >
                                        {content.map((lineContent, index) => (
                                            <PoemLine key={index}>
                                                {
                                                    lineContent.map((word,wordIndex) => (
                                                        <PoemWord 
                                                            key={wordIndex} 
                                                            color="black" 
                                                            backgroundColor="white" 
                                                            borderColour="grey" 
                                                            text={word} 
                                                            wordStatus={wordStatus} 
                                                            setWordStatus={setWordStatus} 
                                                            wordArray={wordArray}
                                                            updateNewArray={updateNewArray}
                                                            // wordArrayAdd={wordArrayAdd}
                                                        />
                                                    ))
                                                }
                                            </PoemLine>
                                        ))}
                                    </PoemParagraph>
                                ))
                            }
                        </div>
                    </>
                );
                break;
            default:
                poemStructure = (
                    <>
                        <div className="poemViewPort" style={componentStyle}>
                            {
                                poemContent.map((content, index) => (
                                    <PoemParagraph key={index} color={"white"}>
                                        {content.map((lineContent, index) => (
                                            <PoemLine key={index}>
                                                {
                                                    lineContent.map((word,wordIndex) => (
                                                        <PoemWord 
                                                            key={wordIndex} 
                                                            color="black" 
                                                            backgroundColor="white" 
                                                            borderColour="grey" 
                                                            text={word} 
                                                            wordStatus={wordStatus} 
                                                            setWordStatus={setWordStatus} 
                                                            wordArray={wordArray}
                                                            updateNewArray={updateNewArray}
                                                            // wordArrayAdd={wordArrayAdd}
                                                        />
                                                    ))
                                                }
                                            </PoemLine>
                                        ))}
                                    </PoemParagraph>
                                ))
                            }
                        </div>
                    </>
                );
                break;
        }
        return poemStructure;
    }
}*/

interface PoemParagraphProps {
    key: number;
    children: any;
    // paragraphContent: string[][];
    color: string;
    // wordStatus: boolean;
    // setWordStatus: any;
}

export class PoemParagraph extends Component<PoemParagraphProps> {
    render() {
        const { key, children, color } = this.props;
        const componentStyle = {
            backgroundColor: color,
        };
        return (
            <>
                <div key={key} className="poemParagraph" style={componentStyle}>
                    {children}
                </div>
            </>
        );
    }
}

interface PoemLineProps {
    key: number;
    children: any;
    // lineContent: string[];
    // wordStatus: boolean;
    // setWordStatus: any;
}

export class PoemLine extends Component<PoemLineProps> {
    render() {
        const { key, children } = this.props;
        return (
            <>
                <div key={key} className="poemLine">
                    {children}
                </div>
            </>
        );
    }
}

interface PoemWordProps {
    color: string;
    backgroundColor: string;
    borderColour: string;
    text: string;
    wordStatus: boolean;
    setWordStatus: Function;
    wordArray: [];
    updateNewArray: Function;
    // wordArrayAdd: Function;
}

export class PoemWord extends Component<PoemWordProps> {

    setWordStatus: Function;
    updateNewArray: Function;
    // wordArrayAdd;
    constructor(props: any) {
        super(props);
        this.setWordStatus = props.setWordStatus.bind(this);
        this.updateNewArray = props.updateNewArray.bind(this);
        // if(!this.props.wordStatus){
        //     this.state.selected=false;
        // }
        // console.log('renders')
        this.state = {
            selected: props.wordStatus,
        };
    }

    state = {
        selected: false,
    };

    componentDidUpdate(prevProps) {
        // Update the internal state when the prop changes
        //to prevent selecting everything when clicking, but ensures that everything is deselected when clear all is clicked in Nav
        if (prevProps.wordStatus == true && this.props.wordStatus == false) {
            this.setState({
                selected: this.props.wordStatus,
            });
        }
        // if (this.props.wordStatus !== prevProps.wordStatus) {
        //   this.setState({
        //     selected: this.props.wordStatus,
        //   });
        // }
    }

    addToArray = (array: [], target) => {
        array.push(target);
        this.updateNewArray(array);
    }
    removeFromArray = (array: [], target) => {
        var removeTarget = array.indexOf(target);
        array.splice(removeTarget, 1);
        console.log(removeTarget);
        this.updateNewArray(array);
    }

    handleClick = () => {
        var { text, wordStatus } = this.props;
        if (this.state.selected) {
            this.setState({ selected: false })
            this.removeFromArray(this.props.wordArray, this.props.text);
            console.log("removed " + this.props.text);
        }
        else {
            this.setState({ selected: true })
            this.addToArray(this.props.wordArray, this.props.text);
            console.log("added " + this.props.text);
        }

        // console.log(text);
        // console.log(wordStatus);
        console.log(this.props.wordArray);
        console.log("arr len: " + this.props.wordArray.length);

        if (this.props.wordArray.length > 0) {
            this.setWordStatus(true);
        }
        else {
            this.setWordStatus(false);
            // this.state.selected=false;
        }
    };

    render() {
        const { color, backgroundColor, borderColour, text, wordStatus } = this.props;
        const componentStyle = {
            color: color,
            backgroundColor: backgroundColor,
            border: '3px solid ' + borderColour,
            padding: '0.25rem 1rem',
            borderRadius: '0.5rem',
            width: 'fit-content',
        };

        return (
            <>
                <div className="poemWord" style={componentStyle} onClick={this.handleClick}>
                    <p
                        style={this.state.selected ? { backgroundColor: 'rgba(0,0,0,0.25)' } : { backgroundColor: 'rgba(0,0,0,0)' }}
                    >
                        {text}
                    </p>
                </div>
            </>
        );
    }
}

type KeyICareAbout = "SHIFT" | "CTRL";
type DragType = "NORMAL" | KeyICareAbout;

// Don't look in here, seriously.
const MouseSelection = React.memo(
    ({ eventsElement, onSelectionChange, onSelectionEnd }: any) => {
        const selection = useRef({} as SelectionBox);
        const dragType = useRef<DragType>("NORMAL");
        const keysDown = useRef<KeyICareAbout[]>([]);

        // OK, so this code has made me wary of using this library.
        // It would be infinitely easier to check for a modifier key
        // on the click event that started the drag, instead of this
        // keydown tracking.  Maybe we can fork it.
        useEffect(() => {
            const keyDownListener = (e: KeyboardEvent) => {
                if (e.shiftKey) {
                    if (!keysDown.current.includes("SHIFT")) {
                        keysDown.current.push("SHIFT");
                    }
                }
                if (e.ctrlKey || e.metaKey) {
                    if (!keysDown.current.includes("CTRL")) {
                        keysDown.current.push("CTRL");
                    }
                }
            };
            const keyUpListener = (e: KeyboardEvent) => {
                if (e.key === "Shift") {
                    keysDown.current = keysDown.current.filter((key) => key !== "SHIFT");
                }
                if (e.key === "Meta" || e.key === "Control") {
                    keysDown.current = keysDown.current.filter((key) => key !== "CTRL");
                }
            };

            document.addEventListener("keydown", keyDownListener);
            document.addEventListener("keyup", keyUpListener);

            return () => {
                document.removeEventListener("keydown", keyDownListener);
                document.removeEventListener("keyup", keyUpListener);
            };
        }, []);

        const { DragSelection } = useSelectionContainer({
            onSelectionChange: (box) => {
                selection.current = box;
                onSelectionChange(box, dragType.current);
            },
            onSelectionStart: () => {
                if (keysDown.current.includes("SHIFT")) {
                    dragType.current = "SHIFT";
                } else if (keysDown.current.includes("CTRL")) {
                    dragType.current = "CTRL";
                } else {
                    dragType.current = "NORMAL";
                }
            },
            onSelectionEnd: () => {
                if (selection.current?.height >= 5) {
                    onSelectionEnd(selection.current, dragType.current);
                    selection.current = {} as SelectionBox;
                }
            },
            eventsElement
        });

        return <DragSelection />;
    }
);

const PoemView = ({ poemContent, mode, fontSize, bgColour, pickerStatus, wordStatus, setWordStatus, wordArray, updateNewArray }) => {

    const elementsContainer = useRef<HTMLDivElement>();
    const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);

    // for the love of all that is holy don't reuse any of this.
    const focusedItem = useRef<number>();
    const prevFocusedItem = useRef<number>();
    const handleSelectionChange = useCallback((box) => {
        // setSelectionBox(box);
    }, []);

    const handleSelectionEnd = useCallback(
        (box: SelectionBox, dragType: DragType) => {
            let indexesToSelect = dragType === "CTRL" ? selectedIndexes.slice() : [];
            const elementsContainer = document.getElementById("elements-container");
            if (elementsContainer) {
                let firstItem = true;
                let toggleOn = true;
                Array.from(elementsContainer.childNodes).forEach((item, index) => {
                    const boundingBox = (item as Element).getBoundingClientRect();
                    if (boxesIntersect(box, boundingBox)) {
                        if (dragType === "CTRL") {
                            if (firstItem) {
                                firstItem = false;
                                toggleOn = !indexesToSelect.includes(index);
                            }
                            if (toggleOn) {
                                indexesToSelect.push(index);
                            } else {
                                indexesToSelect = indexesToSelect.filter(
                                    (idx) => idx !== index
                                );
                            }
                        } else {
                            indexesToSelect.push(index);
                        }
                    }
                });
            }
            setSelectedIndexes(indexesToSelect);
        },
        [selectedIndexes]
    );

    const toggleSelected = (index: number) => {
        if (selectedIndexes.includes(index)) {
            setSelectedIndexes(selectedIndexes.filter((idx) => idx !== index));
            return;
        }
        setSelectedIndexes([...selectedIndexes, index]);
    };


    const get1DIndex = (x: number, y: number, z: number) => {
        let index = 0;
        const numColumns = poemContent[0][0].length;
        const numRows = poemContent[0].length;

        for (let row = 0; row < x; row++) {
            for (let col = 0; col < numRows; col++) {
                index += poemContent[row][col].length;
            }
        }

        for (let col = 0; col < y; col++) {
            index += poemContent[x][col].length;
        }

        index += z;
        return index;
    }

    return (
        <div className="container">
            <MouseSelection
                onSelectionChange={handleSelectionChange}
                onSelectionEnd={handleSelectionEnd}
                eventsElement={elementsContainer.current}
            />
            <h1>Drag to Select Demo</h1>
            <div className="componentsGrid">
                <div style={{ width: "fit-content" }}>
                    <div
                        ref={elementsContainer as React.RefObject<HTMLDivElement>}
                        style={{
                            border: "1px solid darkgray",
                            padding: "25px",
                            position: "relative"
                        }}
                    >
                        <div id="elements-container" className="elements-container">
                            {poemContent.map((content, index) => (
                                <PoemParagraph key={index} color={"white"}>
                                    {content.map((lineContent, contentIndex) => (
                                        <PoemLine key={contentIndex}>
                                            {lineContent.map((word, wordIndex) => {
                                                const flatIndex = get1DIndex(index, contentIndex, wordIndex);
                                                return(
                                                <div
                                                    tabIndex={0}
                                                    onClick={(e) => {
                                                        if (e.shiftKey && prevFocusedItem.current !== undefined) {
                                                            const willSelect = selectedIndexes.includes(
                                                                prevFocusedItem.current
                                                            );
                                                            const range = getRangeBetween(prevFocusedItem.current, flatIndex);
                                                            console.log(range);
                                                            setSelectedIndexes(
                                                                updateArray(selectedIndexes, range, willSelect)
                                                            );
                                                            return;
                                                        }
                                                        toggleSelected(flatIndex);
                                                    }}
                                                    onFocus={() => {
                                                        focusedItem.current = flatIndex;
                                                    }}
                                                    onBlur={() => {
                                                        if (focusedItem.current === flatIndex) {
                                                            prevFocusedItem.current = flatIndex;
                                                            focusedItem.current = undefined;
                                                        }
                                                    }}
                                                    key={flatIndex}
                                                    className={`element ${selectedIndexes.includes(flatIndex) ? "selected" : ""
                                                        } `}
                                                >
                                                    {word}
                                                </div>
                                                )
                                            })
                                            }
                                        </PoemLine>
                                    ))}


                                </PoemParagraph>
                            ))}


                        </div>
                    </div>
                    <div className="multiControls">
                        <a
                            href=" #"
                            onClick={() => {
                                setSelectedIndexes([]);
                            }}
                        >
                            Clear All
                        </a>
                    </div>
                    <div>
            {selectedIndexes.sort().map((i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>
                </div>
            </div>
        </div>
    );
};

export default PoemView;


