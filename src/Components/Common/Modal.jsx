import React from "react";
import IconButton from "./IconButton";

const Modal =({modalData})=>{
    return (
        <div>
            <div>
                <p>{modalData.title}</p>
                <p>{modalData.description}</p>
                <div>
                    <IconButton
                        Onclick={modalData?.btn1Handler}
                        title={modalData?.btn1Title}
                    />
                    <button onClick={modalData?.btn2Handler}>
                        {modalData?.btn2Title}
                    </button>
                </div>
            </div>
        </div>
    )
}