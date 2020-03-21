<template>
  <span>
    <v-chip class="mx-2" :color="mine ? 'primary' :'success'" text-color="white">{{from}}</v-chip>
    <span>{{message}}</span>
  </span>
</template>
<script>
export default {
  props: ["message", "from", "mine"]
};
</script>
