import React, {useState} from 'react';

const PasswordConfirm = ({ min }) => {
    const [firstPassword, setFirstPassword] = useState('');
    const [secondPassword, setSecondPassword] = useState('');
    return (
        <>
            <div>
                <hr size={5}/>
                <p className='header'>
                    The password must contain a capital letter, a number and be longer than 2 characters</p>
                <input className='password-confirm'
                    type="password"
                    onChange={e => setFirstPassword(e.target.value)}
                    value={firstPassword}
                    placeholder='Enter password'
                    style={/(?=.*[0-9])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]+/.test(firstPassword) &&
                    firstPassword.length > min
                     ? {background: 'green'}
                     : {background: 'red'}
                    }
                />

                <input className='password-confirm'
                    type="password"
                    onChange={e => setSecondPassword(e.target.value)}
                    value={secondPassword}
                    placeholder='Repeat password'
                    style={firstPassword !== secondPassword
                        ? {background: 'red'}
                        : {background: 'green'}
                    }
                />

            </div>
        </>
    );
};



export default PasswordConfirm;