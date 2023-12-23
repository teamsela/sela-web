


export const PoemView = ({poemContent}) => {
    //receive an array like [ [1., build,jerusalem,the,lord],[2., the, lord, is, powerful] ]
    //and parse it?
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

export const PoemParagraph = ({paragraphContent}) => {

    var poemStructure = (
        <>
            <div className="poemParagraph">
                
                {
                    paragraphContent.map((line,lineIndex) => (
                        <PoemLine key={lineIndex} lineContent={line} />
                    ))
                }

            </div>
        </>
    )
    return poemStructure;
}

export const PoemLine = ({lineContent}) => {

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


// export const PoemWord = (textColour:string, backgroundColour:string, borderColour:string, text:string) => {
// export const PoemWord = ({text}) => {
//     const word=text;
//     const componentStyle = {
//         color: 'red',
//         backgroundColor: 'blue',
//         border: '1px solid black',
//       };
//     var poemStructure = (
//         <>
//             <div className="wordBlock" style={componentStyle}>
//                 <p>{word}</p>
//             </div>
//         </>
//     )
//     return poemStructure;
// }