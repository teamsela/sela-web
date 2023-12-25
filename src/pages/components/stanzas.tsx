

interface PoemViewProps {
    poemContent: string[][][];
    mode: string;
    fontSize: number;
}
export const PoemView: React.FC<PoemViewProps> = ({ poemContent, mode, fontSize }) => {
    //receive an array like [ [1., build,jerusalem,the,lord],[2., the, lord, is, powerful] ]
    //and parse it
    //group data into different poemParagraph here, by default one paragraph made with 3 lines
    //then render lines inside paragraph component
    //consider using grids when switching to structure: under structure, 3 paragraph=1 column

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
                                />
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
                                <PoemParagraph key={index} paragraphContent={content} color={"white"}/>
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
    paragraphContent: string[][];
    color: string;
}
export const PoemParagraph: React.FC<PoemParagraphProps> = ({ paragraphContent, color }) => {
    const componentStyle = {
        backgroundColor: color,
    }
    const poemStructure = (
            <>
            <div className="poemParagraph" style={componentStyle}>
                {paragraphContent.map((content, index) => (
                <PoemLine key={index} lineContent={content} />
                ))}
            </div>
        </>
    );
    return poemStructure;
};

interface PoemLineProps {
    lineContent:string[];
}
export const PoemLine:React.FC<PoemLineProps> = ( { lineContent } ) => {
    var poemStructure = (
        <>
            <div className="poemLine">
                {
                    lineContent.map((word,wordIndex) => (
                        <PoemWord key={wordIndex} color="black" backgroundColor="white" borderColour="grey" text={word}/>
                    ))
                }
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
}
const PoemWord: React.FC<PoemWordProps> = ({ color, backgroundColor, borderColour, text }) => {
    const componentStyle = {
        color: color,
        backgroundColor: backgroundColor,
        border: '3px solid ' + borderColour,
        padding:'0.25rem 1rem',
        borderRadius: '0.5rem',
        width:'fit-content',
    };

    const handleClick = () => {
        console.log(text);
    };
      
    const poemStructure = (
        <>
        <div className="poemWord" style={componentStyle} onClick={handleClick}>
            <p>{text}</p>
        </div>
        </>
    );
    return poemStructure;
};
