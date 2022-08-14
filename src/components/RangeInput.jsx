import React, {useState} from 'react';

const RangeInput = ({min, max}) => {
    const [value, setValue] = useState('')
    return (
        <div>
            <hr size={5}/>
            <p className="header">
                String length must be between {min} and {max} characters
            </p>
            <input className='ranges-input'
                value={value}
                onChange={e => setValue(e.target.value)}
                style = {value.length >= min && value.length <= max ? {background : 'white'} : {background : 'red'}}
                type="text"/>
        </div>
    );
};

export default RangeInput;