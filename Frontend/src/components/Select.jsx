function Select({ name, className, options, optionStyle, defaultOption, handleChange }) {
    return (
        <select className={className} name={name} onChange={handleChange}>
            <option>{defaultOption}</option>
            {options.length>0?
                options.map((option) => (
                    <option key={option} className={optionStyle} value={option}>
                        {option}
                    </option>
                )):''
            }
        </select>
    );
}

export default Select;