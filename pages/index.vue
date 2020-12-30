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
                  <td>{{ numberOfDueInvoices }} invoices.</td>
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
  data(){
    return{
      invoices:[],
      numberOfDueInvoices:0
    }
  },
  async created(){
    let res = await this.$fire.firestore.collection('invoices').get();
    res.docs.length && res.docs.forEach(i=>{
      let id = i.id;
      this.invoices.push({...i.data(),id});
    })
    this.invoices.forEach(i=>{
      let d = new Date(i.dueDate);
      let now = new Date();
      if(d < now){
        this.numberOfDueInvoices++;
      }
    })
  },
    middleware({ store, redirect }) {
      console.log(store.$fire.auth);
    //redirect to login if user is not logged in
    if(!store.$fire.auth.currentUser){
      return redirect('/login')
    }
  },

}
</script>

<style>
</style>
