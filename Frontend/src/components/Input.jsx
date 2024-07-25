function Input({ type, name ,className, handleChange,placeholder }) {
    return (<input type={type} id={name} name={name} className={className} required onChange={(e)=>handleChange(e)} placeholder={placeholder} />);
}

export default Input;