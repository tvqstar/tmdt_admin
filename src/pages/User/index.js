import classNames from 'classnames/bind';
import styles from './User.module.scss';
import { DataContext } from '~/Provider';
import Pagination from '~/components/Pagination';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useContext, useState } from 'react';
import swal from 'sweetalert';
import axios from 'axios';

function User() {
    const cx = classNames.bind(styles);

    const value = useContext(DataContext);
    const [users, setUser] = value.user;

    const [numPage, setNumPage] = useState(1); // Trang so x
    const [limitPage, setLimitPage] = useState(5); // So san pham cho 1 trang
    const lastIndex = numPage * limitPage; // san pham cuoi cua 1 trang
    const firstIndex = lastIndex - limitPage; // san pham dau cua 1 trang
    const totalPage = Math.ceil(users.length / limitPage); // tong cong x trang 
    const record = users.slice(firstIndex, lastIndex); // render san pham

    const handleChangeLimit = (e) => {
        setLimitPage(e.target.value);
        setNumPage(1);
    };

    const handleDelete = (id) => {
        swal({
            title: 'Cảnh báo!',
            text: 'Bạn có thật sự muốn xóa!',
            icon: 'warning',
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                axios.delete(`http://192.168.111.11:5000/api/user/delete-user/${id}`);
                users.forEach((item, index) => {
                    if (item.idUser === id) {
                        users.splice(index, 1);
                    }

                    setUser([...users]);
                });
            }
        });
    };

    return (
        <div>
            <div>
                <h2>Danh sách người dùng</h2>
            </div>

            <select className={cx('option-page')} onChange={(e) => handleChangeLimit(e)}>
                <option value={limitPage}>Lựa chọn số bản ghi</option>
                {/* <option value={3}>3</option> */}
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
            </select>

            <table className={cx('wrapper')}>
                <thead>
                    <tr className={cx('trhead', 'row sm-gutter')}>
                        <th className={cx('col l-1 m-1 c-1')}>Id</th>
                        <th className={cx('col l-2 m-2 c-2')}>Email</th>
                        <th className={cx('col l-2 m-2 c-2')}>Tên đầy đủ</th>
                        <th className={cx('col l-2 m-2 c-2')}>Số điện thoại</th>
                        <th className={cx('col l-4 m-4 c-4')}>Địa chỉ</th>
                        <th className={cx('col l-1 m-1 c-1')}>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {record.map((user) => (
                        <tr className={cx('trbody', 'row sm-gutter')} key={user.idUser}>
                            <td className={cx('col l-1 m-1 c-1')}>{`#${user.idUser}`}</td>
                            <td className={cx('col l-2 m-2 c-2')}>{user.email}</td>
                            <td className={cx('col l-2 m-2 c-2')}>{user.fullname}</td>
                            <td className={cx('col l-2 m-2 c-2')}>{`0${user.phone}`}</td>
                            <td
                                className={cx('col l-4 m-4 c-4')}
                            >{`${user.province_name} - ${user.district_name} - ${user.address_name}`}</td>
                            <td className={cx('col l-1 m-1 c-1')}>
                                <button onClick={() => handleDelete(user.idUser)} className={cx('btn', 'delete')}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div>
                <p>hien thi {firstIndex + 1} den {lastIndex} cua {users.length}</p>
            </div>

            <Pagination numPage={[numPage, setNumPage]} totalPage={totalPage} limitPage={limitPage} />
        </div>
    );
}

export default User;
