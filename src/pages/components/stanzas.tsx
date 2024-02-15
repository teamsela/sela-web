import React, { Component } from "react";

interface PoemViewProps {
    poemContent: string[][][];
    mode: string;
    fontSize: number;
    bgColour: any;
    pickerStatus: boolean;
    wordStatus: boolean;
    setWordStatus: Function;

    wordArray: [];
    updateNewArray:Function;
    childState:any;

    colour_Bg:object;
    // wordArrayAdd: Function;
}

export class PoemView extends Component<PoemViewProps> {
    render() {
        const { poemContent, mode, fontSize, bgColour, pickerStatus, wordStatus, setWordStatus, wordArray, updateNewArray, colour_Bg} = this.props;

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
                                                            backgroundColor={colour_Bg} 
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
                                                            backgroundColor={colour_Bg} 
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
}

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
    backgroundColor: object;
    borderColour: string;
    text: string;
    wordStatus: boolean;
    setWordStatus: Function;
    wordArray: [];
    updateNewArray: Function;
    // wordArrayAdd: Function;
}

export class PoemWord extends Component<PoemWordProps> {

    setWordStatus:Function;
    updateNewArray:Function;
    // wordArrayAdd;
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
        if (this.state.colour_Bg  !== this.props.backgroundColor) {
            if(this.state.selected){
                console.log('colour change')
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
            // console.log("removed "+this.props.text);
        }
        else{
            this.setState({ selected: true })
            this.addToArray(this.props.wordArray, this.props.text);
            // console.log("added "+this.props.text);
        }
        // console.log(this.props.wordArray);
        // console.log("arr len: "+this.props.wordArray.length);
        if(this.props.wordArray.length>0){
            this.setWordStatus(true);
        }
        else{
            this.setWordStatus(false);
        }
    };

    render() {
        const { color, borderColour, text } = this.props;
        
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

