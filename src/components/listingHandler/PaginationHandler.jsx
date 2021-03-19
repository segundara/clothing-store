import React, { useEffect } from 'react'
import CurrentListHandler from './CurrentListHandler';
import { useDispatch, useSelector } from "react-redux";

const PaginationHandler = () => {

    const dispatch = useDispatch();
    const state = useSelector(state => state)

    useEffect(() => {

        const getPages = () => {
            const listing = state.data.finalOutput;

            let pages = [];
            listing.map((item) => {
                let innerPages = [];
                for (let j = 1; j <= Math.ceil(item.Product.length / state.data.perPage); j++) {
                    innerPages = [...innerPages, j]
                }
                pages = [...pages, innerPages]
                return pages;
            })

            dispatch({
                type: "GET_PAGE_NUMBERS",
                payload: pages
            })
        };

        getPages()

    }, [dispatch, state.data.perPage, state.data.finalOutput])

    return (
        <>
            <CurrentListHandler />
        </>
    )
}

export default PaginationHandler
