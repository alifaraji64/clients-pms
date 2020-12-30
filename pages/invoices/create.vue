<template>
  <div id="new-invoice-page">
    <TheNavigation />

    <TheTitleAndSearchBar
      pageName="New Invoice"
      listPath="/invoices"
      createPath="/invoices/create"
    />

    <div class="page-content">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <form>
              <div class="form-row" style="padding: 24px">
                <div class="col-md-5 col-xl-3">
                  <div class="form-group">
                    <label>Select Client</label>
                    <select class="form-control" v-model="invoice.customer">
                      <option
                        v-for="(client, index) in clients"
                        :key="index"
                        :value="client"
                      >
                        {{ client }}
                      </option>
                    </select>
                  </div>

                  <div class="form-group">
                    <label>Start Date</label>
                    <input
                      class="form-control"
                      type="date"
                      v-model="invoice.startDate"
                    />
                  </div>
                  <div class="form-group">
                    <label>End Date</label>
                    <input
                      class="form-control"
                      type="date"
                      v-model="invoice.dueDate"
                    />
                  </div>
                </div>
                <div class="col-md-1 col-xl-2"></div>
                <div class="col-md-1 col-xl-2"></div>
                <div class="col-md-5 col-xl-5 form-column-shaped">
                  <div class="table-responsive">
                    <table class="table">
                      <thead>
                        <tr></tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <label><strong>Sub Total&nbsp;</strong></label
                            ><label>{{ invSubTotal }}.00</label>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label><strong>Fine&nbsp;</strong></label
                            ><label>00.00<small></small></label>
                            <div>
                              <small
                                >MVR 5.00 will be added if not paid before 10th
                                of the month</small
                              >
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label><strong>Total&nbsp;</strong></label
                            ><label>{{ invoice.total }}.00</label>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label><strong>Paid&nbsp;&nbsp;</strong></label
                            ><label>{{ invoice.paid }}.00</label>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label
                              ><strong>Due Total&nbsp; &nbsp;</strong></label
                            ><label>{{ invoice.due }}.00</label>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <h3 style="margin-top: 2rem">Details</h3>

              <div class="form-row">
                <div class="col form-column-shaped">
                  <div class="table-responsive">
                    <table class="table">
                      <thead>
                        <tr>
                          <th>Description</th>
                          <th>Rate</th>
                          <th>Qty</th>
                          <th>Line Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-show="detailLines.length > 0"
                          v-for="(obj, index) in detailLines"
                          :key="index"
                        >
                          <td>
                            <select class="form-control">
                              <optgroup label="This is a group">
                                <option
                                  v-for="(item, index) in items"
                                  :key="index"
                                  :value="item.name"
                                  :selected="obj.item === item.name"
                                >
                                  {{ item.name }}
                                </option>
                              </optgroup>
                            </select>
                          </td>
                          <td>
                            <input
                              class="form-control"
                              type="number"
                              :value="obj.rate"
                              readonly
                            />
                          </td>
                          <td>
                            <input
                              class="form-control"
                              type="number"
                              :value="obj.qty"
                              readonly
                            />
                          </td>
                          <td>
                            <input
                              class="form-control"
                              type="number"
                              :value="obj.lineTotal"
                              readonly
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <select
                              class="form-control"
                              v-model="detailObj.item"
                            >
                              <optgroup label="This is a group">
                                <option
                                  v-for="(item, index) in items"
                                  :key="index"
                                  :value="item.name"
                                >
                                  {{ item.name }}
                                </option>
                              </optgroup>
                            </select>
                          </td>
                          <td>
                            <input
                              class="form-control"
                              type="number"
                              v-model="detailObj.rate"
                              @change="calculateDetailLineTotal"
                            />
                          </td>
                          <td>
                            <input
                              class="form-control"
                              type="number"
                              v-model="detailObj.qty"
                              @change="calculateDetailLineTotal"
                            />
                          </td>
                          <td>
                            <input
                              class="form-control"
                              type="number"
                              v-model="detailObj.lineTotal"
                              readonly
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <button
                              class="btn btn-outline-primary"
                              type="button"
                              @click.prevent="addNewItemLine"
                            >
                              <i class="fa fa-plus-square-o"></i>&nbsp;add new
                              line
                            </button>
                          </td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <h3 style="margin-top: 2rem">all payments</h3>

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
                          v-show="paymentLines.length > 0"
                          v-for="(line, index) in paymentLines"
                          :key="index"
                        >
                          <td>
                            <input
                              class="form-control"
                              type="text"
                              :value="line.date"
                              readonly
                            />
                          </td>
                          <td>
                            <select class="form-control">
                              <option
                                value="Bank Transfer"
                                :selected="line.paymentType === 'Bank Transfer'"
                              >
                                Bank Transfer
                              </option>
                              <option
                                value="Cash"
                                :selected="line.paymentType === 'Cash'"
                              >
                                Cash
                              </option>
                            </select>
                          </td>
                          <td>
                            <input
                              class="form-control"
                              type="number"
                              :value="line.lineTotal"
                              readonly
                            />
                          </td>
                        </tr>

                        <tr>
                          <td>
                            <input
                              class="form-control"
                              type="date"
                              v-model="paymentObj.date"
                            />
                          </td>
                          <td>
                            <select
                              class="form-control"
                              v-model="paymentObj.paymentType"
                            >
                              <option value="Bank Transfer">
                                Bank Transfer
                              </option>
                              <option value="Cash">Cash</option>
                            </select>
                          </td>
                          <td>
                            <input
                              class="form-control"
                              type="number"
                              v-model="paymentObj.lineTotal"
                              @change="calculatePaymentTotal"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <button
                              class="btn btn-outline-primary"
                              type="button"
                              @click.prevent="addNewPaymentLine"
                            >
                              <i class="fa fa-plus-square-o"></i>&nbsp;add new
                              line
                            </button>
                          </td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div class="form-row mt-5">
                <button
                  class="btn btn-success btn-large"
                  @click.prevent="addInvoice"
                >
                  Save Invoice
                </button>
              </div>
            </form>
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
    ...mapState({
      invoices: (state) => state.invoices.list,
      //authenticatedUser: state =>state.authentication.loggedIn
    }),
  },
  data() {
    return {
      invNumber: "",
      invoice: {
        customer: "",
        startDate: "",
        dueDate: "",
        amount: "",
        balance: "",
        total: 0,
        paid: 0,
        due: 0,
      },
      items: [{ name: "item 1" }, { name: "item 2" }, { name: "item 3" }],
      detailLines: [],
      paymentLines: [],
      detailObj: { item: "", rate: 0, qty: 0, lineTotal: 0 },
      paymentObj: { date: "", paymentType: "", lineTotal: 0 },
      invSubTotal: 0,
      clients: [],
    };
  },
  async created() {
    this.invNumber = this.getInvNumber();
    //get the client names for displaying them in
    let res = await this.$fire.firestore.collection("clients").get();
    res.docs.length &&
      res.docs.forEach((c) => {
        this.clients.push(c.data().name);
      });
  },
  methods: {
    getInvNumber() {
      let number =
        new Date().getFullYear().toString() +
        Math.ceil(new Date().getMilliseconds() * Math.random()).toString();
      return number;
    },
    calculateDetailLineTotal() {
      this.detailObj.lineTotal = this.detailObj.rate * this.detailObj.qty;
      this.calculateInvSubTotal();
      this.calculatePaymentTotal();
    },
    addNewItemLine() {
      if (this.detailObj.lineTotal > 0) {
        this.detailLines.push(this.detailObj);
        this.calculateInvSubTotal();
        this.detailObj = { item: "", rate: "", qty: "", lineTotal: "" };
      }
    },
    calculateInvSubTotal() {
      this.invSubTotal = 0;
      this.invoice.total = 0;
      if (this.detailLines.length > 0) {
        console.log(this.detailLines);
        for (let obj of this.detailLines) {
          this.invSubTotal += parseFloat(obj.lineTotal);
          this.invoice.total += parseFloat(obj.lineTotal);
          this.invoice.due =
            parseFloat(this.invoice.total) - parseFloat(this.invoice.paid);
        }
      } else {
        this.invSubTotal += parseFloat(this.detailObj.lineTotal);
        this.invoice.total += parseFloat(this.detailObj.lineTotal);
        this.invoice.due =
          parseFloat(this.invoice.total) - parseFloat(this.invoice.paid);
      }
    },
    addNewPaymentLine() {
      if (this.paymentObj.lineTotal > 0) {
        this.paymentLines.push(this.paymentObj);
        this.calculatePaymentTotal();
        this.paymentObj = { date: "", paymentType: "", lineTotal: 0 };
      }
    },
    calculatePaymentTotal() {
      this.invoice.paid = 0;
      if (this.paymentLines.length > 0) {
        for (let obj of this.paymentLines) {
          this.invoice.paid += parseFloat(obj.lineTotal);
        }
        this.invoice.due =
          parseFloat(this.invoice.total) - parseFloat(this.invoice.paid);
      } else {
        this.invoice.paid += parseFloat(this.paymentObj.lineTotal);
        this.invoice.due =
          parseFloat(this.invoice.total) - parseFloat(this.invoice.paid);
      }
    },
    async addInvoice() {
      if (
        this.invoice.total > 0 &&
        this.invoice.dueDate !== "" &&
        this.detailLines.length >= 0 &&
        this.paymentLines.length >= 0
      ) {
        this.invoice.number = this.invNumber;
        this.invoice.amount = "MVR " + this.invoice.total.toString();
        this.invoice.balance = "MVR " + this.invoice.due.toString();
        const {amount, balance, customer,dueDate,number} = this.invoice;
        //add invoice to firestore
        await this.$fire.firestore.collection('invoices').add({
          amount,balance,customer,dueDate,number
        })
        this.$router.push('/invoices');
        this.invoice = {
          number: "",
          customer: "",
          startDate: "",
          dueDate: "",
          amount: "",
          balance: "",
          total: 0,
          paid: 0,
          due: 0,
        };
        this.detailLines = [];
        this.paymentLines = [];
        this.invSubTotal = 0;
        this.invNumber = this.getInvNumber();
      }
      else {
        console.log("yooo");
      }
    },
  },
  middleware({ store, redirect }) {
    //redirect to login if user is not logged in
    if (!store.$fire.auth.currentUser) {
      return redirect("/login");
    }
  },
};
</script>

<style scoped>
</style>