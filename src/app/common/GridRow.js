function GridRow(props) {
    const { height, children } = props;
    const rowHeight = height ? height : '100%'
    return <div className="row" style={{height: rowHeight}}>{children}</div>;
}

export default GridRow;