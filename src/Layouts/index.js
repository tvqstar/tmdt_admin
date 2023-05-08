import classNames from 'classnames/bind';
import styles from './Layout.module.scss';
import SideBar from './SideBar';
// import Header from '~/components/Header';
import { Navigate } from 'react-router-dom';

function DefaultLayout({ children }) {
    const cx = classNames.bind(styles);
    const admin = localStorage.getItem('admin');
    return (
        <>
            {admin === null ? (
                <Navigate to={'/login'} />
            ) : (
                <div className={cx('wrapper')}>
                    {/* <Header /> */}
                    <div className={cx('grid wide')}>
                        <div className={cx('row sm-gutter', 'container')}>
                            <div className="col l-3 m-0 c-0">
                                <SideBar />
                            </div>
                            <div className="col l-9 m-12 c-12">
                                <div className={cx('content')}>{children}</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default DefaultLayout;
