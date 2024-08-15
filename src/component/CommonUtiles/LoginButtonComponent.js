import React from 'react'

const LoginButtonComponent = ({ buttonText, handler, textColor }) => {
    return (
        <button className={`z-[1] border uppercase text-[14px] font-bodyFont font-medium bg-sky-400 p-[10px] w-[150px] rounded-full text-${textColor ? textColor : 'white'}`} onClick={(e) => { e.preventDefault(); handler(); }}>
            {buttonText}
        </button>
    )
}

export default LoginButtonComponent