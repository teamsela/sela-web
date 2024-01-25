import { workerData } from "worker_threads";


interface PoemViewProps {
    poemContent: string[][][];
    mode: string;
    fontSize: number;
    
    bgColour:any;
    pickerStatus: boolean;

    wordStatus: boolean;
    setWordStatus:any;
}
export const PoemView: React.FC<PoemViewProps> = ({ poemContent, mode, fontSize, bgColour, pickerStatus, wordStatus,setWordStatus }) => {
    //receive an array like [ [1., build,jerusalem,the,lord],[2., the, lord, is, powerful] ]
    //and parse it
    //group data into different poemParagraph here, by default one paragraph made with 3 lines
    //then render lines inside paragraph component
    //consider using grids when switching to structure: under structure, 3 paragraph=1 column
    var pickerOn=pickerStatus;
    var background=bgColour;

    console.log(poemContent);
    const componentStyle = {
        fontSize: fontSize,
    }
    var poemStructure;
    switch(mode){
        case "structure":
            poemStructure = (
                <>
                    <div className="poemViewPort structure" style={componentStyle}>
                        {
                            poemContent.map((content, index) => (
                                <PoemParagraph 
                                    key={index} 
                                    paragraphContent={content} 
                                    color={
                                        index % 2 === 0 ? "white" : "#EFEFEF"
                                    }
                                >
                                    {content.map((lineContent, index) => (
                                        <PoemLine key={index} lineContent={lineContent}>
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
            )
            break;
        default:
            poemStructure = (
                <>
                    <div className="poemViewPort" style={componentStyle}>
                        {
                            poemContent.map((content, index) => (
                                <PoemParagraph key={index} paragraphContent={content} color={"white"}>
                                    {content.map((lineContent, index) => (
                                        <PoemLine key={index} lineContent={lineContent}>
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
            )
            break;
    }
    return poemStructure;
}


interface PoemParagraphProps {
    key: number;
    children: any;
    paragraphContent: string[][];
    color: string;
}
export const PoemParagraph: React.FC<PoemParagraphProps> = ({ key,children, paragraphContent, color }) => {
    const componentStyle = {
        backgroundColor: color,
    }
    const poemStructure = (
            <>
            <div key={key} className="poemParagraph" style={componentStyle}>
                {children}
            </div>
        </>
    );
    return poemStructure;
};

interface PoemLineProps {
    key: number;
    children:any;
    lineContent:string[];
}
export const PoemLine:React.FC<PoemLineProps> = ( { key, children, lineContent } ) => {
    var poemStructure = (
        <>
            <div key={key} className="poemLine">
                {children}
            </div>
        </>
    )
    return poemStructure;
}


interface PoemWordProps {
    color: string;
    backgroundColor: string;
    borderColour:string;
    text: string;

    wordStatus:boolean;
    setWordStatus: any;
}
const PoemWord: React.FC<PoemWordProps> = ({ color, backgroundColor, borderColour, text, wordStatus, setWordStatus }) => {
    const componentStyle = {
        color: color,
        backgroundColor: backgroundColor,
        border: '3px solid ' + borderColour,
        padding:'0.25rem 1rem',
        borderRadius: '0.5rem',
        width:'fit-content',
    };
    // console.log(setWordStatus);

    const handleClick = () => {
        console.log(text);
        console.log(wordStatus);
        if(wordStatus){
            wordStatus=false;
            setWordStatus(wordStatus);
        }
        else{
            wordStatus=true;
            setWordStatus(wordStatus);
        }
    };
      
    const poemStructure = (
        <>
        <div className="poemWord" style={componentStyle} onClick={handleClick}>
            <p
                style={
                    wordStatus ? {backgroundColor: 'rgba(0,0,0,0.25)'} : {backgroundColor: 'rgba(0,0,0,0)'}
                }
            >
                {text}
            </p>
        </div>
        </>
    );
    return poemStructure;
};
