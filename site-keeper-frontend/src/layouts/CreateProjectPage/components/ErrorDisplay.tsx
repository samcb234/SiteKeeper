export const ErrorDisplay: React.FC<{error: string}> = (props) =>{
    return(
        <>
        {props.error !== '' ?
        <p className="text-danger">{props.error}</p>
    :
    <></>}
        </>
    )
}