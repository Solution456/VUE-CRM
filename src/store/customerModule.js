
import CustomerServices from '@/http/customerAPI.js'


export const customerModule = {
    state: () => ({
       OneCustomer:{},
       Customers:{
       }
    }),

    getters: {
        getCustomer: (state) => state.OneCustomer
    },

    mutations:{ 
        SET_ONE_CUSTOMER(state, data){
            state.OneCustomer = data
        }
    },

    actions:{
        async fetchCustomerById({commit},id){
            try{
                let data
                data = await CustomerServices.getCustomerById(id)

                commit('SET_ONE_CUSTOMER',data)
        
            } catch (er){
                commit('SET_ERROR',er.response.data.message)
            }
        },

        async fetchCustomerWithOrders({commit}){
            try{
                const data = await CustomerServices.getCustomers()
                return data

            }catch(er){
                commit('SET_ERROR',er.response.data.message)
            }
        }

        
    }
}