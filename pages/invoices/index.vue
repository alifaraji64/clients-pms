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
                    <th>Fine</th>
                    <th>Balance</th>
                    <th>Delete</th>
                    <th>Edit</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(invoice, index) in filteredInvoices" :key="index">
                    <td>{{ invoice.number }}</td>
                    <td>{{ invoice.customer }}</td>
                    <td
                      :class="invoiceOutdated(invoice.dueDate) ? 'text-danger font-weight-bold' : ''"
                    >
                      {{ invoice.dueDate }}
                    </td>
                    <td>{{ invoice.amount }}</td>
                    <td></td>
                    <td>{{ invoice.balance }}</td>
                    <td><button class="btn btn-danger" @click.prevent="deleteInvoice(invoice.id,index)">Delete</button></td>
                    <td><button type="button" class="btn btn-info" data-toggle="modal" data-target="#basicModal" @click="editableInvoiceInfo(invoice.id, index, invoice.balance, invoice.customer)">Edit</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

<!--
----------------------------------------------
----------------------------------------------
MODAL
----------------------------------------------
----------------------------------------------
-->
<div class="container">
<!-- basic modal -->
<div class="modal fade" id="basicModal" tabindex="-1" role="dialog" aria-labelledby="basicModal" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title" id="myModalLabel">Payments</h4>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
              <div class="form-row">
                <div class="col form-column-shaped">
                  <div class="table-responsive">
                    <table class="table">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Type</th>
                          <th>Line Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                        >
                          <td>
                            <input
                              class="form-control"
                              type="date"
                              v-model="payment.date"
                            />
                          </td>
                          <td>
                            <select class="form-control" v-model="payment.transfer">
                              <option
                                value="Bank Transfer"
                              >
                                Bank Transfer
                              </option>
                              <option
                                value="Cash"
                              >
                                Cash
                              </option>
                            </select>
                          </td>
                          <td>
                            <input
                              class="form-control"
                              type="number"
                              v-model="payment.amount"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" @click="savePayment">Save changes</button>
      </div>
    </div>
  </div>
</div>
</div>

<!--
----------------------------------------------
----------------------------------------------
----------------------------------------------
-->
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
      search:'',
      amount:0,
      editableInvoice:{id:'', balance:'', index:'',client:''},
      payment:{date:'', transfer:'', amount:''}
    };
  },
  computed: {
    filteredInvoices(){
      return this.invoices.filter(invoice=>{
        return invoice.customer.includes(this.search)
      })
    },
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
    },
    async savePayment(){
      //saving the payment in db
      const {id,balance,index,client} = this.editableInvoice;
      const {date,transfer,amount} = this.payment;
      await this.$fire.firestore.collection('payments').add({
        date,transfer,amount
      })
      //edit the balance in invoice in db and local array
      //get the balance as an integer
      let updatedBalance = parseInt(balance.split(" ")[1]-amount);

      await this.$fire.firestore.collection('invoices').doc(id).update({
        balance:`MVR ${updatedBalance}`
       })
       //edit the balance from the local array so there is no need to refresh the page
       this.invoices[index].balance = `MVR ${updatedBalance}`;
       $('#basicModal').modal('hide');
    },
    editableInvoiceInfo(id,index,balance,client){
      this.editableInvoice.id = id;
      this.editableInvoice.balance = balance;
      this.editableInvoice.index = index;
      this.editableInvoice.client = client;
    },
    invoiceOutdated(date){
      let d = new Date(date);
      let now = new Date();
      if(d > now){
        return false;
      }else{
        return true;
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
