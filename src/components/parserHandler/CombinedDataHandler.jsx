import React from 'react'
import GroupedByCategoryHandler from './GroupedByCategoryHandler';

function CombinedDataHandler({ availabilityArray, inStock }) {

    const getCombinedData = async () => {
        let finalData = [];

        const availabilityData = await availabilityArray;

        for (let j = 0; j < inStock.length; j++) {
            let element = inStock[j];
            for (let k = 0; k < availabilityData.length; k++) {
                const availabilityInfo = availabilityData[k];

                if (element.id.toUpperCase() === availabilityInfo.id) {
                    const availability = availabilityInfo.DATAPAYLOAD
                    finalData = [...finalData, { ...element, availability }]
                    break;
                }
            }
        }

        return finalData;
    }

    return (
        <div>
            <GroupedByCategoryHandler combinedData={getCombinedData()} />
        </div>
    )
}

export default CombinedDataHandler
