<template>
  <div id="login-page">
    <div class="page-content">
      <div class="container">
        <nuxt-link to="/invoices">invoices</nuxt-link>
        <div class="row">
          <div class="col-md-6 col-lg-4 offset-md-3 offset-lg-4 offset-xl-4">
            <form>
              <div class="form-group" style="text-align: center;"><i class="fa fa-lock" style="font-size: 57px;text-align: center;color: rgb(121,178,135);"></i></div>
              <div class="form-group"><input class="form-control" type="email" v-model="userData.email" placeholder="Email"></div>
              <div class="form-group"><input class="form-control" type="password" v-model="userData.password" placeholder="Password"></div>
              <div id="error_msg" style="color:red;text-align:center; margin:1rem 0;"></div>
              <div class="form-group" style="text-align: center;"><button class="btn btn-outline-primary" type="button" @click.prevent="login">Sign in</button></div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  // import { mapState } from 'vuex'
    export default {
      name: "login",
      data(){
          return {
            userData: { email: '', password: ''}
          }
      },

      methods: {
          // proceedToSignIn(){
          //   console.log(this.userData)
          //   this.$store.commit('authentication/checkAuthentication', this.userData)
          //   if(this.authenticatedUser){
          //     this.$router.push('/')
          //   }else{
          //     alert('You are not authenticated')
          //   }
          // }
          async login(){
            try{
              let res = await this.$fire.auth.signInWithEmailAndPassword(this.userData.email, this.userData.password);
              this.$router.push('/')
            }
            catch(e){
              let errorField = document.querySelector('#error_msg');
              errorField.innerHTML = 'your email or password is incorrect'
            }
          }
      }
    }
</script>

<style scoped>

</style>
