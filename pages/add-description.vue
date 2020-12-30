<template>
  <div id="login-page">
      <TheNavigation />
    <div class="page-content">
      <div class="container mt-4">
        <div
          class="alert alert-success"
          role="alert"
          id="result_msg"
          v-if="success"
        >
          Description added Successfully
        </div>
        <div class="row">
            <div class="col-sm">
                <input class="form-control" type="text"  placeholder="name of item" v-model="name">
            </div>
            <div class="col-sm">
                <input class="form-control" type="number"  placeholder="Fine" v-model="fine">
            </div>
            <button class="btn btn-info" @click="save">Save</button>
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
      name: "add-description",
      data(){
          return {
              name:"",
              fine:"",
              success:false
          }
      },

      methods: {
          async save(){
              this.success = false;
              try{
                await this.$fire.firestore.collection('descriptions').add({
                    name:this.name,
                    fine:parseInt(this.fine)
                })
                this.success = true;
                this.fine = '';
                this.name = '';
              }
              catch(e){
                  console.log(e);
              }

          }
      }
    }
</script>

<style scoped>

</style>
