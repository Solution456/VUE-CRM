




export const utilsModule = {

    state: () => ({
        error:'',
        success:'',
        isLoading:false,
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
        }
    },

    getters: {
        isLoading: (state) => state.isLoading,
        error: (state) => state.error,
        success: (state) => state.success
    }




}