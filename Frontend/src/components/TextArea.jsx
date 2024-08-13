function TextArea({id,name,className,rows,cols, handleChange,placeholder ,value }) {
    return (  
        <textarea id={id} name={name} rows={rows} cols={cols} className={className} onChange={handleChange} placeholder={placeholder} value={value} required>
           
        </textarea>
    );
}

export default TextArea;