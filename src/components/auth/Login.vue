<template>
  <div class="container">
    <div class="row align-items-center login-block">
      <div class="col-lg-6 offset-lg-3 col-sm-8 offset-sm-2">
        <div class="row">
          <div class="col-6 logo-holder">
            <img id="logo" src="/src/resources/images/todo.png" />
          </div>
        </div>
        <div class="input-group col-xl-10 offset-xl-1">
          <input
            type="text"
            class="form-control text-input"
            placeholder="Email"
            v-model="input.email"
          />
          <div class="error-div">
            <label class="error-label">{{ errors.email }}</label>
          </div>
        </div>
        <div class="input-group col-xl-10 offset-xl-1">
          <input
            type="password"
            class="form-control text-input"
            placeholder="Password"
            v-model="input.password"
          />
          <div class="error-div">
            <label class="error-label">{{ errors.password }}</label>
          </div>
        </div>
        <div class="col-xl-10 offset-xl-1">
          <div class="row checkbox-row">
            <div class="col-6">
              <input type="checkbox" class="remember-chbox" />
              <label class="remember-label">Remember me</label>
            </div>
            <div class="col-6 forgot-pass-link">
              <a id="pass-reset-link" href="#">Forgot your password?</a>
            </div>
          </div>
        </div>
        <div class="login-btn-holder col-xl-10 offset-xl-1">
          <button id="login-btn" type="button" class="btn" v-on:click="login()">Login</button>
        </div>
        <div class="login-btn-holder col-xl-10 offset-xl-1">
          <router-link :to="{ name: 'Register' }" id="register-btn" class="btn btn-primary">Register</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      input: {
        email: "",
        password: ""
      },
      errors: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    login() {
      if (!this.validate()) {
        return;
      }
      this.axios
        .post("http://localhost:4000/auth/login", this.input)
        .then(response => {
          this.$store.commit("setLoggedIn", true);
          let token = response.data;
          this.$store.commit("setToken", token);
          this.$router.push("/");
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    validate() {
      this.errors.email = "";
      this.errors.password = "";
      var emailValid = this.validateEmail();
      var passwordValid = this.validatePassword();
      if (emailValid && passwordValid) {
        return true;
      }
      return false;
    },
    validateEmail() {
      var rgx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      
      console.log(rgx.test(this.input.email));
      if (!rgx.test(this.input.email)) {
        this.errors.email = "Email is not valid";
        return false;
      }
      return true;
    },
    validatePassword() {
      if (this.input.password.length <= 3) {
        this.errors.password = "Password is not valid";
        return false;
      }
      return true;
    }
  }
};
</script>

<style lang="scss" scoped>
.login-block {
  height: 100vh;
}
#logo {
  width: 100%;
}
.logo-holder {
  margin: auto;
  margin-bottom: 64px;
}
.text-input {
  padding: 12px;
  height: calc(1.5em + 0.75rem + 14px);
}
.login-btn-holder {
  margin-top: 24px;
}
#login-btn {
  padding: 12px;
  background: #2d4ef5;
  color: white;
  width: 100%;
}
#register-btn {
  padding: 12px;
  color: white;
  width: 100%;
}
.error-div {
  height: 24px;
  width: 100%;
}
.checkbox-row {
  margin-top: -6px;
}
.forgot-pass-link {
  text-align: right;
}
.remember-chbox {
  width: 16px;
  height: 16px;
  vertical-align: middle;
  opacity: 0.5;
}
.remember-label {
  vertical-align: middle;
  margin-bottom: 0;
  opacity: 0.5;
}
.error-label {
  font-size: 0.6rem;
  font-weight: 600;
  color: red;
  vertical-align: middle;
}
#pass-reset-link{
  color:black;
  opacity: .5;
}
</style>