function GridColumn(props) {
    const { width, children } = props;
    const columnWidth = width ? width : '100%'
    return <div className="column" style={{width: columnWidth}}>{children}</div>;
}

export default GridColumn;