<template>
  <v-container>
    <v-row class="justify-center">
      <v-col cols="10">
        <v-lazy
          :options="{
          threshold: .9
        }"
          transition="slide-x-reverse-transition"
        >
          <v-card class="pa-3 pt-5" elevation="10">
            <v-alert type="error" dismissible :value="error">{{errorMsg}}</v-alert>
            <v-form v-model="valid" ref="loginForm" @submit.prevent="login">
              <v-text-field
                outlined
                :rules="usernameRules"
                name="username"
                label="Username"
                v-model="username"
              ></v-text-field>
              <v-text-field
                outlined
                :rules="passwordRules"
                name="password"
                label="Password"
                type="password"
                v-model="password"
              ></v-text-field>
              <v-row class="justify-center">
                <v-col cols="10">
                  <v-btn
                    :loading="loading"
                    :disabled="!valid"
                    type="submit"
                    color="success"
                    block
                  >Login</v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card>
        </v-lazy>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "../../plugins/axios";
export default {
  data: () => ({
    username: "",
    usernameRules: [
      v => !!v || "The username is required",
      v => /^[a-zA-Z0-9]+$/.test(v) || "The username must be valid"
    ],

    password: "",
    passwordRules: [
      v => !!v || "The password is required",
      v =>
        /^(?=.*\d).{8,16}$/.test(v) ||
        "Password must contain one number at least, and be between 8 and 16 in length"
    ],

    loading: false,
    valid: false,

    error: false,
    errorMsg: ""
  }),
  methods: {
    async login() {
      if (this.$refs.loginForm.validate()) {
        this.loading = true;
        this.error = false;
        this.errorMsg = "";
        try {
          //send login request:
          let res = await axios.post("/user/login", {
            username: this.username,
            password: this.password
          });

          let token = res.data.data.token;
          this.$store.dispatch("setToken", token);
          this.$router.push("/");
        } catch (err) {
          this.error = true;
          this.errorMsg = err.response.data.message;
        }

        this.loading = false;
      }
    }
  },
  watch: {
    username() {
      this.error = false;
      this.errorMsg = "";
    },
    password() {
      this.error = false;
      this.errorMsg = "";
    }
  },
  deactivated() {
    this.$destroy();
  }
};
</script>
