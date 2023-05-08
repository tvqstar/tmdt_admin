import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const DataContext = createContext();

function Provider({ children }) {
    const [category, setCategory] = useState([]);
    const [product, setProduct] = useState([]);
    const [user, setUser] = useState([]);
    const [order, setOrder] = useState([]);
    const [loading, setLoading] = useState(false);

    const reload = () => {
        loading ? setLoading(false) : setLoading(true)
    };

    const getCategory = () => {
        axios
            .get(`http://192.168.111.11:5000/api/category/list`)
            .then((res) => {
                setCategory(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getProduct = () => {
        axios
            .get(`http://192.168.111.11:5000/api/product/get-product`)
            .then((res) => {
                setProduct(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getUser = () => {
        axios
            .get(`http://192.168.111.11:5000/api/user/get-user`)
            .then((res) => {
                setUser(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getOrder = () => {
        axios
            .get(`http://192.168.111.11:5000/api/order`)
            .then((res) => {
                setOrder(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        getCategory();
        getProduct();
        getUser();
        getOrder();
    }, [loading]);

    const value = {
        category: [category, setCategory],
        product: [product, setProduct],
        user: [user, setUser],
        order: [order, setOrder],
        reload: reload,
        // addCart: addCart,
    };

    return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export default Provider;
