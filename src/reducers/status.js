export default function (state = {}, action) {
    switch (action.type) {

        case "LOADING_STARTS":
            return {
                ...state,
                isLoading: true,
            };
        case "LOADING_DONE":
            return {
                ...state,
                isLoading: false,
            };
        case "HAS_ERROR":
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}