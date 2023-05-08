import classNames from 'classnames/bind';
import styles from './Header.module.scss';

const cx = classNames.bind(styles);

function Header() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <h1>Header</h1>
            </div>
        </div>
    );
}

export default Header;
