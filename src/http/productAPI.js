import { $authHost } from "./index";




class ProductServices {
    async fetchProduct() {
        const {data} = await $authHost.get('api/product')
        
        return data
    }
 
}
export default new ProductServices()