import React from 'react'
// import Storage from './DisplayHandler'
import PaginationHandler from '../listingHandler/PaginationHandler';

function FinalOutputHandler({ finalData }) {

    const groupedData = async () => {

        const finalInfo = await finalData;

        const finalOutput = Object.entries(finalInfo).map(([Category, Product]) => ({ Category, Product }));

        return finalOutput;

    }

    return (
        <>
            <PaginationHandler processedData={groupedData()} />
        </>
    )
}

export default FinalOutputHandler
