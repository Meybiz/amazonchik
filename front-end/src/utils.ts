import { ApiEr } from "./types/ApiEr";

export const getError = (error: ApiEr) => {
    return error.response && error.response.data.message ? error.response.data.message : error.message
}