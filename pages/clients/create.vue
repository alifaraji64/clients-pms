<template>
  <div id="new-client-page">
    <TheNavigation />

    <TheTitleAndSearchBar pageName="New Client" listPath="/clients" createPath="/clients/create" />

    <div class="page-content">
      <div class="container" style="text-align:center">
        <h4 id="result_msg"></h4>
        <div class="row">
          <div class="col-md-12">
            <form>
              <div class="form-row">
                <div class="col">
                  <div class="form-group"><input class="form-control" type="text" placeholder="Name" v-model="client.name" required></div>
                </div>
                <div class="col">
                  <div class="form-group"><input class="form-control" type="email" v-model="client.email" placeholder="Email" required></div>
                </div>
              </div>
              <div class="form-row">
                <div class="col">
                  <div class="form-group"><input class="form-control" type="tel" v-model="client.phone" placeholder="Phone" required></div>
                </div>
                <div class="col">
                  <div class="form-group"><input class="form-control" type="tel" v-model="client.mobile" placeholder="Mobile" required></div>
                </div>
              </div>
              <div class="form-row">
                <div class="col">
                  <div class="form-group"><textarea class="form-control" v-model="client.address" placeholder="Address" required></textarea></div>
                </div>
                <div class="col">
                  <div class="form-group"><select class="form-control" v-model="client.gender"><option value="" selected="">Select Gendre</option><option value="male">Male</option><option value="female">Female</option></select></div>
                </div>
              </div>
              <div class="form-row">
                <button class="btn btn-success btn-lg" @click.prevent="addClient">Save</button>
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

  import { mapState } from 'vuex';
  export default {
    components: {TheNavigation, TheTitleAndSearchBar,TheFooter},

    computed: {
      ...mapState({
        clients: state => state.clients.list,
      })
    },

    data() {
      return {
        client: { name: '', email: '', phone: '', mobile: '', address: '', gender: ''},
      }
    },

    methods: {
      async addClient() {
        const result_msg = document.querySelector('#result_msg');
        const {name, email, phone, mobile, address, gender} = this.client;
        try{
          let res = await this.$fire.firestore.collection('clients').add({
            name, email, phone, mobile, address, gender
          });
          //display success msg
          result_msg.innerHTML = 'client added successfully';
          result_msg.style.color = 'rgb(7, 165, 7)';
          //clearing the inputs
          this.client.name = ''
          this.client.email = ''
          this.client.phone = ''
          this.client.mobile = ''
          this.client.address = ''
          this.client.gender = ''
        }
        catch(e){
          result_msg.innerHTML = 'error occured';
          result_msg.style.color = 'rgb(240, 53, 53)'
          console.log(e);
        }
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
.container h4{
  color:rgb(240, 53, 53);
}
</style>
