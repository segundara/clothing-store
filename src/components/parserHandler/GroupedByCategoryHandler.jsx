import React from 'react'
import FinalOutputHandler from './FinalOutputHandler';

function GroupedByCategoryHandler({ combinedData }) {

    const groupedData = async () => {

        const combinedInfo = await combinedData;

        const groupedByType = combinedInfo.reduce((r, a) => {
            r[a.type] = r[a.type] || [];
            r[a.type].push(a);
            return r;
        }, Object.create(null));

        return groupedByType;

    }
    return (
        <>
            <FinalOutputHandler finalData={groupedData()} />
        </>
    )
}

export default GroupedByCategoryHandler
