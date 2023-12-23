

interface PoemViewProps {
    poemContent: string[][][];
}
export const PoemView: React.FC<PoemViewProps> = ({ poemContent }) => {
    //receive an array like [ [1., build,jerusalem,the,lord],[2., the, lord, is, powerful] ]
    //and parse it
    console.log(poemContent);
    var poemStructure = (
        <>
            <div className="poemViewPort">
                {
                    poemContent.map((paragraph, paraIndex) => (
                        <PoemParagraph key={paraIndex} paragraphContent={paragraph}/>
                    ))
                }
            </div>
        </>
    )
    return poemStructure;
}


interface PoemParagraphProps {
    paragraphContent: string[][];
}
export const PoemParagraph: React.FC<PoemParagraphProps> = ({ paragraphContent }) => {
    const poemStructure = (
        <>
        <div className="poemParagraph">
            {paragraphContent.map((line, lineIndex) => (
            <PoemLine key={lineIndex} lineContent={line} />
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
