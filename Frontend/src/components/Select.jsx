function Select({ name, className, options, optionStyle, defaultOption, handleChange }) {
    return (
        <select className={className} id={name} onChange={handleChange}>
            <option>{defaultOption}</option>
            {
                options.map((option) => (
                    <option className={optionStyle} value={option}>
                        {option}
                    </option>
                ))
            }
        </select>
    );
}

export default Select;