import classNames from 'classnames/bind';
import styles from './Admin.module.scss';

function SignUp(props) {
    const cx = classNames.bind(styles);
    return (
        <div className={cx('wrapperr-1')}>
            <div className={cx('content')}>
                <h2>Form sign up</h2>
                <button onClick={props.onShow}>sign in</button>
            </div>
        </div>
    );
}

export default SignUp;
