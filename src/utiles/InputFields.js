
const TextInputComponent = ({ placeholder, name, errors, touched, changeHandler, value, label }) => {
    return (
        <div className="flex justify-between font-bodyFont items-center w-full">
            <label htmlFor={name}>{label}</label>
            <div className='w-[70%] flex items-center gap-[10px] relative border'>
                <input type='text' placeholder={placeholder} id={name} name={name} value={value} onChange={changeHandler}
                    className='outline-none text-[14px] w-full p-[10px]' />
                {errors && touched && <p className='absolute text-[10px] bottom-[-12px] text-red-400'> {errors}</p>}
            </div>
        </div>
    )
}
const NumberInputComponent = ({ placeholder, name, errors, touched, changeHandler, value, label }) => {
    return (
        <div className="flex justify-between font-bodyFont items-center w-full">
            <label htmlFor={name}>{label}</label>
            <div className='w-[70%] flex items-center gap-[10px] relative border'>
                <input type='number' min={1} max={1999999} placeholder={placeholder} id={name} name={name} value={value} onChange={changeHandler}
                    className='outline-none text-[14px] w-full p-[10px]' />
                {errors && touched && <p className='absolute text-[10px] bottom-[-12px] text-red-400'> {errors}</p>}
            </div>
        </div>
    )
}
const SelectInputComponent = ({ options, name, errors, touched, changeHandler, value, label }) => {
    return (
        <div className="flex justify-between font-bodyFont items-center w-full">
            <label>{label}</label>
            <div className='w-[70%] flex items-center gap-[10px] relative border'>
                <select name={name} value={value} onChange={changeHandler}
                    className='outline-none text-[14px] w-full p-[10px]'>
                    <option value="" disabled>Select</option>
                    {options.map((option, index) => (
                        <option key={index} value={option.value}>
                            {option.name}
                        </option>
                    ))}
                </select>
                {errors && touched && <p className='absolute text-[10px] bottom-[-12px] text-red-400'>{errors}</p>}
            </div>
        </div>
    );
};
const TextAreaInputComponent = ({ placeholder, name, errors, touched, changeHandler, value, label }) => {
    return (
        <div className="flex justify-between font-bodyFont w-full">
            <label htmlFor={name}>{label}</label>
            <div className='w-[70%] flex items-center gap-[10px] relative border'>
                <textarea style={{ resize: 'none' }} type='text' placeholder={placeholder} id={name} name={name} value={value} onChange={changeHandler}
                    className='outline-none text-[14px] w-full h-[80px] p-[10px]' />
                {errors && touched && <p className='absolute text-[10px] bottom-[-12px] text-red-400'> {errors}</p>}
            </div>
        </div>
    )
}

const ImageInputComponent = ({ label, setSelectedImages, errors, touched }) => {
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 4) {
            alert('You can only upload up to 4 images.');
            return;
        }
        setSelectedImages(files);
    };
    return (
        <div className="flex justify-between font-bodyFont w-full items-center">
            <label>{label}</label>
            <div className="relative w-[60%]">
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="w-full flex items-center gap-[10px] relative border outline-none text-[14px] p-[10px]"
                />
                {errors && touched && <p className='absolute text-[10px] bottom-[-12px] text-red-400'>{errors}</p>}
            </div>
        </div>
    );
};

export { TextInputComponent, TextAreaInputComponent, SelectInputComponent, NumberInputComponent, ImageInputComponent }