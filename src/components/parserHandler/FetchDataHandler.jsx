import React, { useEffect } from 'react';
import ManufacturerListHandler from './ManufacturerListHandler'
import { Spinner } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";

const FetchHandler = () => {

    const dispatch = useDispatch();
    const state = useSelector(state => state)

    const categories = ["jackets", "shirts", "accessories"];

    const fetchData = async () => {
        let initialData = [];
        try {

            for (const type of categories) {
                const url = `${process.env.REACT_APP_API_URL}/products/${type}`
                let res1 = await fetch(url)
                let res1Array = await res1.json()
                initialData = [...initialData, ...res1Array]
            }

            dispatch({
                type: "LOADING_STARTS"
            });
            dispatch({
                type: "GET_PRODUCT_LIST",
                payload: initialData
            });

        } catch (error) {
            dispatch({
                type: "HAS_ERROR",
                payload: error
            });
        }

    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <>
            {state.status.isLoading && (
                <div
                    style={{
                        width: "10%",
                        height: "auto",
                        margin: "45vh 50vw",
                    }}
                >
                    <Spinner animation="border" variant="dark" />
                </div>
            )}
            {!state.status.isLoading && state.status.error !== null && (
                <>
                    <h1>Some problems while getting data!!!</h1>
                    {console.log(state.status.error)}
                </>
            )}
            <ManufacturerListHandler />
        </>
    )
}

export default FetchHandler
