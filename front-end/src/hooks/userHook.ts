import { useMutation } from "@tanstack/react-query";
import apiClient from './../apiClient';
import { UserInfo } from "../types/UserInfo";

export const signinMutate = () => useMutation({
    mutationFn: async ({
        email,
        password,
    }: {
        email: string,
        password: string,
    }
    ) => (
        await apiClient.post<UserInfo>(`api/users/signin`, {
            email,
            password
        })
    ).data,
})

export const signupMutate = () => useMutation({
    mutationFn: async ({
        name,
        email,
        password,
    }: {
        name: string
        email: string,
        password: string,
    }
    ) => (
        await apiClient.post<UserInfo>(`api/users/signup`, {
            name,
            email,
            password
        })
    ).data,
})