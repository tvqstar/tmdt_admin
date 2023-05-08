import classNames from 'classnames/bind';
import styles from './Order.module.scss';
import { DataContext } from '~/Provider';
import Modal from '~/components/Modal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEye, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useContext, useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import moment from 'moment/moment';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

function Order() {
    const cx = classNames.bind(styles);

    const value = useContext(DataContext);
    const [orders, setOrders] = value.order;
    const reload = value.reload;

    const [show, setShow] = useState(false);

    const getOrder = JSON.parse(localStorage.getItem('order'));

    const onShow = (order) => {
        setShow(true);
        localStorage.setItem('order', JSON.stringify(order));
    };

    const onClose = () => {
        setShow(false);
        localStorage.removeItem('order');
    };

    const handleConfirm = (e, id) => {
        e.preventDefault();
        swal({
            title: 'Xác nhận đơn hàng',
            buttons: true,
        }).then((isConfirm) => {
            if (isConfirm) {
                axios.post(`http://192.168.111.11:5000/api/order/confirm/${id}`);
                reload();
            }
        });
    };

    const handleCancle = (e, id) => {
        e.preventDefault();
        swal({
            title: 'Bạn muốn hủy đơn hàng này',
            buttons: true,
        }).then((isConfirm) => {
            if (isConfirm) {
                axios.post(`http://192.168.111.11:5000/api/order/cancel/${id}`);
                reload();
            }
        });
    };

    return (
        <>
            <div>
                <div>
                    <h2>Danh sách đơn hàng</h2>
                </div>

                <table className={cx('wrapper')}>
                    <thead>
                        <tr className={cx('trhead', 'row sm-gutter')}>
                            <th className={cx('col l-1 m-1 c-1')}>Id</th>
                            <th className={cx('col l-2 m-2 c-2')}>Người dùng</th>
                            <th className={cx('col l-1 m-1 c-1')}>Sản phẩm</th>
                            <th className={cx('col l-1 m-1 c-1')}>Tổng tiền</th>
                            <th className={cx('col l-1 m-1 c-1')}>Trạng thái</th>
                            <th className={cx('col l-2 m-2 c-2')}>Ngày đặt</th>
                            <th className={cx('col l-2 m-2 c-2')}>Ngày giao dự kiến</th>
                            <th className={cx('col l-2 m-2 c-2')}>Hành động</th>
                        </tr>
                    </thead>

                    <tbody>
                        {orders.map((order) => (
                            <tr className={cx('trbody', 'row sm-gutter')} key={order.idCart}>
                                <td className={cx('col l-1 m-1 c-1')}>{`#${order.idCart}`}</td>
                                <td className={cx('col l-2 m-2 c-2')}>{order.fullname}</td>
                                <td className={cx('col l-1 m-1 c-1')}>{order.product.length}</td>
                                <td className={cx('col l-1 m-1 c-1')}>{order.total}</td>
                                <td className={cx('col l-1 m-1 c-1')}>
                                    {order.status === 1 ? 'Đang chờ' : order.status === 2 ? 'Đã xác nhận' : 'Đã hủy'}
                                </td>
                                <td className={cx('col l-2 m-2 c-2')}>
                                    {moment(order.createdAt).format('DD-MM-YYYY HH:mm:ss')}
                                </td>
                                <td className={cx('col l-2 m-2 c-2')}>
                                    {order.deliveryAt !== null
                                        ? moment(order.deliveryAt).format('DD-MM-YYYY HH:mm:ss')
                                        : '...'}
                                </td>
                                <td className={cx('col l-2 m-2 c-2')}>
                                    <div className={cx('action')}>
                                        <Tippy delay={[0, 100]} content="Xem chi tiết" placement="left">
                                            <button onClick={() => onShow(order)} className={cx('watch')}>
                                                <FontAwesomeIcon icon={faEye} />
                                            </button>
                                        </Tippy>

                                        <Tippy delay={[0, 100]} content="Xác nhận" placement="top">
                                            <button
                                                onClick={(e) => handleConfirm(e, order.idCart)}
                                                className={cx('check', `${order.status === 1 ? '' : 'disable'}`)}
                                            >
                                                <FontAwesomeIcon icon={faCheck} />
                                            </button>
                                        </Tippy>

                                        <Tippy delay={[0, 100]} content="Hủy" placement="right">
                                            <button
                                                onClick={(e) => handleCancle(e, order.idCart)}
                                                className={cx('delete', `${order.status !== 3 ? '' : 'disable'}`)}
                                            >
                                                <FontAwesomeIcon icon={faXmark} />
                                            </button>
                                        </Tippy>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Modal show={show} onClose={onClose}>
                <div className={cx('btn-close')}>
                    <button onClick={onClose}>
                        <FontAwesomeIcon icon={faXmark}/>
                    </button>
                </div>

                <div className={cx('info')}>
                    <div>
                        <div className={cx('info-text')}>Họ tên:</div>
                        <div className={cx('info-text')}>Số điện thoại:</div>
                        <div className={cx('info-text')}>Địa chỉ:</div>
                        <div className={cx('info-text')}>Email:</div>
                    </div>

                    <div>
                        <div className={cx('info-text')}>{getOrder && getOrder.fullname}</div>
                        <div className={cx('info-text')}>{`0${getOrder && getOrder.phone}`}</div>
                        <div className={cx('info-text')}>{`${getOrder && getOrder.address_name} - ${
                            getOrder && getOrder.district_name
                        } - ${getOrder && getOrder.province_name}`}</div>
                        <div className={cx('info-text')}>{getOrder && getOrder.email}</div>
                    </div>
                </div>

                <table className={cx('wrapper', 'order-modal')}>
                    <thead>
                        <tr style={{ margin: '0 5px' }} className={cx('trhead', 'row sm-gutter')}>
                            <th className={cx('col l-1 m-1 c-1')}>Id SP</th>
                            <th className={cx('col l-4 m-4 c-4')}>Sản phẩm</th>
                            <th className={cx('col l-1 m-1 c-1')}>Giá</th>
                            <th className={cx('col l-1 m-1 c-1')}>Số lượng</th>
                            <th className={cx('col l-2 m-2 c-2')}>Kiểu</th>
                            <th className={cx('col l-2 m-2 c-2')}>Đánh giá</th>
                            <th className={cx('col l-1 m-1 c-1')}>Thành tiền</th>
                        </tr>
                    </thead>

                    <tbody>
                        {getOrder &&
                            getOrder.product.map((ord) => (
                                <tr
                                    style={{ margin: '0 5px' }}
                                    className={cx('trbody', 'row sm-gutter')}
                                    key={ord.idProduct}
                                >
                                    <td className={cx('col l-1 m-1 c-1')}>{ord.idProduct}</td>
                                    <td className={cx('col l-4 m-4 c-4')}>
                                        <div className={cx('pro-detail')}>
                                            <div className={cx('small-img')}>
                                                <img
                                                    src={`http://192.168.111.11:5000/api/product/image/${ord.img}`}
                                                    alt="anh san pham"
                                                />
                                            </div>
                                            <div className={cx('name-product')}>{ord.nameProduct}</div>
                                        </div>
                                    </td>
                                    <td className={cx('col l-1 m-1 c-1')}>{ord.price}</td>
                                    <td className={cx('col l-1 m-1 c-1')}>{ord.quantity}</td>
                                    <td className={cx('col l-2 m-2 c-2')}>{ord.type}</td>
                                    <td className={cx('col l-2 m-2 c-2')}>
                                        {ord.productRating ? ord.productRating : '0'}
                                    </td>
                                    <td className={cx('col l-1 m-1 c-1')}>{ord.quantity * ord.price}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>

                {/* <div className={cx('footer')}>
                    <h3>Total:</h3>
                    <h3>700</h3>
                </div> */}
            </Modal>
        </>
    );
}

export default Order;
