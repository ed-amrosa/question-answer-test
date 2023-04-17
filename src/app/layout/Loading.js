import Loader from "./Loader"

const Loading = ({content}) => {
    return (
        <div className="container">
            <div className="loader-container">
                {content ? <div style={{margin: "12px", fontSize: "32px"}}>{content}</div> : null}
                <Loader/>
            </div>
        </div>
    );
}

export default Loading;