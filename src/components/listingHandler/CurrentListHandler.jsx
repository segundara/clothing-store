import React, { useEffect, useState } from 'react'
import Storage from './DisplayHandler';

function CurrentListHandler({ refinedData, pageNumbers }) {

    const [data, setData] = useState(null)
    const [perPage, setPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const showCurrentPage = (pageNum) => setCurrentPage(pageNum);

    const showCurrentList = () => {
        let currentDisplay = []
        for (let i = 0; i < refinedData.length; i++) {
            currentDisplay[i] = {}
            for (let item in refinedData[i]) {
                currentDisplay[i][item] = refinedData[i][item];
            }
        }

        for (let j = 0; j < currentDisplay.length; j++) {
            const element = currentDisplay[j];
            element.Product = element.Product.slice(currentPage * perPage - perPage, currentPage * perPage)
        }

        setData(currentDisplay)
    }

    useEffect(() => {
        showCurrentList()
    }, [currentPage])

    return (
        <>
            {data && perPage && currentPage && (
                <Storage
                    data={data}
                    perPage={perPage}
                    currentPage={currentPage}
                    pageNumbers={pageNumbers}
                    refinedData={refinedData}
                    updateCurrentPage={showCurrentPage}
                />
            )}
        </>
    )
}

export default CurrentListHandler
