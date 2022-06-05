import {  $authHost, $host } from "./index";

import jwt_decode from 'jwt-decode'


class AuthServices {
    async login(user) {
        console.log(user)
        const {data} = await $host.post('api/user/login', {
            "email": user.email,
            "password": user.password
        })
        localStorage.setItem('token', data.accessToken)
        return jwt_decode(data.accessToken)
    }

    async check(){
        const {data} = await $authHost.get('api/user/auth')
        localStorage.setItem('token', data.token)
        return jwt_decode(data.token)

    }

    async register(user){
        const {data} = await $host.post('api/user/registration',{
            email:user.Email, 
            password:user.password,
            customer_name:user.name,
            customer_organisation:user.company,
            customer_phone:user.phone,
            customer_address:user.address
        })

        return data
    }

    async createOperator(payload){
        const {data} = await $authHost.post('api/user/createOperator', {...payload})
        
        return data.status

    }
   
    // logout(){
    //     localStorage.removeItem('user')
    // }

    // register(user) {
    //     return axios.post(API_URL + 'register',{
    //         email: user.email,
    //         password: user.password
    //     })
    // }
}
export default new AuthServices()