import React, { useEffect } from 'react'
import CurrentListHandler from './CurrentListHandler';
import { useDispatch, useSelector } from "react-redux";

const PaginationHandler = () => {

    const dispatch = useDispatch();
    const state = useSelector(state => state)

    const getPages = () => {
        const listing = state.data.finalOutput;

        const pages = [];
        listing.map((item) => {
            let innerPages = [];
            for (let j = 1; j <= Math.ceil(item.Product.length / state.data.perPage); j++) {
                innerPages.push(j);
            }
            pages.push(innerPages);

        })


        dispatch({
            type: "GET_PAGE_NUMBERS",
            payload: pages
        })

    };

    useEffect(() => {
        getPages()
    }, [state.data.finalOutput])

    return (
        <>
            <CurrentListHandler />
        </>
    )
}

export default PaginationHandler
