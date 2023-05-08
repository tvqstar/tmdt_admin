import classNames from 'classnames/bind';
import { Link, NavLink } from 'react-router-dom';
import styles from './SideBar.module.scss';
import routesConfig from '~/config/routes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function SideBar() {

    const admin = JSON.parse(localStorage.getItem('admin'));

    const handleLogout = () => {
        localStorage.removeItem('admin');
        window.location.reload(true);
    }
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content-top')}>
                <Link className={cx('admin-dashboard')} to={routesConfig.home}>
                    Admin
                    <FontAwesomeIcon className={cx('icon-admin')} icon={faKey} />
                </Link>

                <button onClick={handleLogout} className={cx('logout')}>
                    <FontAwesomeIcon icon={faRightFromBracket} />
                </button>
            </div>

            <div className={cx('content')}>
                {admin === 1 && (
                    <NavLink className={(nav) => cx('link', { active: nav.isActive })} to={routesConfig.admin}>
                        Admin
                    </NavLink>
                )}
                <NavLink className={(nav) => cx('link', { active: nav.isActive })} to={routesConfig.product}>
                    Quản lý sản phẩm
                </NavLink>
                <NavLink className={(nav) => cx('link', { active: nav.isActive })} to={routesConfig.user}>
                    Quản lý người dùng
                </NavLink>
                <NavLink className={(nav) => cx('link', { active: nav.isActive })} to={routesConfig.order}>
                    Quản lý đơn hàng
                </NavLink>
                <NavLink className={(nav) => cx('link', { active: nav.isActive })} to={routesConfig.category}>
                    Quản lý danh mục sản phẩm
                </NavLink>
            </div>
        </div>
    );
}

export default SideBar;
