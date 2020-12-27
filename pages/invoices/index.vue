<template>
  <div id="invoices-page">
    <TheNavigation />

    <TheTitleAndSearchBar pageName="Invoices" listPath="/invoices" createPath="/invoices/create" />

    <div class="page-content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-12">
            <div class="table-responsive">
              <table class="table">
                <thead>
                <tr>
                  <th>Invoice #</th>
                  <th>Client</th>
                  <th>Due Date</th>
                  <th>Amount</th>
                  <th>Balance</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(invoice, index) in invoices" :key="index">
                  <td>{{invoice.number}}</td>
                  <td>{{invoice.customer}}</td>
                  <td :class="invoice.paymentStatus === 'missed'?'text-danger':''">{{invoice.dueDate}}</td>
                  <td>{{invoice.amount}}</td>
                  <td>{{invoice.balance}}</td>
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
  import TheNavigation from "@/components/global/TheNavigation";
  import TheTitleAndSearchBar from "@/components/shared/TheTitleAndSearchBar";
  import TheFooter from "@/components/global/TheFooter";

  import { mapState } from 'vuex'
  export default {
    components: {TheNavigation, TheTitleAndSearchBar, TheFooter},
    computed: {
      ...mapState({
        invoices: state => state.invoices.list,
        authenticatedUser: state =>state.authentication.loggedIn
      })
    },
    data() {
      return {
      }
    },

    middleware({ store, redirect }) {
      //redirect to login if user is not logged in
      if(!store.$fire.auth.currentUser){
        return redirect('/login')
      }
    }

  }
</script>

<style scoped>

</style>
