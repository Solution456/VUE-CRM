import customerServices from '@/http/customerAPI'
import operatorServices from '@/http/operatorAPI'
import AuthService from '@/http/authAPI.js'
import axios from 'axios'

export const userModule = {
    state: () => ({
        isAuth:false,
        user:{
            id:'',
            role:'',
            email:'',
            customer:{},
            operator:{}
        }
    }),

    getters: {
        isAuth: (state) => state.isAuth,
        role: (state) => state.user.role,
        department: (state) => state.user.operator['operator_department']
    },

    mutations:{
        SET_USER(state, user){
            state.user.id = user.id
            state.user.role = user.role
            state.user.email = user.email
            state.isAuth = user.isAuth

        },

        SET_CUSTOMER(state, customer){
            state.user.customer = customer
        },

        SET_OPERATOR(state, operator){
            state.user.operator = operator
        },

        UNSET_USER(state){
            let user = {
                id:'',
                role:'',
                email:'',
                customer:{},
                operator:{}
            }
            state.user = user
            state.isAuth = false
        }

    },

    actions:{
        async login({commit}, payload){
            try{
                commit('SET_LOADING',true)
                let data
                let userLogin = {
                    email:payload.email,
                    password:payload.password
                }
                data = await AuthService.login(userLogin)
                if(data.role ==='CUSTOMERS'){
                    let customer = await customerServices.getCustomerInfo(data.id)
                    commit('SET_CUSTOMER',customer)
                }else if(data.role ==='OPERATOR'){
                    let operator = await operatorServices.getOperatorInfo(data.id)
                    commit('SET_OPERATOR',operator)
                }
                data.isAuth = true
                commit('SET_USER',data)
                commit('SET_LOADING',false)
                
        
            } catch (er){
                commit('SET_ERROR',er.response.data.message)
            }
        },

        async register({commit}, payload){
            try{
                commit('SET_LOADING',true)
                const data = await AuthService.register(payload)
                commit('SET_SUCCESS',data)
                commit('SET_LOADING',false)
            }catch(er){
                commit('SET_ERROR',er.response.data.message)
            }
        },


        logout({commit}){
            return new Promise((resolve) => {
                commit('UNSET_USER')
                localStorage.removeItem('token')
                delete axios.defaults.headers.common['Authorization']
                resolve()
            })
        },

        STATE_CHANGED({commit}){
            AuthService.check().then(user =>{
                user.isAuth = true
                commit('SET_USER',user )
                if(user.role === 'CUSTOMERS'){
                    customerServices.getCustomerInfo(user.id).then((customer) =>{
                        commit('SET_CUSTOMER',customer)
                    }).catch(er => {
                        commit('SET_ERROR',er.response.data.message)
                    })
                }else if(user.role === 'OPERATOR'){
                    operatorServices.getOperatorInfo(user.id).then((operator)=>{
                        commit('SET_OPERATOR',operator)
                    }).catch(er => {
                        commit('SET_ERROR',er.response.data.message)
                    })
                }
            }).catch(er => {
                commit('SET_ERROR',er.response.data.message)
            })

        }

        
    }
}