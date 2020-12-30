export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'PMS',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Abhaya+Libre'},
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto'},
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0-beta.2/css/bootstrap.css'},
    ],
    script: [
      {
        src: "https://unpkg.com/popper.js"
      },
      {
        src:"https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"
      },
      {
        src:"https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0-beta/js/bootstrap.min.js"
      },
    ],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '~assets/fonts/font-awesome.min.css',
    '~assets/css/styles.css'
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: "AIzaSyCChWCN3LWopklxjh5X1LXkEm2d296DJsM",
          authDomain: "awwal-shop.firebaseapp.com",
          projectId: "awwal-shop",
          storageBucket: "awwal-shop.appspot.com",
          messagingSenderId: "70188470022",
          appId: "1:70188470022:web:2ca5700fd80ac6662ed887"
        },
        services: {
          auth: true,
          firestore: true // Just as example. Can be any other service.
        }
      }
    ]
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  },

  server: {
    port: 3000,
    host: "0.0.0.0"
  },
}