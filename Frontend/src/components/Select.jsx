export default function Select ({children, name, label }) {
    return ( 
        <>
            <label htmlFor={name}>{label}:
                <select className="form-select" name={name}>
                    {children}
                </select>
            </label>
        </> 
    );
}
