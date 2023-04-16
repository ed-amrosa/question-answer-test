function Segment(props) {
    const { children, height, width } = props;
    return <div className="segment" style={{width: width, height: height}}>{children}</div>
}

export default Segment;