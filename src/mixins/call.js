export const axiosCall = {
    methods: {
        fnRefresh(params) {
            let { base, request } = params[0]
            this.$store.dispatch({
                type: base.action,
                url: base.url,
                param: request,
                token: `${localStorage.accessToken},${localStorage.refreshToken}`,
                callback: base.callback
            })     
            .then((res) => {
                if (res.data?.result) {
                    if (base.vue_callback) {
                        base.vue_callback(res.data.result)
                    }
                }
                else {
                    if (res.response.status === 401) {
                        localStorage.clear()
                    }
                    else if (base.vue_callback) {
                        base.vue_callback(res.response.data)
                    }            
                }
            })
            .catch((error) => {
                console.log("fnRefresh", error.response)             
            })            
        }, 
        fnCall(params) {
            let { base, request } = params[0]
            this.$store.dispatch({
                type: base.action,
                url: base.url,
                param: request,
                token: localStorage.accessToken,
                callback: base.callback
            })
            .then((res) => {
                console.log("res : ", res)
                if (res.data?.result) {
                    if (base.vue_callback) {
                        base.vue_callback(res.data.result)
                    }
                }
                else {
                    if (res.response.status === 401) {
                        localStorage.clear()
                        if (base.vue_callback) {
                            base.vue_callback(res.response.data)
                        }
                    }
                    else {
                        if (base.vue_callback) {
                            base.vue_callback(res.response.data)
                        }
                    }
                }
            })
            .catch((error) => {
                console.log("catch", error)
            })
        }        
    }
}