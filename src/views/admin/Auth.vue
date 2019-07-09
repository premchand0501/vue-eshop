<template>
  <div class="container-fluid" style="margin-top: 3rem;">
    <div class="container bg-light p-3">
      <h3 to="/" class="text-primary text-center mt-3"><em>eShop</em> | Admin</h3>
      <hr>
      <h4>Login to continue</h4>
      <form @submit.prevent="loginUser">
        <div class="form-group">
          <label>Email</label>
          <input 
            type="email" class="form-control" 
            v-model="userCredentials.email"
            @keyup="validateForm('email')">
          <p v-if="!errorMsg.email.valid && errorMsg.email.dirty" class="text-danger">{{errorMsg.email.msg}}</p>
        </div>
        <div class="form-group">
          <label>Password</label>
          <input 
            type="password" class="form-control" 
            v-model="userCredentials.password"
            @keyup="validateForm('password')">
          <p v-if="!errorMsg.password.valid && errorMsg.password.dirty" class="text-danger">{{errorMsg.password.msg}}</p>
        </div>
        <button type="submit" class="btn btn-primary">Login</button>
      </form>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { ILoginCredentials, IUserData } from '../../interface/ILoginData';
import { mapGetters } from 'vuex';
import { firebaseAuth } from '../../main';

@Component({
  computed: mapGetters(['errors', 'profileData']),
})
export default class Auth extends Vue {
  public profileData!: IUserData;
  public userCredentials: ILoginCredentials = {
    email: 'prem@gmail.com',
    password: 'Prem0501',
  };
  public errorMsg = {
    email: {
      msg: 'Please enter valid email',
      valid: false,
      dirty: false,
    },
    password: {
      msg: 'Please enter valid password',
      valid: false,
      dirty: false,
    },
  };
  public loginUser() {
    this.validateForm('');
    const validForms = Object.values(this.errorMsg).filter((value) => value.valid && value.dirty);
    if (validForms.length == Object.keys(this.errorMsg).length) {
      this.$store.dispatch('loginUser', this.userCredentials)
      .then(() => {
        if (this.profileData.hasOwnProperty('refreshToken')) {
          localStorage.setItem('token', this.profileData.refreshToken);
          this.$router.push('/admin');
        }
      });
    }
  }

  public validateForm(formField: String) {
    if ((formField == '' || formField == 'email') && !/^[a-z]([a-z0-9.-]+)[@][a-z]{2,}[.][a-z]{2,}$/i.test(this.userCredentials.email)) {
      this.errorMsg.email.valid = false;
      this.errorMsg.email.dirty = true;
    } else {
      this.errorMsg.email.valid = true;
      this.errorMsg.email.dirty = true;
    }
    if ((formField == '' || formField == 'password') && this.userCredentials.password.length < 6) {
      this.errorMsg.password.valid = false;
      this.errorMsg.password.dirty = true;
    } else {
      this.errorMsg.password.valid = true;
      this.errorMsg.password.dirty = true;
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  max-width: 500px;
  margin: 1rem auto;
}
</style>