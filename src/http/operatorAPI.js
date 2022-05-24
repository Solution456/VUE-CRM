import { $authHost } from "./index";


class operatorServices{
    async getOperatorInfo(id){
        const {data} = await $authHost.get(`api/operator/${id}`)

        return data
    }
}


export default new operatorServices()