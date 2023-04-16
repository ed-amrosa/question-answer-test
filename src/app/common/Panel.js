function Panel(props) {
    const { className, children } = props;
    
    return <div className={className}>{children}</div>;
}

export default Panel;