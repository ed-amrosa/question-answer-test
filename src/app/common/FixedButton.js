export default function FixedButton({isVisible, callback, iconComponent, label}) {

    return <div className={`fixed-button ${isVisible ? '' : 'hide'}`} onClick={callback}>
            {iconComponent} <label>{label}</label>
        </div>;
}

