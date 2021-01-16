import React, { useEffect } from 'react'
import AvailabilityInfoHandler from './AvailabilityInfoHandler'

import { useDispatch, useSelector } from "react-redux";

const ManufacturerListHandler = () => {


    const dispatch = useDispatch();
    const state = useSelector(state => state)

    const getManufacturers = () => {

        const items = state.data.products
        const manufacturerArray = [...(new Set(items.map(obj => obj.manufacturer)))]

        dispatch({
            type: "GET_MANUFACTURER_LIST",
            payload: manufacturerArray
        });
    }

    useEffect(() => {
        getManufacturers();
    }, [state.data.products])

    return (
        <>
            <AvailabilityInfoHandler />
        </>
    )

}

export default ManufacturerListHandler
