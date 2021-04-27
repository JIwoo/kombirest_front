import { createStore } from 'vuex';
import axios from 'axios';
const requestHost = ""

export default createStore({

    state: {
        _page: {
            product: 1,
            productSize: 30,
            board: 1,
            boardSize: 30,
            mypage: 1,
            mypageSize: 30,
            follow: 1,
            followSize: 20
        },
        _tokens: {
            accessToken: '',
            refreshToken: ''
        },
        _count: {
            boardCount: 0,
            itemCount: 0,
            followerCount: 0,
            followingCount: 0,
            productCount: 0
        },
        _state: {
            loadingBool: false,
            itemDetailBool: false,
            alertBool: false,
            reportBool: false,
            reportPopBool: false,
            loginState: false,
            lastIndexBool: true,
            detailBool: false,
            boardLastIndexBool: true,
            listScrollBool: false,
            footerloadingBool: false,
            introBool: true
        },
        _type: {
            form: [],
            boardCode: -9999,
            reportCode: -9999,
            code: -9999,
            msg: '',
            detailIdx: 0,
            event: '',
            headerSelected: undefined,
            profile: null
        },
        _modal: {
            modalState: false,
            alertState: false,
            confirmState: false,
            msg: '',
            event: ''
        },
        _items: {
            list: [],
            item: [],
            myitem: [],
            useritem: [],
            detail: [],
            update: [],
            follow: [],
            following: [],
            follower: [],
            myinfo: []
        }
    },
    mutations: {
        setSearchList(state, response) {
            if (response.value.code == 0) {
                state._items.list = response.value.datas
            }
        },
        setHotList(state, response) {
            if (response.value.code == 0) {
                setTimeout(() => {
                    if (state._page.product === 1) {
                        state._items.list = response.value.datas
                    }
                    else {
                        let count = response.value.datas.length
                        if (count > 0) {
                            state._items.list = [
                                ...state._items.list,
                                ...response.value.datas
                            ]
                        }
                        else {
                            state._state.lastIndexBool = false
                        }
                    }         
                    state._page.product += state._page.productSize     
                }, 500)                                     
            }            
        },
        setNewList(state, response) {
            if (response.value.code == 0) {
                setTimeout(() => {
                    if (state._page.product === 1) {
                        state._items.list = response.value.datas
                        state._items.list.sort(function (a, b) {
                            return a - b;
                        });
                    }
                    else {
                        let count = response.value.datas.length
                        if (count > 0) {
                            state._items.list = [
                                ...state._items.list,
                                ...response.value.datas
                            ]
                        }
                        else {
                            state._state.lastIndexBool = false
                        }
                    }
                    state._page.product += state._page.productSize               
                }, 500)                     
            }   
        },
        setMyProductList(state, response) {
            if (response.value.code == 0) {
                state._items.myitem = response.value.datas
                state._count.followerCount = response.value.datas.info.followerCount
                state._count.followingCount = response.value.datas.info.followingCount
                state._count.productCount = response.value.datas.product ? response.value.datas.product.length : 0
            } 
        },
        setUserProductList(state, response) {
            if (response.value.code == 0) {
                state._items.useritem = response.value.datas
                state._count.followerCount = response.value.datas.info.followerCount
                state._count.followingCount = response.value.datas.info.followingCount
                state._count.productCount = response.value.datas.product ? response.value.datas.product.length : 0
            }
        },
        setMyActivityList(state, response) {
            if (response.value.code == 0) {
                //state.myactivity = response.value.datas
            }
        },
        setBoardList(state, response) {
            console.log("Asfasf", response)
            if (response.value.code == 0) {
                const count = response.value.datas.length
                for (let i = 0; i < count; i++) {
                    let index = response.value.datas[i].regDt.lastIndexOf(":")                    
                    response.value.datas[i].regDt = response.value.datas[i].regDt.substring(0, index).replace("T", " ")
                }

                state._items.detail.board = []
                state._items.detail.board = response.value.datas
                state._count.boardCount = count
            }
        },
        setBoardScroll(state, response) {
            if (response.value.code == 0) {
                const count = response.value.datas.length
                if (count > 0) {
                    for (let i = 0; i < count; i++) {
                        let index = response.value.datas[i].regDt.lastIndexOf(":")
                        response.value.datas[i].regDt = response.value.datas[i].regDt.substring(0, index).replace("T", " ")

                        //state._items.detail.board.push(response.value.datas[i])
                        state._items.detail.board = [
                            ...state._items.detail.board,
                            response.value.datas[i]
                        ]
                    }
                    state._page.board = state._page.board + state._page._boardSize
                }
                else {
                    state._state.boardLastIndexBool = false
                }                
            }
            state._state.footerloadingBool = false
        },      
        setItemList(state, response) {
            if (response.value.code == 0) {
                state._items.item = response.value.datas
            }
        },
        setMyPageList(state, response) {
            if (response.value.code == 0) {
                state._items.mypage = response.value.datas
            }
        },
        setMyFollowingList(state, response) {
            if (response.value.code == 0) {
                state._items.following = response.value.datas
            }
        },
        setMyFollowList(state, response) {
            if (response.value.code == 0) {
                state._items.follow = response.value.datas
            } 
        },
        setMyFollowerList(state, response) {
            if (response.value.code == 0) {
                state._items.follower = response.value.datas
            } 
        },
        setMyFollowerDisconnect(state, response) {
            if (response.value.code == 0) {
                state._count.followerCount -= 1
            }
        },
        setMyFollowingDisconnect(state, response) {
            if (response.value.code == 0) {
                state._count.followingCount -= 1
            }
        },
        setDetail(state, response) {
            if (response.value.code == 0) {
                let count = response.value.datas.board.length
                let itemCount = response.value.datas.items.length
                let board = response.value.datas.board

                for (let i = 0; i < count; i++) {
                    let index = board[i].regDt.lastIndexOf(":")
                    response.value.datas.board[i].regDt = board[i].regDt.substring(0, index).replace("T", " ")
                }

                for (let i = 0; i < itemCount; i++) {                    
                    response.value.datas.items[i]["temp"] = false
                }

                state._items.detail = response.value.datas;
                state._count.boardCount = count;
                state._count.itemCount = response.value.datas.items.length;
            }
        },
        setUpdate(state, response) {
            if (response.value.code == 0) {
                let count = response.value.datas.board.length
                let itemCount = response.value.datas.items.length
                let board = response.value.datas.board

                for (let i = 0; i < count; i++) {
                    let index = board[i].regDt.lastIndexOf(":")
                    response.value.datas.board[i].regDt = board[i].regDt.substring(0, index).replace("T", " ")
                }

                for (let i = 0; i < itemCount; i++) {
                    response.value.datas.items[i]["temp"] = false
                }

                state._items.update = response.value.datas;
            }
        },
        setProduct(state, response) {
            if (response.value) {
                if (response.value.code == 0) {
                    if (response.value.datas) {
                        //state._tokens.accessToken = response.value.datas;
                        //localStorage.accessToken = response.value.datas;
                    }
                }
            }
            state._type.form = []
        },
        setBoard(state, response) {      
            if (response.value) {
                if (response.value.code == 0) {
                    if (response.value.datas) {
                        //state._tokens.accessToken = response.value.datas;
                        //localStorage.accessToken = response.value.datas;
                    }
                }
            }   
        },
        setItem(state) {
            if (state._items.item.length < 21) {
                state._items.item.push({
                    "pageUrl": "",
                    "itemNm": "",
                    "model": "",
                    "temp": false
                });
            }            
        },
        setItemDel(state, index) {
            if (state._items.item.length > 0) {
                state._items.item.splice(index, 1)             
            }
        },
        setActivity(state, response) {
            state._type.code = response.value.code;
        },
        setDetailIdx(state, response) {
            state.detailIdx = response;
        },
        setItemMultiList(state, response) {
            if (response.value.code == 0) {
                let count = response.value.datas.length;
                let temp = response.value.datas;
                for (let i = 0; i < count; i++) {
                    state._items.item.push(temp[i])
                }                
            }
        },
        setPwdReset(response) {
            console.log("setPwdReset", response)
        },
        setFindPwd(response) {
            console.log("setFindPwd", response)
        },
        setJoin(response) {
            console.log("setJoin", response)
        },
        setLogin(state, response) {
            if (response.value.code == 0) {
                localStorage.clear()
                localStorage.accessToken = response.value.accessToken;
                //localStorage.refreshToken = response.value.refreshToken;
                localStorage.nickname = response.value.nickName;
                localStorage.profile = response.value.profile
                state._state.loginState = true
                state._type.profile = response.value.profile
            }      
        },
        setLogOut(response) {
            console.log("setLogOut", response)
            localStorage.clear()
        },
        setForm(state, data) {
            state._type.form = data
            console.log("setForm", state._type.form)
        },
        setReport(state, response) {
            if (response.value.code == 0) {
                state._state.reportBool = true
                state._type.msg = "�Ű��Ǿ����ϴ�."
            }  
        },
        setChoice(state, response) {
            if (response.value?.code == 0) {           
                if (state._items.detail.product?.choiceState) {
                    state._items.detail.product.choice -= 1
                    state._items.detail.product.choiceState = false
                }
                else {
                    state._items.detail.product.choice += 1
                    state._items.detail.product.choiceState = true
                }
            } 
        },
        setLoginState(state, type) {
            state._state.loginState = type
        },
        setLoadingState(state, type) {
            state._state.loadingBool = type
        },
        setfooterLoadingState(state, type) {
            state._state.footerloadingBool = type
        },
        setAlertState(state, type) {
            state._state.alertBool = type
        },
        setLoadingDelay(state, value) {
            setTimeout(() => {
                state._state.loadingBool = false
            }, value)
        },
        setBaseToken(token) {
            if (token) {
                localStorage.clear()
                localStorage.accessToken = token
            }            
        },
        setScrollState(state, type) {
            state._state.listScrollBool = type
        },
        setMyInfoUpdate(state, response) {
            if (response.value.code == 0) {
                if (response.value.datas?.nick) {                    
                    localStorage.nickname = response.value.datas.nick
                }
                if (response.value.datas?.profile) {
                    state._type.profile = response.value.datas.profile
                    localStorage.profile = response.value.datas.profile
                }
            }  
        }
    },
    actions: {
        async acCallGet({ state, commit }, request) {
            try {
                const response = await axios.get(requestHost + request.url, {
                    params: request.param,
                    withCredentials: true
                })
                commit('setLoadingDelay', 500)
                commit(request.callback, { value: response.data.result })
                return response
            }
            catch (error) {
                state._state.loadingBool = false
                return error
            }
            finally {
                commit('setLoadingState', false)
            }
        },

        async acCallAuthGet({ commit }, request) {
            try {
                const response = await axios.get(requestHost + request.url, {
                    params: request.param,
                    headers: {
                        'Cache-Control': 'max-age=31536000',
                        'Authorization': `Bearer ${request.token}`
                    },
                    withCredentials: true
                })
                commit(request.callback, { value: response.data.result })
                if (response.data?.accessToken) {
                    localStorage.accessToken = response.data.accessToken
                }
                return response
            }
            catch (error) {
                return error
            }
            finally {
                commit('setLoadingState', false)
            }
        },

        async acCallPost({ commit }, request) {
            try {
                const response = await axios.post(requestHost + request.url, request.param, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${request.token}`
                    },
                    withCredentials: true
                })

                if (response.data?.result?.datas?.accessToken) {
                    localStorage.accessToken = response.data.result.datas.accessToken
                }
                commit(request.callback, { value: response.data.result })
                return response
            }
            catch (error) {
                return error
            }
            finally {
                commit('setLoadingState', false)
            }
        },
        async acCallAuthPost({ state, commit }, request) {
            try {
                const response = await axios.post(`${requestHost}${request.url}`, request.param, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${request.token}`
                    },
                    withCredentials: true
                })

                if (response.data?.result?.datas?.accessToken) {
                    localStorage.accessToken = response.data.result.datas.accessToken
                }

                commit(request.callback, { value: response.data.result })
                return response
            }
            catch (error) {
                return error
            }
            finally {
                state._state.loadingBool = false
            }
        },
        async acCallAuthPut({ commit }, request) {
            try {
                const response = await axios.put(requestHost + request.url, request.param, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${request.token}`
                    },
                    withCredentials: true
                })
                if (response.data?.result?.datas?.accessToken) {
                    localStorage.accessToken = response.data.result.datas.accessToken
                }
                commit(request.callback, { value: response.data.result })
                return response
            }
            catch (error) {
                return error
            }
            finally {
                commit('setLoadingState', false)
            }
        },
        async acCallAuthDelete({ commit }, request) {
            try {
                const response = await axios.delete(requestHost + request.url, {
                    params: request.param,
                    headers: {
                        'Authorization': `Bearer ${request.token}`
                    },
                    withCredentials: true
                })
                if (response.data?.result?.datas?.accessToken) {
                    localStorage.accessToken = response.data.result.datas.accessToken
                }
                commit(request.callback, { value: response.data.result })
                return response
            }
            catch (error) {
                return error
            }
            finally {
                commit('setLoadingState', false)
            }
        },
        acFormSet({ commit }, value) {
            commit("setForm", value)
        },
        acItemSet({ commit }) {
            commit("setItem")
        },
        acItemDel({ commit }, value) {
            commit("setItemDel", value)            
        },
        acloginState({ commit }, type) {
            commit("setLoginState", type)
        },
        acloadingState({ commit }, type) {
            commit("setLoadingState", type)
        },
        acfooterloadingState({ commit }, type) {
            commit("setfooterLoadingState", type)
        },  
        acalertState({ commit }, type) {
            commit("setAlertState", type)
        },
        acScrollState({ commit }, type) {
            commit("setScrollState", type)
        }
    },
    getters: {
    },
    modules: {
    }
})
