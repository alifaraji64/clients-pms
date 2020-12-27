export const state = () => ({
  list: [
    {nid: 'A300022', name: 'Ali Hameed', email: 'mail@ali.com', phone: '3323399', mobile: '9939399', address: 'Ma. Mamee, Chaandhanee, Malé'},
    {nid: 'A323444', name: 'Ali Shareef', email: 'reef@sha.com', phone: '-', mobile: '7939399', address: 'M. Asraf, Maamemdhoo'},
    {nid: 'A323666', name: 'Saeed', email: 'saeed@bd.com', phone: '-', mobile: '7936699', address: 'Dhaka, Bangladesh'},
  ]
})

export const mutations = {
  add(state, client) {
    state.list.push(client);
  }
}

export const actions = {

}

export const getters = {

}
