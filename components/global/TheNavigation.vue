<template>
  <b-navbar toggleable="md" type="light">
    <b-navbar-brand href="/"><img src="../../assets/img/emblem.png" style="height: 45px;"></b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <li class="nav-item"><nuxt-link class="nav-link active" to="/clients">Clients</nuxt-link></li>
          <li class="nav-item"><nuxt-link class="nav-link" to="/invoices">Invoices</nuxt-link></li>
          <li class="nav-item"><nuxt-link class="nav-link" to="#">Payments</nuxt-link></li>
          <li class="nav-item"><button class="btn-primary mt-2 border-none" @click="logout">Log Out</button></li>
        </b-navbar-nav>
      </b-collapse>
  </b-navbar>
</template>

<script>
  import { mapState } from 'vuex'
    export default {
      name: "TheNavigation",
      computed: {
          ...mapState({
            authState: state => state.authentication.loggedIn
          })
      },

      methods: {
        async logout(){
          await this.$fire.auth.signOut();
          this.$router.push('/login')
        }
      }
    }
</script>

<style scoped>

</style>
