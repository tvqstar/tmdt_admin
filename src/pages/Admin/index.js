// import { useState, useRef, useEffect } from 'react';
// import { useTypewriter } from 'react-simple-typewriter';

import classNames from 'classnames/bind';
import styles from './Admin.module.scss';
import { useState } from 'react';

import SignIn from './SignIn';
import SignUp from './SignUp';

function Admin() {

    const cx = classNames.bind(styles);
    const [show, setShow] = useState(true);

    // const [text] = useTypewriter({
    //     words: ['Bạn cần tìm gì...', 'Nhập tên sản phẩm...'],
    //     loop: true,
    //     delaySpeed: 200,
    //     deleteSpeed: 80,
    // });

    const ShowSignIn = () => {
        setShow(false);
    };

    const ShowSignUp = () => {
        setShow(true);
    };

    return (
        <>
            {/* <div>
                <input style={{color: '#c55', fontSize: '2rem', padding: '4px 8px', border: '1px solid #ccc'}} type="text" placeholder={text} />
            </div> */}
            <div className={cx('wrapper')}>
                <div className={cx('sign-in', `${show ? 'rotate' : ''}`)}>
                    <SignIn onShow={ShowSignUp} />
                </div>
                <div className={cx('sign-up', `${!show ? 'rotate' : ''}`)}>
                    <SignUp onShow={ShowSignIn} />
                </div>
            </div>
        </>
    );
}

export default Admin;
