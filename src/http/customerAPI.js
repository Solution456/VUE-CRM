import { $authHost } from "./index";




class customerServices {
    async getCustomerById(id) {
        const {data} = await $authHost.get(`api/customer/one/${id}`)
        
        return data
    }

    async getCustomerInfo(id) {
        const {data} = await $authHost.get(`api/customer/${id}`)
        return data
    }

    async getCustomers() {
        const {data} = await $authHost.get(`api/customer`)
        return data
    }

}
export default new customerServices()