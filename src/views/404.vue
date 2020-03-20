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
          <v-card elevation="10">
            <v-card-title primary-title class="justify-center">
              <div>
                <h3 class="headline pink--text text--accent-2">404 ☹️</h3>
                <div>This page is not available, please use the link to go back to the {{whereToGo.name}} page.</div>
              </div>
            </v-card-title>
            <v-card-actions class="justify-center">
              <v-btn block text outlined :to="whereToGo.to" color="orange">{{whereToGo.name}}</v-btn>
            </v-card-actions>
          </v-card>
        </v-lazy>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  computed: {
    whereToGo() {
      return this.$store.getters.isLoggedIn
        ? { name: "Home", to: "/" }
        : { name: "Login", to: "/login" };
    }
  }
};
</script>
