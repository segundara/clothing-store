import React, { useEffect, useState } from 'react'
import Storage from './DisplayHandler';

function PaginationHandler({ processedData }) {

    const [refinedData, setRefinedData] = useState(null)
    const [perPage, setPerPage] = useState(10);
    const [pageNumbers, setPageNumbers] = useState(null);

    const getPages = async () => {
        const data = await processedData;
        setRefinedData(data)

        const pages = [];
        data.map((item) => {
            let innerPages = [];
            for (let j = 1; j <= Math.ceil(item.Product.length / perPage); j++) {
                innerPages.push(j);
            }
            pages.push(innerPages);

        })

        setPageNumbers(pages);

    };

    useEffect(() => {
        getPages()
    }, [processedData])

    return (
        <>
            {refinedData && pageNumbers && (
                <Storage refinedData={refinedData} pageNumbers={pageNumbers} />
            )}
        </>
    )
}

export default PaginationHandler
