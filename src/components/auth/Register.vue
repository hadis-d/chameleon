<template>
  <div class="container">
    <div class="row align-items-center register-block">
      <div class="col-lg-6 offset-lg-3 col-sm-8 offset-sm-2">
        <div class="row">
          <div class="col-4 col-sm-6 col-md-4 logo-holder">
            <img id="logo" src="/src/resources/images/todo.png" />
          </div>
        </div>
        <div class="input-group col-xl-10 offset-xl-1">
          <input
            type="text"
            class="form-control text-input"
            placeholder="First Name"
            v-model="input.first_name"
          />
          <div class="error-div">
            <label class="error-label">{{ errors.first_name }}</label>
          </div>
        </div>
        <div class="input-group col-xl-10 offset-xl-1">
          <input
            type="text"
            class="form-control text-input"
            placeholder="Last Name"
            v-model="input.last_name"
          />
          <div class="error-div">
            <label class="error-label">{{ errors.last_name }}</label>
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
        <div class="input-group col-xl-10 offset-xl-1">
          <input
            type="password"
            class="form-control text-input"
            placeholder="Password Confirmation"
            v-model="input.password2"
          />
          <div class="error-div">
            <label class="error-label">{{ errors.password2 }}</label>
          </div>
        </div>
        <div class="login-btn-holder col-xl-10 offset-xl-1">
          <button id="register-btn" type="button" class="btn" v-on:click="register()">Register</button>
        </div>
        <div class="login-btn-holder col-xl-10 offset-xl-1">
          <router-link :to="{ name: 'Login' }" id="login-btn" class="btn btn-primary">Login</router-link>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "Register",
  data() {
    return {
      input: {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        password2: ""
      },
      errors: {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        password2: ""
      }
    };
  },
  methods: {
    register() {
      if (!this.validate()) {
        return;
      }
      this.axios
        .post("http://localhost:4000/auth/register", this.input)
        .then(response => {
          console.log(response);
          this.$store.commit("setLoggedIn", true);
          this.$store.commit("setToken", response.data.token);
          this.$router.push("/");
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    validate() {
      this.errors.first_name = "";
      this.errors.last_name = "";
      this.errors.email = "";
      this.errors.password = "";
      this.errors.password2 = "";
      var namesValid = this.validateNames();
      var emailValid = this.validateEmail();
      var passwordValid = this.validatePassword();
      if (emailValid && passwordValid && namesValid) {
        return true;
      }
      return false;
    },
    validateNames(){
      var firstNameValid = true;
      var lastNameValid = true;
      if(this.input.first_name.length < 2){
        this.errors.first_name = "First name is not valid";
        firstNameValid = false;
      }
      if(this.input.last_name.length < 2){
        this.errors.last_name = "Last name is not valid";
        lastNameValid = false;
      }
      return (firstNameValid && lastNameValid);
    },
    validateEmail() {
      var rgx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!rgx.test(this.input.email)) {
        this.errors.email = "Email is not valid";
        return false;
      }
      return true;
    },
    validatePassword() {
      if(this.input.password != this.input.password2){
        this.errors.password2 = "Passwords do not match";
        return false;
      }
      if (this.input.password.length <= 3) {
        this.errors.password = "Password is too short";
        return false;
      }
      return true;
    }
  }
};
</script>

<style lang="scss" scoped>
.register-block {
  height: 100vh;
}
#logo {
  width: 100%;
  margin-top: 30px
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
#register-btn {
  padding: 12px;
  background: #2d4ef5;
  color: white;
  width: 100%;
}
#login-btn {
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

</style>
