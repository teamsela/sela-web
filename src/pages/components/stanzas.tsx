import React, { Component } from "react";

import { useEffect, useRef, useState } from "react";
import {
  Box,
  boxesIntersect,
  useSelectionContainer
} from "@air/react-drag-to-select";


interface PoemViewProps {
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

    colour_Bg: object;
    bgButtonClicked: boolean;
    // wordArrayAdd: Function;
}

export const PoemView: React.FC<PoemViewProps> = ({
    poemContent,
    mode,
    fontSize,
    bgColour,
    pickerStatus,
    wordStatus,
    setWordStatus,
    wordArray,
    updateNewArray,
    colour_Bg,
    bgButtonClicked,
}) => {
    var pickerOn = pickerStatus;
    var background = bgColour;

    const componentStyle = {
        fontSize: fontSize,
    };

    const [selectionBox, setSelectionBox] = useState<Box>();
    const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);
    const selectableItems = useRef<Box[]>([]);
    const elementsContainerRef = useRef<HTMLDivElement | null>(null);

    const { DragSelection } = useSelectionContainer({
    //   eventsElement: document.getElementById("root"),
      onSelectionChange: (box) => {
        /**
         * Here we make sure to adjust the box's left and top with the scroll position of the window
         * @see https://github.com/AirLabsTeam/react-drag-to-select/#scrolling
         */
        const scrollAwareBox: Box = {
          ...box,
          top: box.top + window.scrollY,
          left: box.left + window.scrollX
        };
        setSelectionBox(scrollAwareBox);

        //detecting if target is selected
        const indexesToSelect: number[] = [];
        selectableItems.current.forEach((item, index) => {
          if (boxesIntersect(scrollAwareBox, item)) {
            indexesToSelect.push(index);
            console.log(item);
          }
        });
        
        setSelectedIndexes(indexesToSelect);
      },
      onSelectionStart: () => {
        console.log("OnSelectionStart");
        console.log(selectableItems);
      },
      onSelectionEnd: () => console.log("OnSelectionEnd"),
      selectionProps: {
        style: {
          border: "2px dashed purple",
          borderRadius: 4,
          backgroundColor: "brown",
          opacity: 0.5
        }
      },
      isEnabled: true
    });

    useEffect(() => {
        console.log(elementsContainerRef.current);
        if (elementsContainerRef.current) {
          Array.from(elementsContainerRef.current.children).forEach((para) => {

            Array.from(para.children).forEach((line) => {
                Array.from(line.children).forEach((item) => {
                    console.log(item);
                    const { left, top, width, height } = item.getBoundingClientRect();
                    selectableItems.current.push({
                      left,
                      top,
                      width,
                      height
                    });
                })
            })

          });
        }
      }, []);

    var poemStructure;
    switch (mode) {
        case "structure":
            poemStructure = (
                <>
                    <DragSelection />
                    <div 
                        id="elements-container"
                        className="poemViewPort elements-container" 
                        style={componentStyle}
                        ref={elementsContainerRef}
                    >
                        {
                            poemContent.map((content, index) => (
                                <PoemParagraph
                                    key={index}
                                    color={index % 2 === 0 ? "white" : "#EFEFEF"}
                                >
                                    {content.map((lineContent, lineIndex) => (
                                        <PoemLine key={lineIndex}>
                                            {
                                                lineContent.map((word, wordIndex) => (
                                                    <PoemWord
                                                        num={wordIndex}
                                                        selectedIndexes={selectedIndexes}
                                                        color="black"
                                                        backgroundColor={colour_Bg}
                                                        borderColour="grey"
                                                        text={word}
                                                        wordStatus={wordStatus}
                                                        setWordStatus={setWordStatus}
                                                        wordArray={wordArray}
                                                        updateNewArray={updateNewArray}
                                                        bgButtonClicked={bgButtonClicked}
                                                    />
                                                )
                                                )
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
                    <DragSelection />
                    <div 
                        id="elements-container"
                        className="poemViewPort elements-container" 
                        style={componentStyle}
                        ref={elementsContainerRef}
                    >
                        {
                            poemContent.map((content, index) => (
                                <PoemParagraph key={index} color={"white"}>
                                    {content.map((lineContent, lineIndex) => (
                                        <PoemLine key={lineIndex}>
                                            {
                                                lineContent.map((word, wordIndex) => (
                                                    <PoemWord
                                                        num={wordIndex}
                                                        selectedIndexes={selectedIndexes}
                                                        color="black"
                                                        backgroundColor={colour_Bg}
                                                        borderColour="grey"
                                                        text={word}
                                                        wordStatus={wordStatus}
                                                        setWordStatus={setWordStatus}
                                                        wordArray={wordArray}
                                                        updateNewArray={updateNewArray}
                                                        bgButtonClicked={bgButtonClicked}
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

export default PoemView;


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
                <div 
                    key={key} 
                    className="poemParagraph" 
                    style={componentStyle}
                >
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
    backgroundColor: object;
    borderColour: string;
    text: string;
    wordStatus: boolean;
    setWordStatus: Function;
    wordArray: [];
    updateNewArray: Function;
    // wordArrayAdd: Function;
    bgButtonClicked:boolean;
    num: number;
    selectedIndexes:number[];
}

export class PoemWord extends Component<PoemWordProps> {

    setWordStatus:Function;
    updateNewArray:Function;
    constructor(props:any){
        super(props);
        this.setWordStatus=props.setWordStatus.bind(this);
        this.updateNewArray=props.updateNewArray.bind(this);
        this.state = {
            selected: props.wordStatus,
            colour_Bg: props.backgroundColor
        };
    }

    state = {
        selected: false,
        colour_Bg: {},
    };

    componentDidUpdate(prevProps) {
        // Update the internal state when the prop changes
        //to prevent selecting everything when clicking, but ensures that everything is deselected when clear all is clicked in Nav
        if (prevProps.wordStatus == true && this.props.wordStatus==false) {
            this.setState({
              selected: this.props.wordStatus,
            });
        }
        // if the colour of this word's state is different from backgroundColour AND picker button is clicked
        //ensures that colour changes only when the picker button is clicked
        if (this.state.colour_Bg !== this.props.backgroundColor && prevProps.bgButtonClicked != this.props.bgButtonClicked) {
            if(this.state.selected){
                console.log('colour change')
                console.log(this.props.bgButtonClicked);
                this.setState({ colour_Bg: this.props.backgroundColor });
                console.log(this.props.backgroundColor)
            }
        }
    }

    addToArray = (array:[], target) => {
        array.push(target);
        this.updateNewArray(array);
    }
    removeFromArray = (array:[], target) => {
        var removeTarget = array.indexOf(target);
        array.splice(removeTarget, 1);
        console.log(removeTarget);
        this.updateNewArray(array);
    }

    handleClick = () => {
        var { text, wordStatus } = this.props;
        if(this.state.selected){
            this.setState({ selected: false })
            this.removeFromArray(this.props.wordArray, this.props.text);
        }
        else{
            this.setState({ selected: true })
            this.addToArray(this.props.wordArray, this.props.text);
        }
        if(this.props.wordArray.length>0){
            this.setWordStatus(true);
        }
        else{
            this.setWordStatus(false);
        }
    };

    render() {
        const { color, borderColour, text, num, selectedIndexes } = this.props;
        // console.log(selectedIndexes);
        // console.log(num);
        const bgColourValue = `rgba(${this.state.colour_Bg.r}, ${this.state.colour_Bg.g}, ${this.state.colour_Bg.b}, ${this.state.colour_Bg.a})`
        const componentStyle = {
            color: color,
            backgroundColor: bgColourValue,
            border: '3px solid ' + borderColour,
            padding: '0.25rem 1rem',
            borderRadius: '0.5rem',
            width: 'fit-content',
        };

        return (
            <>
                <div 
                    key={num}
                    className={`poemWord element ${
                      selectedIndexes.includes(num) ? "selected" : ""
                    }`}
                    data-testid={`grid-cell-${num}`}
                    style={componentStyle} 
                    onClick={this.handleClick}
                >
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

