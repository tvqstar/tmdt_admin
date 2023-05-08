import classNames from 'classnames/bind';
import styles from './Login.module.scss';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const cx = classNames.bind(styles);
    const nav = useNavigate();

    const [pwdShow, setPwdShow] = useState(false);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        setLoading(true);
        axios
            .post('http://192.168.111.11:5000/api/admin/sign-in', {
                adminname: data.adminname,
                password: data.password,
            })
            .then((res) => {
                if (res.data.status === 200) {
                    localStorage.setItem('admin', JSON.stringify(res.data.data.isSuper));
                    setLoading(false);
                    nav('/');
                } else {
                    setMessage(res.data.msg);

                    setTimeout(() => {
                        setMessage('');
                        console.log('re render');
                    }, 3000);
                }
            });
    };

    const togglePassword = () => {
        setPwdShow(pwdShow ? false : true);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <h2 className={cx('title')}>Đăng nhập</h2>
                {loading && message && (
                    <div style={{ margin: '0 50px' }} className={cx('show-err')}>
                        {message}
                    </div>
                )}
                <form className={cx('input')} onSubmit={handleSubmit(onSubmit)}>
                    <div className={cx('input-item')}>
                        <FontAwesomeIcon icon={faUser} />
                        <input
                            type="text"
                            placeholder="Nhập tên tài khoản..."
                            {...register('adminname', {
                                required: 'Trường này không được để trống',
                                // pattern: {
                                //     value: /^[A-Z0-9._%+-]+@[[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                //     message: 'Vui lòng nhập đúng email',
                                // },
                            })}
                        />
                    </div>

                    {errors.adminname?.message && <span className={cx('show-err')}>{errors.adminname?.message}</span>}

                    <div className={cx('input-item')}>
                        <FontAwesomeIcon icon={faLock} />
                        <input
                            type={pwdShow ? 'text' : 'password'}
                            placeholder="Nhập mật khẩu..."
                            {...register('password', {
                                required: 'Trường này không được để trống',
                                minLength: {
                                    value: 6,
                                    message: 'Tối thiểu 6 kí tự',
                                },
                            })}
                        />

                        <span style={{ userSelect: 'none' }} onClick={togglePassword}>
                            {pwdShow && <FontAwesomeIcon className={cx('showPwdIcon')} icon={faEye} />}
                            {!pwdShow && <FontAwesomeIcon className={cx('showPwdIcon')} icon={faEyeSlash} />}
                        </span>
                    </div>

                    {errors.password?.message && <span className={cx('show-err')}>{errors.password?.message}</span>}

                    <div className={cx('button')}>
                        <button type="submit" className={cx('button-login')} to={'/'}>
                            Đăng nhập
                        </button>
                    </div>
                </form>

                <div className={cx('link')}>
                    <span>Bạn không phải admin?</span>
                    <a className={cx('link-button')} href="https://ssg-vietnam.com/">
                        Về trang chủ ngay
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Login;
