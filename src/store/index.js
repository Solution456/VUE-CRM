import { createStore } from 'vuex'
import {userModule,} from "@/store/userModule"
import {orderModule} from "@/store/orderModule"
import {customerModule} from '@/store/customerModule'
import {utilsModule} from '@/store/utilsModule'

export default createStore({

  modules: {
    user: userModule,
    orders:orderModule,
    customers:customerModule,
    utils:utilsModule
  }
})
