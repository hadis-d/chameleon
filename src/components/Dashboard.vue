<template>
  <div>
    <b-navbar toggleable="lg">
      <div class="container">
        <b-navbar-brand href="#">
          <img id="logo-img" src="/src/resources/images/logo.png" />
        </b-navbar-brand>
        <div class="ddown">
          <div
            class="drop-menu"
            v-on:focus="userToggle = true"
            v-on:blur="hideUserToggle"
            tabindex="0"
          >
            <h6 id="user-name">{{user.name}}</h6>
            <img id="burger-user-icon" src="/src/resources/images/avatar.png" />
          </div>
          <ul class="drop-ul" v-if="userToggle">
            <li v-on:click="logout()" tabindex="0">
              <img id="logout-icon" src="/src/resources/images/logout.png" />
              <p>
                <b>Log out</b>
              </p>
            </li>
          </ul>
        </div>
      </div>
    </b-navbar>
    <div class="container dash-container">
      <h6>Manage your to do list</h6>
      <p class="subheader-label">Click on checkbox or drag and drop to done</p>
      <v-ddg></v-ddg>
    </div>
    <router-view />
  </div>
</template>
<script>
import DoubleDragGrid from "../components/reusables/DoubleDragGrid.vue";
export default {
  components: {
    "v-ddg": DoubleDragGrid
  },
  name: "Dashboard",
  data() {
    return {
      userToggle: false,
      user:{
        name: ""
      }
    };
  },
  mounted: function() 
  {
    this.fetchUser();
  },
  methods: {
    logout() {
      this.$store.commit("setLoggedIn", false);
      this.$router.push("/login");
    },
    hideUserToggle() {
      setTimeout(() => (this.userToggle = false), 150);
    },
    fetchUser() {
      let token = this.$store.state.user.token;
      this.axios.get("http://localhost:4000/auth/user",{headers:{"token": token}}).then(response => {
        this.user.name = response.data.first_name + " " + response.data.last_name;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  background-color: #f5f6fa;
}
#logo-img {
  margin: 5px 0;
  height: 35px;
}
.dd-item {
  padding: 0px;
}
</style>
<style lang="scss" scoped>
.dropdown-menu {
  margin: 0 !important;
  padding: 0 !important;
}
#burger-user-icon {
  height: 35px;
  width: 35px;
  margin: 18px 0;
}
#navbar-user-icon {
  height: 40px;
}
.ddown {
  position: relative;
}
.drop-menu {
  height: 71px;
  margin: -8px 0;
  display: inline-flex;
}
.drop-menu:hover {
  background-color: #e5e6ea;
}
#user-name {
  height: 21px;
  margin: 25px 15px;
}
.drop-ul {
  position: absolute;
  list-style-type: none;
  right: 0;
  margin-top: 8px;
  height: 45px;
  padding-left: 0;
  -moz-box-shadow: 8px 8px 9px #ccc, -8px 8px 9px #ccc;
  -webkit-box-shadow: 8px 8px 9px #ccc, -8px 8px 9px #ccc;
  box-shadow: 8px 8px 9px #ccc, -8px 8px 9px #ccc;
  li {
    width: 190px;
    height: 45px;
    display: flex;
    p {
      opacity: 0.5;
      font-size: 0.8rem;
      margin: 12px 0;
    }
  }
}
#logout-icon {
  margin: 15px;
  height: 15px;
  width: 15px;
}
.subheader-label {
  opacity: 0.5;
}
.dash-container {
  padding-top: 32px;
}
</style>