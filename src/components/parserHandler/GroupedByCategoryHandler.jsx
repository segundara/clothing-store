import React, { useEffect } from 'react'
import FinalOutputHandler from './FinalOutputHandler';

import { useDispatch, useSelector } from "react-redux";

const GroupedByCategoryHandler = () => {

    const dispatch = useDispatch();
    const state = useSelector(state => state)

    useEffect(() => {

        const groupedData = () => {

            const combinedInfo = state.data.combinedData;

            const groupedByType = combinedInfo.reduce((r, a) => {
                r[a.type] = r[a.type] || [];
                r[a.type] = [...r[a.type], a]
                return r;
            }, Object.create(null));

            dispatch({
                type: "GET_GROUPED_DATA",
                payload: groupedByType
            })

        }

        groupedData()

    }, [dispatch, state.data.combinedData])

    return (
        <>
            <FinalOutputHandler />
        </>
    )
}

export default GroupedByCategoryHandler
