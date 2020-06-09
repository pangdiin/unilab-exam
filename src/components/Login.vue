<template>
  <div id="container">
    <form class="login" @submit.prevent="login">
      <h1>Sign in</h1>
      <p>
        <label>User name</label>
        <input required v-model="form.username" type="text" placeholder="Username" />
      </p>
      <p>
        <label>Password</label>
        <input required v-model="form.password" type="password" placeholder="Password" />
      </p>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      form: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    login() {
      if (this.form.username != "" && this.form.password != "") {
        if (
          this.form.username == this.$parent.mockAccount.username &&
          this.form.password == this.$parent.mockAccount.password
        ) {
          this.$store.dispatch("login").then(() => {
            this.$router.push("/products");
          });
        } else {
          alert("Username or password is incorrect");
        }
      } else {
        console.log("A username and password must be present");
      }
    }
  }
};
</script>

<style scoped>
#container {
  width: 640px; /*can be in percentage also.*/
  height: auto;
  margin: 0 auto;
  padding: 10px;
  position: relative;
}
</style>
