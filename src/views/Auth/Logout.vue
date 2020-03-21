<template>
  <p></p>
</template>

<script>
export default {
  beforeCreate() {
    this.$store.dispatch("logout");
    this.$router.push("/login");
  },
  deactivated() {
    this.$destroy();
  }
};
</script>
