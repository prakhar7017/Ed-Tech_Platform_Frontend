import React from "react";


const IconButton=({text,Onclick,children,disabled,outline=false,customeClasses,type})=>{
    return (
        <button disabled={disabled} onClick={Onclick} type={type}>
            {
                children ? (
                    <>
                        <span>
                            {text}
                        </span>
                        {children}
                    </>
                ) : (text)
            }
        </button>
    )

}

export default IconButton;