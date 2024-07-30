function Button({children,type,className,handleClick}) {
    return (<button type={type} className={className} onClick={()=>handleClick()}>{children}</button>);
}

export default Button;