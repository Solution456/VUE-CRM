import { $authHost } from "./index";




class ProductServices {
    async fetchProduct() {
        const {data} = await $authHost.get('api/product')
        
        return data
    }

    async createProduct(payload){
        const {data} = await $authHost.post('api/product', {
            product_name: payload.productName,
            product_cost: payload.productCost
        })
        return data
    }
 
}
export default new ProductServices()