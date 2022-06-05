import { notify } from "@kyvg/vue3-notification";




export const utilsModule = {

    state: () => ({
        error:'',
        success:'',
        isLoading:false,
        Notify:false
    }),

    mutations:{
        SET_LOADING(state, payload){
            state.isLoading = payload
        },

        SET_ERROR(state, message){
            state.error = message
        },

        SET_SUCCESS(state,message){
            state.success = message
            setTimeout(() => {
                state.success = ''
            },5000)
        },

        SET_NOTIFY(state,booleen){
            state.Notify = booleen
        }
    },

    actions:{
        Notify: ({commit},payload) =>{
            commit('SET_NOTIFY',true)
            notify({
                title:payload.title,
                type: payload.type, 
                text: payload.text
            })
            commit('SET_NOTIFY',false)
        }
    },

    getters: {
        isLoading: (state) => state.isLoading,
        error: (state) => state.error,
        success: (state) => state.success
    }




}