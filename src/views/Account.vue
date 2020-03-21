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
          <v-card :loading="user.loading" class="pa-3 pt-0" elevation="10">
            <v-row></v-row>
            <v-alert class="mt-5" type="error" dismissible :value="error">{{errorMsg}}</v-alert>
            <v-form class="mt-5" v-model="valid" ref="registerForm" @submit.prevent="update">
              <v-text-field
                outlined
                :disabled="!name && user.loading"
                :rules="nameRules"
                name="name"
                label="Name"
                v-model="name"
              ></v-text-field>
              <v-text-field
                outlined
                :rules="usernameRules"
                name="username"
                label="Username"
                v-model="username"
                :disabled="!username && user.loading"
              ></v-text-field>
              <v-text-field
                outlined
                :rules="newPasswordRules"
                name="new password"
                label="New password"
                type="password"
                v-model="password"
                :disabled="!username && user.loading"
              ></v-text-field>
              <v-text-field
                outlined
                :rules="passwordRules"
                name="old password"
                label="Old password"
                type="password"
                v-model="oldPassword"
                :disabled="user.loading"
              ></v-text-field>
              <v-row class="justify-center">
                <v-col cols="10">
                  <v-btn
                    :loading="loading"
                    :disabled="!valid || user.loading"
                    type="submit"
                    color="success"
                    block
                  >Update</v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card>
        </v-lazy>
      </v-col>
    </v-row>
    <v-snackbar v-model="success">
      Data was updated
      <v-btn text color="success" @click.native="success = false">Ok</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import axios from "../plugins/axios";
export default {
  data: () => ({
    name: "",
    nameRules: [
      v => !!v || "Name is required",
      v => v.length <= 10 || "Name must be less than 10 characters"
    ],
    username: "",
    usernameRules: [
      v => !!v || "The username is required",
      v => /^[a-zA-Z0-9]+$/.test(v) || "The username must be valid"
    ],

    oldPassword: "",
    passwordRules: [
      v => !!v || "The password is required",
      v =>
        /^(?=.*\d).{8,16}$/.test(v) ||
        "Password must contain one number at least, and be between 8 and 16 in length"
    ],

    password: "",
    newPasswordRules: [
      v =>
        v.length == 0 ||
        /^(?=.*\d).{8,16}$/.test(v) ||
        "Password must contain one number at least, and be between 8 and 16 in length"
    ],

    loading: false,
    valid: false,

    error: false,
    errorMsg: "",

    user: {
      loading: true
    },
    success: false
  }),
  computed: {
    token() {
      return this.$store.getters.token;
    }
  },
  methods: {
    async update() {
      if (this.$refs.registerForm.validate()) {
        this.loading = true;
        this.error = false;
        this.errorMsg = "";
        try {
          //send login request:
          await axios.patch(
            "/user",
            {
              username: this.username,
              name: this.name,
              oldPassword: this.oldPassword,
              password: this.password
            },
            {
              headers: {
                authorization: `Barer ${this.token}`
              }
            }
          );

          this.success = true;

          //update token:
          //send login request:
          let res = await axios.post("/user/login", {
            username: this.username,
            password: this.password
          });

          let token = res.data.data.token;
          this.$store.dispatch("setToken", token);

          this.password = "";
          this.oldPassword = "";
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
    },
    name() {
      this.error = false;
      this.errorMsg = "";
    }
  },
  async created() {
    try {
      //send login request:
      let res = await axios.get("/user/me", {
        headers: {
          authorization: `Barer ${this.token}`
        }
      });
      this.user.loading = false;
      this.username = res.data.data.user.username;
      this.name = res.data.data.user.name;
    } catch (err) {
      this.error = true;
      this.errorMsg = err.response.data.message;
    }
  },
  deactivated() {
    this.$destroy();
  }
};
</script>
