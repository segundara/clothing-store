import React, { useEffect, useState } from 'react'
import Storage from './DisplayHandler'
import { Spinner } from "react-bootstrap";

function FetchHandler() {
    const [response, setResponse] = useState(null)
    const [loading, setLoading] = useState(false)
    const [hasError, setHasError] = useState(false)

    const categories = ["jackets", "shirts", "accessories"]

    const fetchData = async () => {
        console.time("timer1");
        let data = []
        try {
            setLoading(true)
            for (const type of categories) {
                const url = `${process.env.REACT_APP_API_URL}/products/${type}`
                let res1 = await fetch(url)
                let res1Array = await res1.json()
                data.push(res1Array)
            }

            const flattenData = data.flat()

            let availabilityArray = []

            const manufacturerArray = Array.from(new Set(flattenData.map(obj => obj.manufacturer)))

            for (const manufacturer of manufacturerArray) {
                let res2 = await fetch(`${process.env.REACT_APP_API_URL}/availability/${manufacturer}`)
                let res2Array = await res2.json()

                for (let i = 0; i < res2Array.response.length; i++) {
                    const element = res2Array.response[i]
                    if (element.id && element.DATAPAYLOAD) {
                        let xmlString = element.DATAPAYLOAD.split("<INSTOCKVALUE>")[1].split("</INSTOCKVALUE>")[0]
                        element.DATAPAYLOAD = xmlString
                        availabilityArray.push(element)
                    }
                }

            }

            for (let j = 0; j < flattenData.length; j++) {
                const element = flattenData[j];
                for (let k = 0; k < availabilityArray.length; k++) {
                    const availabilityInfo = availabilityArray[k];

                    if (element.id.toUpperCase() === availabilityInfo.id) {
                        element.availability = availabilityInfo.DATAPAYLOAD
                        break;
                    }
                }
            }

            const combinedData = flattenData.reduce((r, a) => {
                r[a.type] = r[a.type] || [];
                r[a.type].push(a);
                return r;
            }, Object.create(null));

            const finalOutput = Object.entries(combinedData).map(([Category, Product]) => ({ Category, Product }));
            console.log(finalOutput)
            setResponse(finalOutput)
            setLoading(false)

            console.timeEnd("timer1");

        } catch (error) {
            setHasError(true)
            console.log(error)
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <>
            {loading && (
                <div
                    style={{
                        width: "10%",
                        height: "auto",
                        margin: "45vh 50vw",
                    }}
                >
                    <Spinner animation="border" variant="dark" />
                </div>
            )}
            {!loading && response && (
                <Storage inStock={response} />
            )}
            {!loading && !response && hasError && (
                <h1>Some problems while getting data!!!</h1>
            )}
        </>
    )
}

export default FetchHandler
