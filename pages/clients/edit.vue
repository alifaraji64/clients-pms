<template>
  <div id="new-client-page">
    <TheNavigation />

    <TheTitleAndSearchBar
      pageName="Edit client"
      listPath="/clients/edit"
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
          Client updated Successfully
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
                      v-model="clientData.nid"
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
                      v-model="clientData.name"
                      required
                    />
                  </div>
                </div>
                <div class="col">
                  <div class="form-group">
                    <input
                      class="form-control"
                      type="email"
                      v-model="clientData.email"
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
                      v-model="clientData.phone"
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
                      v-model="clientData.mobile"
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
                      v-model="clientData.address"
                      placeholder="Address"
                      required
                    ></textarea>
                  </div>
                </div>
                <div class="col">
                  <div class="form-group">
                    <select class="form-control" v-model="clientData.gender">
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
                  @click.prevent="updateClient"
                >
                  Update
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
      clientData: (state) =>
        JSON.parse(JSON.stringify(state.clients.clientDataForEdit)),
    }),
  },

  data() {
    return {
      success: false,
    };
  },

  methods: {
    async updateClient() {
      this.success = false;
      const {
        nid,
        name,
        email,
        phone,
        mobile,
        address,
        gender,
        id,
      } = this.clientData;
      try {
        await this.$fire.firestore.collection("clients").doc(id).update({
          nid,
          name,
          email,
          phone,
          mobile,
          address,
          gender,
        });
        this.success = true;
      } catch (e) {
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
  mounted() {},
};
</script>

<style scoped>
.container h4 {
  color: rgb(240, 53, 53);
}
</style>
