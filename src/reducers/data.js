export default function (state = {}, action) {
    switch (action.type) {

        case "GET_PRODUCT_LIST":
            return {
                ...state,
                products: action.payload,
            };
        case "GET_MANUFACTURER_LIST":
            return {
                ...state,
                manufacturers: action.payload,
            };
        case "GET_AVAILABILITY_INFO":
            return {
                ...state,
                availabilityInfo: action.payload,
            };
        case "GET_COMBINED_DATA":
            return {
                ...state,
                combinedData: action.payload,
            };
        case "GET_GROUPED_DATA":
            return {
                ...state,
                groupedByCategory: action.payload,
            };
        case "GET_FINAL_DATA":
            return {
                ...state,
                finalOutput: action.payload,
            };
        case "GET_PAGE_NUMBERS":
            return {
                ...state,
                pageNumbers: action.payload,
            };
        case "GET_CURRENT_LISTING":
            return {
                ...state,
                currentList: action.payload,
            };
        case "GET_CURRENT_PAGE":
            return {
                ...state,
                currentPage: action.payload,
            };
        case "GET_PER_PAGE":
            return {
                ...state,
                perPage: action.payload,
            };
        default:
            return state;
    }
}