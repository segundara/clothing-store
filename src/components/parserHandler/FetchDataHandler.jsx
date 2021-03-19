import React, { useEffect } from 'react';
import ManufacturerListHandler from './ManufacturerListHandler'
import categories from './ProductTypes'

import { useDispatch } from "react-redux";

const FetchHandler = () => {

    const dispatch = useDispatch();

    useEffect(() => {

        const fetchData = async () => {
            let initialData = [];
            try {
                for (const type of categories) {
                    const url = `${process.env.REACT_APP_API_URL}/products/${type}`;
                    let res1 = await fetch(url)
                    let res1Array = await res1.json()
                    initialData = [...initialData, ...res1Array]
                }

                dispatch({
                    type: "GET_PRODUCT_LIST",
                    payload: initialData
                });

            } catch (error) {
                console.log(error);
                dispatch({
                    type: "HAS_ERROR"
                });
            }
        }

        fetchData();

    }, [dispatch])

    return (
        <>
            <ManufacturerListHandler />
        </>
    )
}

export default FetchHandler;
