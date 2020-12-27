export const state = () => ({
  loggedIn: true
})

export const mutations = {
  redirectUnAuthUsers(){

  }
}

export const actions = {
}

export const getters = {
  getLoginState: (state) => {
    return state.loggedIn
  }
}
