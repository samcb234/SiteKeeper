import '../../../../styles/BetslipMarksPreview.css'
export const MarksPreview: React.FC<{value: any}> = (props) => {

    const binary = (props.value).toString(2); // transform to binary
        let marks:number[] = Array(16 - binary.length); // create an array with the difference of bits
        let marksAsStr = "";
        marks = marks.fill(0, 0, 16 - binary.length); // fill array with 0s
        marksAsStr = marks.join("") + binary; // now add the binary
        marks = marksAsStr.split("").map((val: string) => {
            return parseInt(val, 10);
        }); // finally split it in an array and transform to ints
        
    return(
        <div className="container-fluid no-padding" key={props.value + "-id-container"}>
                <div className="row" key={props.value + "-id-row"}>
                    <div className="col-12 align-content-center slipid-content" key={props.value + "-id-col"}>
                        {marks.map((item:any, index:any) => {
                            const buffer = [];

                            if (item === 1) {
                                buffer.push(<div className="marks marked" key={props.value + "-marked"}></div>);
                            } else {
                                buffer.push(<div className="marks unmarked" key={props.value + "-unmarked"}></div>);
                            }

                            if (index === 7) {
                                buffer.push(<div className="space" key={props.value + "-space"}></div>);
                            }
                            return buffer;
                        })}
                    </div>
                </div>
                <div className="row" key={props.value + "-id-row2"}>
                    <div className="col-12 align-content-center slipid-content" id='slipId' key={props.value + "-id-col2"}>
                        <span key={props.value + "-val"} className="betslip-id-value" dangerouslySetInnerHTML={{ __html: props.value }} />
                    </div>
                </div>
            </div>
    )
}