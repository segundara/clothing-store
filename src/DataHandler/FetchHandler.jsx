import React from 'react'

function FetchHandler(api) {
    const [response, setResponse] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [hasError, setHasError] = React.useState(false)

    const getManufacturers = (array) => {
        const manufacturerSET = new Set()
        for (let i = 0; i < array.length; i++) {
            const element = array[i];
            manufacturerSET.add(element.manufacturer)
        }
        return [...manufacturerSET]
    }

    React.useEffect(() => {
        try {
            setLoading(true)
            fetch(api)
                .then(res => res.json())
                .then(data => {
                    for (let i = 0; i < getManufacturers(data).length; i++) {
                        const element = getManufacturers(data)[i];
                        fetch(`${process.env.REACT_APP_API_URL}/availability/${element}`)
                            .then((response) => response.json())
                            .then((responseObject) => {
                                for (let j = 0; j < responseObject.response.length; j++) {
                                    let xmlString = responseObject.response[j].DATAPAYLOAD
                                    const parser = new DOMParser()
                                    const xmlFormat = parser.parseFromString(xmlString, "application/xml")

                                    for (const item of data) {
                                        if (responseObject.response[j].id && item.id.toUpperCase() === responseObject.response[j].id.toUpperCase()) {
                                            item.availability = xmlFormat.getElementsByTagName("INSTOCKVALUE")[0].childNodes[0].nodeValue

                                        }

                                    }
                                }
                            })

                    }
                    setResponse(data)
                    setLoading(false)
                })
        } catch (error) {
            setHasError(true)
            setLoading(false)
        }
    }, [api])
    return [response, loading, hasError]
}

export default FetchHandler
