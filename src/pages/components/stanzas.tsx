import React, { Component, useCallback, useEffect, useRef, useState } from "react";
import {
    boxesIntersect,
    SelectionBox,
    useSelectionContainer,
    Box,
} from "@air/react-drag-to-select";

import { getRangeBetween, updateArray } from "../utils";

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

interface Verse {
    verse: string;
    text: string,
    chapter: string,
    book: string
}

interface VersesJSON {
    verses: Verse[];
}

const PoemView = ({ poemContent, mode, fontSize, bgColour, pickerStatus, wordStatus, setWordStatus, wordArray, updateNewArray }) => {

    const [selectionBox, setSelectionBox] = useState<Box>();
    const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);
    const elementsContainerRef = useRef<HTMLDivElement | null>(null);
    const elementsContainer = useRef<HTMLDivElement>();

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



    return (
        <div className="container">
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
                        <div id="elements-container" className="elements-container" ref={elementsContainerRef}
                        >
                            {poemContent.verses.map((content: Verse, index: number) => (
                                <div
                                    tabIndex={0}
                                    onClick={(e) => {
                                        if (e.shiftKey && prevFocusedItem.current !== undefined) {
                                            const willSelect = selectedIndexes.includes(
                                                prevFocusedItem.current
                                            );
                                            const range = getRangeBetween(prevFocusedItem.current, index);
                                            setSelectedIndexes(
                                                updateArray(selectedIndexes, range, willSelect)
                                            );
                                            return;
                                        }
                                        toggleSelected(index);
                                    }}
                                    onFocus={() => {
                                        focusedItem.current = index;
                                    }}
                                    onBlur={() => {
                                        if (focusedItem.current === index) {
                                            prevFocusedItem.current = index;
                                            focusedItem.current = undefined;
                                        }
                                    }}
                                    key={index}
                                    className={`element ${selectedIndexes.includes(index) ? "selected" : ""
                                        } `}
                                >
                                    {content.text}
                                </div>
                            ))}
                        </div>
                        <MouseSelection
                            onSelectionChange={handleSelectionChange}
                            onSelectionEnd={handleSelectionEnd}
                            eventsElement={elementsContainer.current}
                        />
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
                </div>
            </div>
        </div>
    );
};

export default PoemView;


