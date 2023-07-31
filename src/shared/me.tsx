import { AxiosResponse } from "axios";
import { httpClient } from "./HttpClient"

export let mePromise: Promise<AxiosResponse<{
    resource: {
        id: number;
    };
}>> | undefined

export const refreshMe = () => {
    mePromise = httpClient.get<{ resource: { id: number } }>('/me')
    return mePromise
}

export const fetchMe = refreshMe