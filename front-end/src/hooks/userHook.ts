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


export const nameMutate = () => useMutation({
    mutationFn: async({
        name,
        email,
    }: {
        name: string,
        email: string,
    }) =>  {
        const userInfo = JSON.parse(localStorage.getItem('userInfo')!)
        const updateInfo = {...userInfo, name, email}
        const res = await apiClient.put<UserInfo>(`api/users/updateemail`, updateInfo)
        console.log(res)
        localStorage.setItem('userInfo', JSON.stringify(res.data))
        
        return res.data
    }
})