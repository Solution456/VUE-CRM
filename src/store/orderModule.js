
import OrderServices from '@/http/orderAPI.js'



export const orderModule = {
    state: () => ({
       orders:[]
    }),

    getters: {
     orders: (state) => state.orders,

    },

    mutations:{
        SET_ORDERS(state,orders){
            state.orders = orders
        },

        SET_ONE_ORDER(state, order){
            state.orders.push(order)
        },
        UPDATE_ORDER(state,payload){
            const id = state.orders.findIndex(item => item.order_id === payload.id)
            console.log(id)
            state.orders[id].order_status = payload.status
        }

        

    },

    actions:{
        async fetchOrders({commit}){
            try{
                let data
                data = await OrderServices.fetchOrders()

                commit('SET_ORDERS',data)
        
            } catch (er){
                commit('SET_ERROR',er.response.data.message)
            }
        },

        createOrder({commit}, data){
            try{
            OrderServices.createOrder(data).then((resp) => {
                OrderServices.getOneOrderById(resp.order_id).then(order =>{
                    commit('SET_ONE_ORDER',order)
                }).catch(er => {
                    commit('SET_ERROR',er.response.data.message)
                })
            }).catch(er => {
                commit('SET_ERROR',er.response.data.message)
            })
            }catch (er){
                commit('SET_ERROR',er.response.data.message)
            }
        },

        async fetchOrdersByCusId({commit},id){
            try{
                let data
                data = await OrderServices.getAllCustomerOrder(id)

                commit('SET_ORDERS',data)
        
            } catch (er){
                commit('SET_ERROR',er.response.data.message)
            }
        },

        async updateOrder({commit}, payload){
            const {id, status, route} = payload
            try{
                await OrderServices.updateOrderStatus({id,status,route})
                commit('UPDATE_ORDER',payload)
            }catch (er){
                commit('SET_ERROR',er.response.data.message)
            }
        }


        
    }
}