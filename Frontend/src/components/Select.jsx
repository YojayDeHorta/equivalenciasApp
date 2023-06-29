export default function Select ({children, name, label, SelectRef }) {
    return ( 
        <>
            <label htmlFor={name}>{label}:
                <select className="form-select" name={name} ref={SelectRef}>
                    {children}
                </select>
            </label>
        </> 
    );
}
