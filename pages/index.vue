<template>
  <div id="dashboard-page">
    <TheNavigation />

    <TheTitleAndSearchBar pageName="Dashboard" listPath="/clients" createPath="/clients/create" />

    <div class="page-content">
      <div class="container">
        <div class="row">
          <div class="col">
            <div class="table-responsive">
              <table class="table">
                <thead>
                <tr>
                  <th>Month Pending</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>{{ dueInvoices() }} invoices.</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="col">
            <div class="table-responsive">
              <table class="table">
                <thead>
                <tr>
                  <th>Month Paid</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>{{ paidInvoices() }} invoices.</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <TheFooter />
  </div>
</template>

<script>
import TheNavigation from "../components/global/TheNavigation";
import TheTitleAndSearchBar from "../components/shared/TheTitleAndSearchBar";
import TheFooter from "../components/global/TheFooter";

import { mapState } from 'vuex'
export default {
  components: {TheFooter, TheTitleAndSearchBar, TheNavigation},
  computed: {
    ...mapState({

    })
  },

  methods: {
    dueInvoices() {
      //let dueInvoices = this.invoices.filter(inv => parseFloat(inv.due) > 0)
      //return dueInvoices.length
    },

    paidInvoices() {
      //let paidInvoices = this.invoices.filter(inv => parseFloat(inv.due) === 0)
      //return paidInvoices.length
    }
  },
    middleware({ store, redirect }) {
      console.log(store.$fire.auth);
    //redirect to login if user is not logged in
    if(!store.$fire.auth.currentUser){
      return redirect('/login')
    }
  }
}
</script>

<style>
</style>
