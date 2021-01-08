import React from 'react'
import CombinedDataHandler from './CombinedDataHandler'

function AvailabilityInfoHandler({ manufacturerList, inStock }) {

    const getAvailabilityInfo = async () => {

        try {
            let availabilityArray = []
            const manufacturerArray = await manufacturerList;

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

            return availabilityArray

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <CombinedDataHandler availabilityArray={getAvailabilityInfo()} inStock={inStock} />
        </>
    )
}

export default AvailabilityInfoHandler
