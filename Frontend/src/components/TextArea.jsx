function TextArea({id,name,className,rows,cols, handleChange,placeholder ,value,maxValue}) {
    return (  
        <textarea id={id} name={name} rows={rows} cols={cols} className={className} onChange={handleChange} placeholder={placeholder} value={value} required  maxLength={maxValue}>
           
        </textarea>
    );
}

export default TextArea;