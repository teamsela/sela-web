import React, { Component } from "react";

interface PoemViewProps {
    poemContent: string[][][];
    mode: string;
    fontSize: number;
    bgColour: any;
    pickerStatus: boolean;
    wordStatus: boolean;
    setWordStatus: any;
}

export class PoemView extends Component<PoemViewProps> {
    render() {
        const { poemContent, mode, fontSize, bgColour, pickerStatus, wordStatus, setWordStatus } = this.props;

        var pickerOn = pickerStatus;
        var background = bgColour;

        console.log(poemContent);
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
                                                        <PoemWord key={wordIndex} color="black" backgroundColor="white" borderColour="grey" text={word} wordStatus={wordStatus} setWordStatus={setWordStatus}/>
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
                                                        <PoemWord key={wordIndex} color="black" backgroundColor="white" borderColour="grey" text={word} wordStatus={wordStatus} setWordStatus={setWordStatus}/>
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
    backgroundColor: string;
    borderColour: string;
    text: string;
    wordStatus: boolean;
    setWordStatus: any;
}

export class PoemWord extends Component<PoemWordProps> {

    state = {
        selected: false,
    };
    handleClick = () => {
        var { text, wordStatus, setWordStatus } = this.props;
        console.log(text);
        console.log(wordStatus);
        // setWordStatus(!wordStatus);
        if(this.state.selected){
            this.setState({ selected: false })
        }
        else{
            this.setState({ selected: true })
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

