function RadioButton(props) {
    const {className, checked, value, onChange } = props;
    return <>
            <input type="radio" checked={checked} onChange={onChange}/>
            <label>{value}</label>
        </>
}

export default RadioButton;