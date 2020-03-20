<template>
  <div>
    <v-app-bar color="primary" app>
      <v-app-bar-nav-icon class="hidden-md-and-up" @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Chat App</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon class="hidden-sm-and-down">
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon class="hidden-sm-and-down">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-menu left bottom class="hidden-sm-and-down">
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" class="hidden-sm-and-down">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list class="hidden-sm-and-down">
          <v-list-item v-for="(link, i) in links" :key="i" :to="link.to">
            <v-list-item-title>{{ link.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" app temporary>
      <v-list>
        <v-list-item v-for="(link, i) in drawerLinks" :key="i" :to="link.to">
          <v-list-item-icon>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ link.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template v-slot:append v-if="isLoggedIn">
        <div class="pa-2">
          <v-btn block to="/logout">Logout</v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </div>
</template>
<script>
export default {
  data: () => ({
    drawer: false
  }),
  computed: {
    links() {
      return this.$store.getters.isLoggedIn
        ? [
            { title: "Home", to: "/" },
            { title: "Account", to: "/account" },
            { title: "Chat", to: "/chat" },
            { title: "Logout", to: "/logout" }
          ]
        : [
            { title: "Login", to: "/login" },
            { title: "Register", to: "/register" }
          ];
    },
    drawerLinks() {
      return this.$store.getters.isLoggedIn
        ? [
            { title: "Home", to: "/", icon: "mdi-home" },
            { title: "Account", to: "/account", icon: "mdi-account" },
            { title: "Chat", to: "/chat", icon: "mdi-chat" }
          ]
        : [
            { title: "Login", to: "/login", icon: "mdi-login" },
            { title: "Register", to: "/register", icon: "mdi-account-plus" }
          ];
    },
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    }
  }
};
</script>
