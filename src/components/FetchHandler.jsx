import React, { useEffect, useState } from 'react'
import Storage from './DisplayHandler'

function FetchHandler() {
    const [response, setResponse] = useState(null)
    const [loading, setLoading] = useState(false)
    const [hasError, setHasError] = useState(false)

    const endpoints = [`${process.env.REACT_APP_API_URL}/products/jackets`, `${process.env.REACT_APP_API_URL}/products/shirts`, `${process.env.REACT_APP_API_URL}/products/accessories`]

    const getManufacturers = (array) => {
        const manufacturerSET = new Set()
        for (let i = 0; i < array.length; i++) {
            const element = array[i];
            manufacturerSET.add(element.manufacturer)
        }
        return [...manufacturerSET]
    }

    const fetchData = async () => {
        console.time("timer1");
        let data = []
        try {
            setLoading(true)
            for (const api of endpoints) {
                let res1 = await fetch(api)
                let res1Array = await res1.json()
                data.push(res1Array)
            }

            const flattenData = data.flat()

            const manufacturerArray = getManufacturers(flattenData)

            for (let k = 0; k < manufacturerArray.length; k++) {
                const element = manufacturerArray[k];

                let res2 = await fetch(`${process.env.REACT_APP_API_URL}/availability/${element}`)
                let res2Array = await res2.json()

                if (res2Array.response) {
                    for (let j = 0; j < res2Array.response.length; j++) {
                        let xmlString = res2Array.response[j].DATAPAYLOAD
                        const parser = new DOMParser()
                        const xmlFormat = parser.parseFromString(xmlString, "application/xml")

                        for (let i = 0; i < flattenData.length; i++) {
                            const element = flattenData[i];
                            if (element.id.toUpperCase() === res2Array.response[j].id.toUpperCase()) {
                                element.availability = xmlFormat.getElementsByTagName("INSTOCKVALUE")[0].childNodes[0].nodeValue;

                                break;

                            }
                        }
                    }
                }
            }
            getFormatedData(data)
            console.timeEnd("timer1");

        } catch (error) {
            setHasError(true)
            setLoading(false)
        }
    }

    const getFormatedData = async (data) => {
        const getData = []

        let list1 = {}
        let list2 = {}
        let list3 = {}

        list1.Category = "Jackets"
        list1.Product = data[0]
        list2.Category = "Shirts"
        list2.Product = data[1]
        list3.Category = "Accessories"
        list3.Product = data[2]

        getData.push(list1)
        getData.push(list2)
        getData.push(list3)

        setResponse(getData)

        setLoading(false)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <>
            {loading && (
                <h1>Loading...</h1>
            )}
            {!loading && response && (
                <Storage inStock={response} />
            )}
        </>
    )
}

export default FetchHandler
