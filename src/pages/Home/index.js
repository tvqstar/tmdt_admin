import { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Modal from '~/components/Modal';
import routesConfig from '~/config/routes';
import DashboardHeader from '~/components/DashboardHeader';
import { DataContext } from '~/Provider';

import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { faProductHunt } from '@fortawesome/free-brands-svg-icons';
import { faCartShopping, faList, faUser } from '@fortawesome/free-solid-svg-icons';

function Home() {
    const cx = classNames.bind(styles);
    const [show, setShow] = useState(false);

    const value = useContext(DataContext);
    const [category] = value.category;
    const [product, setProduct] = value.product;
    const [user, setUser] = value.user;
    const [orders, setOrders] = value.order;

    return (
        <div>
            <div>
                <h2>Tổng quan</h2>
            </div>
            <div className={cx('row sm-gutter')}>
                <DashboardHeader
                    quantity={orders.length}
                    title="Đơn hàng"
                    link={routesConfig.order}
                    color="#f94144"
                    icon={<FontAwesomeIcon icon={faCartShopping} />}
                />
                <DashboardHeader
                    quantity={product.length}
                    title="Sản phẩm"
                    link={routesConfig.product}
                    color="#f4a261"
                    icon={<FontAwesomeIcon icon={faProductHunt} />}
                />
                <DashboardHeader
                    quantity={category.length}
                    title="Danh mục sản phẩm"
                    link={routesConfig.category}
                    color="#ce4257"
                    icon={<FontAwesomeIcon icon={faList} />}
                />
                <DashboardHeader
                    quantity={user.length}
                    title="Người dùng"
                    link={routesConfig.user}
                    color="#2a9d8f"
                    icon={<FontAwesomeIcon icon={faUser} />}
                />
            </div>

            <Modal onClose={() => setShow(false)} show={show}>
                <form>
                    <div>
                        <strong>pw</strong>
                        <input
                            style={{ border: '1px solid #ccc', fontSize: '1.8rem', display: 'block' }}
                            type={'password'}
                        />
                    </div>

                    <div>
                        <label>pw</label>
                        <input type={'text'} />
                    </div>

                    <div>
                        <label>pw</label>
                        <input type={'password'} />
                    </div>
                </form>
            </Modal>
        </div>
    );
}

export default Home;
