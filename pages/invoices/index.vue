<template>
  <div id="invoices-page">
    <TheNavigation />

    <TheTitleAndSearchBar
      pageName="Invoices"
      listPath="/invoices"
      createPath="/invoices/create"
    />

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
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(invoice, index) in invoices" :key="index">
                    <td>{{ invoice.number }}</td>
                    <td>{{ invoice.customer }}</td>
                    <td
                      :class="invoice.paymentStatus === 'missed' ? 'text-danger' : ''"
                    >
                      {{ invoice.dueDate }}
                    </td>
                    <td>{{ invoice.amount }}</td>
                    <td>{{ invoice.balance }}</td>
                    <td><button class="btn btn-danger" @click.prevent="deleteInvoice(invoice.id,index)">Delete</button></td>
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

import { mapState } from "vuex";
export default {
  components: { TheNavigation, TheTitleAndSearchBar, TheFooter },
  computed: {
    ...mapState({}),
  },
  data() {
    return {
      invoices:[]
    };
  },
  methods:{
    async deleteInvoice(id,index){
      try{
        //deleting invoice from firestore db
        await this.$fire.firestore.collection('invoices').doc(id).delete();
        //removing that item from invoices array so it will be removed from the dom
        this.invoices.splice(index,1)
      }
      catch(e){
        console.log(e);
      }
    }
  },

  middleware({ store, redirect }) {
    //redirect to login if user is not logged in
    if (!store.$fire.auth.currentUser) {
      return redirect("/login");
    }
  },
  async created(){
    let res = await this.$fire.firestore.collection('invoices').get();
    res.docs.length && res.docs.forEach(i=>{
      let id = i.id;
      this.invoices.push({...i.data(),id});
    })
    console.log(this.invoices);
  }
};
</script>

<style scoped>
</style>
