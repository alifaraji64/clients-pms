<template>
  <div style="background: #e8e8e8; margin-bottom: 25px">
    <div class="container-fluid">
      <div class="row" style="padding-top: 5px; padding-bottom: 5px">
        <div class="col-12 col-sm-6 col-md-6">
          <label class="col-form-label text-secondary">{{ pageName }}</label>
        </div>
        <div
          class="col-12 col-sm-6 col-md-6 d-flex d-sm-flex d-xl-flex justify-content-end justify-content-sm-end justify-content-xl-end"
        >
          <div class="input-group" style="margin: 0 10px 0 0">
            <div class="input-group-prepend">
              <span class="input-group-text">Search</span>
            </div>
            <input class="form-control" type="text" @keypress="search(pageName)"/>
            <div class="input-group-append">
              <button class="btn btn-secondary" type="button">
                <i class="fa fa-search"></i>
              </button>
            </div>
          </div>
          <nuxt-link
            class="btn btn-outline-secondary"
            role="button"
            style="margin: 0 10px 0 0"
            :to="listPath"
            ><i class="fa fa-list-alt"></i></nuxt-link
          ><nuxt-link
            class="btn btn-outline-secondary"
            role="button"
            :to="createPath"
            ><i class="fa fa-plus"></i
          ></nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TheTitleAndSearchBar",

  props: {
    pageName: {
      type: String,
      required: true,
    },
    listPath: {
      type: String,
      required: true,
    },
    createPath: {
      type: String,
      required: true,
    },
  },
  mounted() {
    //console.log(this.createPath);
  },
  methods:{
    search(p){
      console.log(p);
    }
  }
};
</script>

<style scoped>
</style>
