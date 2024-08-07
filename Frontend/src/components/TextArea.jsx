function TextArea({id,name,className,rows,cols, handleChange,placeholder }) {
    return (  
        <textarea id={id} name={name} rows={rows} cols={cols} className={className} onChange={handleChange} placeholder={placeholder} required>
           
        </textarea>
    );
}

export default TextArea;