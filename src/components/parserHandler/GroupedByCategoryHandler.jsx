import React, { useEffect } from 'react'
import FinalOutputHandler from './FinalOutputHandler';

import { useDispatch, useSelector } from "react-redux";

const GroupedByCategoryHandler = () => {

    const dispatch = useDispatch();
    const state = useSelector(state => state)

    const groupedData = () => {

        const combinedInfo = state.data.combinedData;

        const groupedByType = combinedInfo.reduce((r, a) => {
            r[a.type] = r[a.type] || [];
            r[a.type].push(a);
            return r;
        }, Object.create(null));

        dispatch({
            type: "GET_GROUPED_DATA",
            payload: groupedByType
        })

    }

    useEffect(() => {
        groupedData()
    }, [state.data.combinedData])

    return (
        <>
            <FinalOutputHandler />
        </>
    )
}

export default GroupedByCategoryHandler
