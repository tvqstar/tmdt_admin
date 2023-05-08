import classNames from 'classnames/bind';
import styles from './Product.module.scss';
import Modal from '~/components/Modal';
import { DataContext } from '~/Provider';
import Pagination from '~/components/Pagination';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useContext, useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';

function Product() {
    const cx = classNames.bind(styles);
    const [show, setShow] = useState(false);

    const [data, setData] = useState({
        nameProduct: '',
        price: '',
        description: '',
        type: '',
        inStock: '',
        img: null,
        idCategory: '',
    });

    const value = useContext(DataContext);
    const [category] = value.category;
    const [product, setProduct] = value.product;

    // Phan trang
    const [numPage, setNumPage] = useState(1); // Trang so x
    const [limitPage, setLimitPage] = useState(3); // So san pham cho 1 trang
    const lastIndex = numPage * limitPage; // san pham cuoi cua 1 trang
    const firstIndex = lastIndex - limitPage; // san pham dau cua 1 trang
    const totalPage = Math.ceil(product.length / limitPage); // tong cong x trang
    const record = product.slice(firstIndex, lastIndex); // render san pham

    const handleAddProduct = (e) => {
        e.preventDefault();

        let formData = new FormData();

        formData.append('file', data.img);
        formData.append('nameProduct', data.nameProduct);
        formData.append('price', data.price);
        formData.append('description', data.description);
        formData.append('type', data.type);
        formData.append('inStock', data.inStock);
        formData.append('idCategory', data.idCategory);

        if (
            !data.nameProduct ||
            !data.price ||
            !data.description ||
            !data.type ||
            !data.inStock ||
            !data.idCategory ||
            !data.img
        ) {
            console.log('trong');
            return;
        }
        axios
            .post(`http://192.168.111.11:5000/api/product/create-product`, formData)
            .then((res) => setProduct([...product, res.data.data]))
            .then(() => setShow(false));

        swal({
            icon: 'success',
            title: 'Thêm thành công!',
        });
    };

    const handleEdit = () => {
        // const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        // const perpage = 5;
        // const numberpage = 1;
        // const totalPage = Math.ceil(arr.length / perpage);
        // const indexss = perpage * numberpage - perpage;
        // const number = [...Array(totalPage + 1).keys()].slice(1)
        // const aaa = arr.slice(indexss, indexss + perpage);
        // console.log(number);
        // console.log(aaa);
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
                axios.delete(`http://192.168.111.11:5000/api/product/delete-product/${id}`);
                product.forEach((item, index) => {
                    if (item.idProduct === id) {
                        product.splice(index, 1);
                    }

                    setProduct([...product]);
                });
            }
        });
    };

    const handleChangeLimit = (e) => {
        setLimitPage(e.target.value);
        setNumPage(1);
    };

    return (
        <>
            <div>
                <div>
                    <h2>Tất cả sản phẩm</h2>
                </div>

                <div className={cx('option', 'row sm-gutter')}>
                    <button className={cx('btn', 'btn-add-product')} onClick={() => setShow(true)}>
                        Thêm sản phẩm
                    </button>

                    <select className={cx('option-page')} onChange={(e) => handleChangeLimit(e)}>
                        <option value={limitPage}>Lựa chọn số bản ghi</option>
                        <option value={3}>3</option>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                    </select>
                </div>

                <table className={cx('wrapper')}>
                    <thead>
                        <tr className={cx('trhead', 'row sm-gutter')}>
                            <th className={cx('col l-1 m-4 c-6')}>Id</th>
                            <th className={cx('col l-1 m-4 c-6')}>Hình ảnh</th>
                            <th className={cx('col l-5 m-4 c-6')}>Tên sản phẩm</th>
                            <th className={cx('col l-1 m-4 c-6')}>Giá tiền</th>
                            <th className={cx('col l-1 m-4 c-6')}>Kiểu</th>
                            <th className={cx('col l-1 m-4 c-6')}>Kho</th>
                            <th className={cx('col l-1 m-4 c-6')}>Đánh giá</th>
                            <th className={cx('col l-1 m-4 c-6')}>Hành động</th>
                        </tr>
                    </thead>

                    <tbody>
                        {record.map((prod) => {
                            return (
                                <tr key={prod.idProduct} className={cx('trbody', 'row sm-gutter')}>
                                    <td className="col l-1 m-4 c-6">{`#${prod.idProduct}`}</td>
                                    <td className={cx('col l-1 m-4 c-6')}>
                                        <div
                                            className={cx('item-img')}
                                            style={{
                                                backgroundImage: `url(http://192.168.111.11:5000/api/product/image/${prod.img})`,
                                            }}
                                        ></div>
                                    </td>

                                    <td className="col l-5 m-4 c-6">
                                        <div className={cx('item-title')}>
                                            <h3 className={cx('item-name')}>{prod.nameProduct}</h3>
                                            <p className={cx('item-desc')}>{prod.description}</p>
                                        </div>
                                    </td>

                                    <td className="col l-1 m-4 c-6">{prod.price}</td>

                                    <td className="col l-1 m-4 c-6">{prod.type}</td>

                                    <td className="col l-1 m-4 c-6">{prod.inStock}</td>

                                    <td className="col l-1 m-4 c-6">
                                            {prod.productRating ? prod.productRating : 0}
                                    </td>

                                    <td className="col l-1 m-4 c-6">
                                        <span className={cx('action')}>
                                            <button className={cx('edit')} onClick={handleEdit}>
                                                <FontAwesomeIcon className={cx('edit-icon')} icon={faPenToSquare} />
                                            </button>
                                            <button
                                                className={cx('delete')}
                                                onClick={() => handleDelete(prod.idProduct)}
                                            >
                                                <FontAwesomeIcon className={cx('delete-icon')} icon={faTrash} />
                                            </button>
                                        </span>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                <Pagination numPage={[numPage, setNumPage]} totalPage={totalPage} limitPage={limitPage} />
            </div>

            <Modal show={show} onClose={() => setShow(false)}>
                <div className={cx('content')}>
                    <div className={cx('add-product-title')}>Thêm sản phẩm mới</div>
                    <div className={cx('add-product-form')}>
                        <div className={cx('product-form')}>
                            <label className={cx('input-title')}>Tên sản phẩm</label>
                            <input
                                className={cx('input')}
                                type="text"
                                value={data.nameProduct}
                                onChange={(e) => setData({ ...data, nameProduct: e.target.value })}
                            />

                            <label className={cx('input-title')}>Giá tiền</label>
                            <input
                                className={cx('input')}
                                type="text"
                                value={data.price}
                                onChange={(e) => setData({ ...data, price: e.target.value })}
                            />

                            <label className={cx('input-title')}>Danh mục</label>
                            <select
                                className={cx('input')}
                                value={data.idCategory}
                                onChange={(e) => setData({ ...data, idCategory: e.target.value })}
                            >
                                <option value="Lựa chọn danh mục">-Lựa chọn danh mục-</option>
                                {category.map((cate, index) => (
                                    <option value={cate.idCategory} key={index}>
                                        {cate.category_name}
                                    </option>
                                ))}
                                {/* <option value="B">B</option>
                                <option value="-">Other</option> */}
                            </select>
                        </div>

                        <div className={cx('product-form')}>
                            <label className={cx('input-title')}>Loại hàng</label>
                            <input
                                className={cx('input')}
                                type="text"
                                value={data.type}
                                onChange={(e) => setData({ ...data, type: e.target.value })}
                            />

                            <label className={cx('input-title')}>Tồn kho</label>
                            <input
                                className={cx('input')}
                                type="text"
                                value={data.inStock}
                                onChange={(e) => setData({ ...data, inStock: e.target.value })}
                            />

                            <label className={cx('input-title')}>Chọn ảnh</label>
                            <input
                                className={cx('input')}
                                type="file"
                                name="filename"
                                // value={data.description}
                                onChange={(e) => setData({ ...data, img: e.target.files[0] })}
                            />
                        </div>
                    </div>

                    <div className={cx('description')}>
                        <label className={cx('input-title')}>Mô tả</label>
                        {/* <textarea className={cx('description-input')}>Hekko</textarea> */}
                        <textarea
                            className={cx('description-input')}
                            value={data.description}
                            onChange={(e) => setData({ ...data, description: e.target.value })}
                        />
                    </div>

                    <div className={cx('footer-btn')}>
                        <button className={cx('btn', 'btn-save')} onClick={handleAddProduct}>
                            Thêm
                        </button>
                        <button
                            className={cx('btn', 'btn-cancel')}
                            onClick={() => {
                                setShow(false);
                            }}
                        >
                            Hủy bỏ
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
}

export default Product;
