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
            <v-form v-model="valid" ref="registerForm" @submit.prevent="register">
              <v-text-field outlined :rules="nameRules" name="name" label="Name" v-model="name"></v-text-field>
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
                  >Register</v-btn>
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

    password: "",
    passwordRules: [
      v => !!v || "The password is required",
      v =>
        /^(?=.*\d).{8,16}$/.test(v) ||
        "Password must contain one number at least, and be between 8 and 16 in length"
    ],

    loading: false,
    valid: false
  }),
  methods: {
    register() {
      if (this.$refs.registerForm.validate()) {
        this.loading = true;
        // let { username, password } = this;
      }
    }
  }
};
</script>
