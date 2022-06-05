
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
        async fetchOrders({commit, dispatch}){
            try{
                let data
                data = await OrderServices.fetchOrders()

                commit('SET_ORDERS',data)
        
            } catch (er){
                commit('SET_ERROR',er.response.data.message)
                dispatch('Notify',{title:'Ошибка',text:er.response.data.message,type:'error'})
            }
        },

        createOrder({commit,dispatch}, data){
            try{
            OrderServices.createOrder(data).then((resp) => {
                OrderServices.getOneOrderById(resp.order_id).then(order =>{
                    dispatch('Notify',{title:order.order_serial,text:'Заказ успешно создан!',type:'success'})
                    commit('SET_ONE_ORDER',order)
                }).catch(er => {
                    commit('SET_ERROR',er.response.data.message)
                    dispatch('Notify',{title:'Ошибка',text:er.response.data.message,type:'error'})
                })
            }).catch(er => {
                commit('SET_ERROR',er.response.data.message)
                dispatch('Notify',{title:'Ошибка',text:er.response.data.message,type:'error'})
            })
            }catch (er){
                commit('SET_ERROR',er.response.data.message)
                dispatch('Notify',{title:'Ошибка',text:er.response.data.message,type:'error'})
            }
        },

        async fetchOrdersByCusId({commit, dispatch},id){
            try{
                let data
                data = await OrderServices.getAllCustomerOrder(id)

                commit('SET_ORDERS',data)
        
            } catch (er){
                commit('SET_ERROR',er.response.data.message)
                dispatch('Notify',{title:'Ошибка',text:er.response.data.message,type:'error'})
            }
        },

        async updateOrder({commit, dispatch}, payload){
            const {id, status, route} = payload
            try{
                await OrderServices.updateOrderStatus({id,status,route})
                commit('UPDATE_ORDER',payload)
                dispatch('Notify',{title:'Обновление заказа',text:'Заказ успешно обновлен',type:'success'})
            }catch (er){
                commit('SET_ERROR',er.response.data.message)
                dispatch('Notify',{title:'Ошибка',text:er.response.data.message,type:'error'})
            }
        }


        
    }
}