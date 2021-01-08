import React from 'react'
import AvailabilityInfoHandler from './AvailabilityInfoHandler'

function ManufacturerListHandler({ inStock }) {

    const getManufacturerList = async () => {
        const manufacturerArray = [...(new Set(inStock.map(obj => obj.manufacturer)))]
        return manufacturerArray;
    }

    return (
        <>
            <AvailabilityInfoHandler manufacturerList={getManufacturerList()} inStock={inStock} />
        </>
    )
}

export default ManufacturerListHandler
