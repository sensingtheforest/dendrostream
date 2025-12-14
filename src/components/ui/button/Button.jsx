// import globalStylesheet from '../../../myStyles';

export default function Button({ children, onClick, hasTitle, title, style }) {
    // Properties ----------------------------------
    // Hooks ---------------------------------------
    // Context -------------------------------------
    // Methods -------------------------------------
    // View ----------------------------------------
    return (
        <button type='button' className='btn btn-lg btn-outline-primary m-2' style={{ ...style, height: '100%' }} onClick={onClick}>
            {children}
            {
                hasTitle 
                    &&  <p className='Title' style={{ margin: 0 }}>
                            {title}
                        </p>
            }
        </button>
    );
}

function AddNew({ onClick, hasTitle=false, title }) {
    return (
        <Button onClick={onClick} hasTitle={hasTitle} title={title}>
            {/* <Icon.Add /> */}
        </Button>
    );
}

Button.AddNew = AddNew;