<template>
  <div id="clients-page">
    <TheNavigation />

  <div style="background: #e8e8e8; margin-bottom: 25px">
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
            to="/clients/create"
            ><i class="fa fa-plus"></i
          ></nuxt-link>
        </div>
      </div>
    </div>
  </div>

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
                  <tr v-for="(client, index) in filteredClients" :key="index">
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
import TheFooter from "@/components/global/TheFooter";

import { mapState } from "vuex";
export default {
  components: { TheNavigation, TheFooter },
  data() {
    return {
      clients: [],
      search:''
    };
  },
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
  computed:{
    filteredClients(){
      return this.clients.filter(client=>{
        return client.name.includes(this.search)
      })
    }
  },

  //fetching clients from db
  async created() {
    let res = await this.$fire.firestore.collection("clients").get();
    res.docs.length &&
      res.docs.forEach((d) => {
        let id = d.id;
        this.clients.push({ ...d.data(), id });
      });
  },
  mounted(){
    console.log(this.clients);
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
