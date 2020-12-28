export const state = () => ({
  clientDataForEdit:{}
})

export const mutations = {
  fillEditData(state,data){
    console.log(state.clientDataForEdit);
    state.clientDataForEdit = {...data};
  }
}

export const actions = {

}

export const getters = {

}
