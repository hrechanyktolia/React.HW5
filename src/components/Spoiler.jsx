import React, {useState} from 'react';

const Spoiler = ({ header='Show Content', open, children }) => {
    const [show, setShow] = useState(open);
    const ShowContent = () => {
        setShow(!show ? true : false);
    };

    return (
        <div className="spoiler" onClick={ShowContent}>
            <div className="header">{header} </div>
            {show ? children : ""}
        </div>
    );
};

export default Spoiler;