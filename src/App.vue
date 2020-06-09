<template>
  <div id="app">
    <div id="nav">
      <router-link v-if="isLoggedIn" to="/login" v-on:click.native="logout" replace>Logout</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "App",
  data() {
    return {
      mockAccount: {
        username: "admin",
        password: "password"
      }
    };
  },
  mounted() {},
  computed: {
    ...mapGetters({
      isLoggedIn: "isLoggedIn"
    })
  },
  methods: {
    logout() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/login");
      });
    }
  }
};
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
