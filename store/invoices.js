export const state = () => ({
  list: [
    {number: '000018', customer: 'Ali Hameed', startDate: '', dueDate: '01-01-2020', amount: 'MVR 2000', balance: 'MVR 2000', total: 2000, paid: 0, due: 2000, paymentStatus: 'missed'},

    {number: '000019', customer: 'Ali Shareef', startDate: '', dueDate: '15-12-2020', amount: 'MVR 2200', balance: 'MVR 0', total: 2200, paid:2200, due: 0, paymentStatus: 'due'},

    {number: '000020', customer: 'Saeed', startDate: '', dueDate: '07-12-2020', amount: 'MVR 2500', balance: 'MVR 0', total: 2500, paid: 2500, due: 0, paymentStatus: 'paid'},
  ]
})

export const mutations = {
  addInvoice(state, inv) {
    state.list.push(inv)
  }
}

export const actions = {

}

export const getters = {

}
