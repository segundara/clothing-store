import React, { useEffect } from 'react'
import GroupedByCategoryHandler from './GroupedByCategoryHandler';

import { useDispatch, useSelector } from "react-redux";

const CombinedDataHandler = () => {

    const dispatch = useDispatch();
    const state = useSelector(state => state)

    const getCombinedData = () => {
        let finalData = [];

        const availabilityData = state.data.availabilityInfo;
        const items = state.data.products

        for (let j = 0; j < items.length; j++) {
            let element = items[j];
            for (let k = 0; k < availabilityData.length; k++) {
                const availabilityElement = availabilityData[k];

                if (element.id.toUpperCase() === availabilityElement.id) {
                    const availability = availabilityElement.DATAPAYLOAD
                    finalData = [...finalData, { ...element, availability }]
                    break;
                }
            }
        }


        dispatch({
            type: "GET_COMBINED_DATA",
            payload: finalData
        })
    }

    useEffect(() => {
        getCombinedData();
    }, [state.data.availabilityInfo])

    return (
        <>
            <GroupedByCategoryHandler />
        </>
    )
}

export default CombinedDataHandler
