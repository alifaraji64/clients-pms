<template>
  <div id="new-client-page">
    <TheNavigation />

    <TheTitleAndSearchBar
      pageName="New Client"
      listPath="/clients"
      createPath="/clients/create"
    />

    <div class="page-content">
      <div class="container" style="text-align: center">
        <div
          class="alert alert-success"
          role="alert"
          id="result_msg"
          v-if="success"
        >
          Client added Successfully
        </div>
        <div class="row">
          <div class="col-md-12">
            <form>
              <div class="form-row">
                <div class="col-md-6">
                  <div class="form-group">
                    <input
                      class="form-control"
                      type="text"
                      v-model="client.nid"
                      placeholder="National Id(NID)"
                      required
                    />
                  </div>
                  <div class="col"></div>
                </div>
              </div>
              <div class="form-row">
                <div class="col">
                  <div class="form-group">
                    <input
                      class="form-control"
                      type="text"
                      placeholder="Name"
                      v-model="client.name"
                      required
                    />
                  </div>
                </div>
                <div class="col">
                  <div class="form-group">
                    <input
                      class="form-control"
                      type="email"
                      v-model="client.email"
                      placeholder="Email"
                      required
                    />
                  </div>
                </div>
              </div>
              <div class="form-row">
                <div class="col">
                  <div class="form-group">
                    <input
                      class="form-control"
                      type="tel"
                      v-model="client.phone"
                      placeholder="Phone"
                      required
                    />
                  </div>
                </div>
                <div class="col">
                  <div class="form-group">
                    <input
                      class="form-control"
                      type="tel"
                      v-model="client.mobile"
                      placeholder="Mobile"
                      required
                    />
                  </div>
                </div>
              </div>
              <div class="form-row">
                <div class="col">
                  <div class="form-group">
                    <textarea
                      class="form-control"
                      v-model="client.address"
                      placeholder="Address"
                      required
                    ></textarea>
                  </div>
                </div>
                <div class="col">
                  <div class="form-group">
                    <select class="form-control" v-model="client.gender">
                      <option value="" selected="">Select Gendre</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="form-row">
                <button
                  class="btn btn-success btn-lg"
                  @click.prevent="addClient"
                >
                  Save
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
      clients: (state) => state.clients.list,
    }),
  },

  data() {
    return {
      client: {
        nid: "",
        name: "",
        email: "",
        phone: "",
        mobile: "",
        address: "",
        gender: "",
      },
      success: false,
    };
  },

  methods: {
    async addClient() {
      const result_msg = document.querySelector("#result_msg");
      const { nid, name, email, phone, mobile, address, gender } = this.client;
      try {
        let res = await this.$fire.firestore.collection("clients").add({
          nid,
          name,
          email,
          phone,
          mobile,
          address,
          gender,
        });
        //display success msg
        this.success = true;
        //clearing the inputs
        this.client.nid = "";
        this.client.name = "";
        this.client.email = "";
        this.client.phone = "";
        this.client.mobile = "";
        this.client.address = "";
        this.client.gender = "";
      } catch (e) {
        result_msg.innerHTML = "error occured";
        result_msg.style.color = "rgb(240, 53, 53)";
        console.log(e);
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
.container h4 {
  color: rgb(240, 53, 53);
}
</style>
