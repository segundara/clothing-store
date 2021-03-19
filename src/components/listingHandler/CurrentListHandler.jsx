import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";

const CurrentListHandler = () => {

    const dispatch = useDispatch();
    const state = useSelector(state => state)

    useEffect(() => {

        const showCurrentList = () => {
            let currentDisplay = []
            const refinedData = state.data.finalOutput
            for (let i = 0; i < refinedData.length; i++) {
                currentDisplay[i] = {}
                for (let item in refinedData[i]) {
                    currentDisplay[i][item] = refinedData[i][item];
                }
            }

            for (let j = 0; j < currentDisplay.length; j++) {
                const element = currentDisplay[j];
                element.Product = element.Product.slice(state.data.currentPage * state.data.perPage - state.data.perPage, state.data.currentPage * state.data.perPage)
            }

            dispatch({
                type: "GET_CURRENT_LISTING",
                payload: currentDisplay
            });
        }

        showCurrentList()

    }, [dispatch, state.data.finalOutput, state.data.perPage, state.data.currentPage])

    return (
        <></>
    )
}

export default CurrentListHandler
