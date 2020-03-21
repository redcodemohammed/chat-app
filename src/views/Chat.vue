<template>
  <span>
    <v-container fluid>
      <p v-for="(message, i) in messages" :key="i">
        <v-chip outlined color="warning" v-if="message.type === 'left'">{{message.name}} left</v-chip>
        <v-chip outlined color="info" v-else-if="message.type === 'join'">{{message.name}} joined</v-chip>
        <span v-else>
          <v-chip :color="message.from === id ? 'blue' : 'green'">{{message.name}}</v-chip>:
          <span>{{message.message}}</span>
        </span>
      </p>
    </v-container>
    <v-footer app fixed>
      <!-- <v-text-field label="Message" outlined></v-text-field> -->
      <v-text-field
        @keypress.enter="sendMessage"
        v-model="message"
        label="Type a message"
        outlined
        hide-details
      >
        <template slot="append">
          <v-btn height="100%" icon @click="sendMessage">
            <v-icon left size="30">mdi-send</v-icon>
          </v-btn>
        </template>
      </v-text-field>
    </v-footer>
  </span>
</template>

<script>
export default {
  data: () => ({
    messages: [],
    id: "",
    message: ""
  }),
  computed: {
    token() {
      return this.$store.getters.token;
    }
  },
  methods: {
    sendMessage() {
      this.$socket.emit("sendmsg", this.message);
      this.message = "";
    }
  },
  watch: {
    messages() {
      let maxHeight = document.body.offsetHeight - window.innerHeight;
      window.scrollTo(0, maxHeight * 1000);
    }
  },
  created() {
    //join the chat:
    this.$socket.emit("join", this.token);
  },
  beforeDestroy() {
    this.$socket.emit("leave");
  },

  sockets: {
    signedup(id) {
      this.id = id;
    },
    msgsent(msg) {
      this.messages.push(msg);
    },
    userleft(name) {
      this.messages.push({ type: "left", name });
    },
    userjoin(name) {
      this.messages.push({ type: "join", name });
    }
  }
};
</script>
