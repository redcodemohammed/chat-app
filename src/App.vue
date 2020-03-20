<template>
  <!-- App.vue -->
  <v-app>
    <nav>
      <AppBar />
    </nav>

    <!-- Sizes your content based upon application components -->
    <v-content>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
      <!-- Floating Button here -->
    </v-content>

    <footer>
      <!-- Footer here -->
    </footer>
  </v-app>
</template>
<script>
import AppBar from "./components/Theme/AppBar";
export default {
  components: {
    AppBar
  }
};
</script>
