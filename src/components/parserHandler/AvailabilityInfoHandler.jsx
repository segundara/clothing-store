import React, { useEffect } from 'react'
import CombinedDataHandler from './CombinedDataHandler'

import { useDispatch, useSelector } from "react-redux";

const AvailabilityInfoHandler = () => {

    const dispatch = useDispatch();
    const state = useSelector(state => state)

    const getAvailabilityInfo = async () => {

        let availabilityArray = []
        const manufacturerArray = state.data.manufacturers;

        try {
            for (const manufacturer of manufacturerArray) {
                let res2 = await fetch(`${process.env.REACT_APP_API_URL}/availability/${manufacturer}`)
                let res2Array = await res2.json()

                for (let i = 0; i < res2Array.response.length; i++) {
                    const element = res2Array.response[i]
                    if (element.id && element.DATAPAYLOAD) {
                        let xmlString = element.DATAPAYLOAD.split("<INSTOCKVALUE>")[1].split("</INSTOCKVALUE>")[0]
                        element.DATAPAYLOAD = xmlString
                        availabilityArray = [...availabilityArray, element]
                    }
                }
            }

            dispatch({
                type: "GET_AVAILABILITY_INFO",
                payload: availabilityArray
            });

        } catch (error) {
            dispatch({
                type: "HAS_ERROR",
                payload: error
            });
        }
    }

    useEffect(() => {
        getAvailabilityInfo();
    }, [state.data.manufacturers])

    return (
        <>
            <CombinedDataHandler />
        </>
    )
}

export default AvailabilityInfoHandler
