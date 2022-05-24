import { $authHost } from "./index";




class OrderServices {
    async fetchOrders() {
        const {data} = await $authHost.get('api/order')
        
        return data
    }

    async createOrder(order){
        const {data} = await $authHost.post('api/order',{
            "customerCustomerId":order.id,
            "order_date":null,
            "selectProduct":order.products
        })
        return data
    }

    async getOneOrderById(id){
        const {data} = await $authHost.get(`api/order/${id}`)
        return data
    }

    async getAllCustomerOrder(id){
        const {data} = await $authHost.get(`api/order/all/${id}`)
        return data
    }

    async updateOrderStatus(payload){
        const {route, status, id} = payload
        const {data} = await $authHost.put(`api/order/update/${id}`,{
            route,
            status
        })
        return data.status
    }

  
}
export default new OrderServices()