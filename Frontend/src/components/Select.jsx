export default function Select ({children, name, label, nameSelect }) {
    return ( 
        <>
            <label htmlFor={name}>{label}:
                <select className="form-select" name={name} id={name+nameSelect}>
                    {children}
                </select>
            </label>
        </> 
    );
}
