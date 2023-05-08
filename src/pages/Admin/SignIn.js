import classNames from 'classnames/bind';
import styles from './Admin.module.scss';

function SignIn(props) {
    const cx = classNames.bind(styles);
    return (
        <div className={cx('wrapperr')}>
            <div className={cx('content')}>
                <h2>Form sign in</h2>
                <button onClick={props.onShow}>sign up</button>
            </div>
        </div>
    );
}

export default SignIn;
