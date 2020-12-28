<template>
  <div id="invoices-page">
    <TheNavigation />
    <nav style="background: #e8e8e8; margin-bottom: 25px">
    <div class="container-fluid">
      <div class="row" style="padding-top: 5px; padding-bottom: 5px">
        <div class="col-12 col-sm-6 col-md-6">
          <label class="col-form-label text-secondary">clients</label>
        </div>
        <div
          class="col-12 col-sm-6 col-md-6 d-flex d-sm-flex d-xl-flex justify-content-end justify-content-sm-end justify-content-xl-end"
        >
          <div class="input-group" style="margin: 0 10px 0 0">
            <div class="input-group-prepend">
              <span class="input-group-text">Search</span>
            </div>
            <input class="form-control" type="text" v-model="search" placeholder="search by name"/>
            <div class="input-group-append">
              <button class="btn btn-secondary" type="button">
                <i class="fa fa-search"></i>
              </button>
            </div>
          </div>
          <nuxt-link
            class="btn btn-outline-secondary"
            role="button"
            to="/invoices/create"
            ><i class="fa fa-plus"></i
          ></nuxt-link>
        </div>
      </div>
    </div>
    </nav>

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
                  <tr v-for="(invoice, index) in filteredInvoices" :key="index">
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
import TheFooter from "@/components/global/TheFooter";

export default {
  components: { TheNavigation, TheFooter },
  data() {
    return {
      invoices:[],
      search:''
    };
  },
  computed: {
    filteredInvoices(){
      return this.invoices.filter(invoice=>{
        return invoice.customer.includes(this.search)
      })
    }
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
