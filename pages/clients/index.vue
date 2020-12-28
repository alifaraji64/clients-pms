<template>
  <div id="clients-page">
    <TheNavigation />

    <TheTitleAndSearchBar
      pageName="Clients"
      listPath="/clients"
      createPath="/clients/create"
    />

    <div class="page-content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-12">
            <div class="table-responsive">
              <table class="table">
                <thead>
                  <tr>
                    <th>NID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Mobile</th>
                    <th>Address</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(client, index) in clients" :key="index">
                    <td>{{ client.nid }}</td>
                    <td>{{ client.name }}</td>
                    <td>{{ client.email }}</td>
                    <td>{{ client.phone }}</td>
                    <td>{{ client.mobile }}</td>
                    <td>{{ client.address }}</td>
                    <td>
                      <button
                        class="btn btn-danger"
                        @click="deleteClient(client.id, index)"
                      >
                        Delete
                      </button>
                    </td>
                    <td>
                      <button class="btn btn-info" @click="editClient(client)">
                        Edit
                      </button>
                    </td>
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
  data() {
    return {
      clients: [],
    };
  },
  // computed: {
  //   ...mapState({
  //     clients: state => state.clients.list,
  //     authenticatedUser: state =>state.authentication.loggedIn
  //   })
  // },
  methods: {
    async deleteClient(id, index) {
      console.log(id, index);
      await this.$fire.firestore.collection("clients").doc(id).delete();
      //remove that specific item from clients array
      this.clients.splice(index, 1);
    },
    editClient(client) {
      //add all the client data to store
      this.$store.commit("clients/fillEditData", client);
      this.$router.push("/clients/edit");
    },
  },
  async created() {
    let res = await this.$fire.firestore.collection("clients").get();
    res.docs.length &&
      res.docs.forEach((d) => {
        let id = d.id;
        this.clients.push({ ...d.data(), id });
      });
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
