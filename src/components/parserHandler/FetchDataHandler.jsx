import React, { useEffect, useState } from 'react';
import ManufacturerListHandler from './ManufacturerListHandler'
import { Spinner } from "react-bootstrap";

function FetchHandler() {
    const [response, setResponse] = useState(null)
    const [loading, setLoading] = useState(false)
    const [hasError, setHasError] = useState(false)

    const categories = ["jackets", "shirts", "accessories"];

    const fetchData = async () => {
        let initialData = [];
        try {
            setLoading(true)
            for (const type of categories) {
                const url = `${process.env.REACT_APP_API_URL}/products/${type}`
                let res1 = await fetch(url)
                let res1Array = await res1.json()
                initialData = [...initialData, ...res1Array]
            }

            setResponse(initialData)
            setLoading(false)

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
                <ManufacturerListHandler inStock={response} />
            )}
            {!loading && !response && hasError && (
                <h1>Some problems while getting data!!!</h1>
            )}
        </>
    )
}

export default FetchHandler
