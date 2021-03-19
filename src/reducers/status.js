export default function statusReducer(state = {}, action) {
    switch (action.type) {
        case "LOADING_STARTS":
            return {
                ...state,
                isLoading: true,
                error: false
            };
        case "LOADING_DONE":
            return {
                ...state,
                isLoading: false,
                error: false
            };
        case "HAS_ERROR":
            return {
                ...state,
                isLoading: false,
                error: true,
            };
        default:
            return state;
    }
}