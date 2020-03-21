<template>
  <v-container>
    <v-row class="justify-space-between">
      <v-col cols="4" class="hidden-md-and-down">
        <v-card>
          <v-responsive class="overflow-y-auto" max-height="400">
            <v-list shaped>
              <v-subheader>Users</v-subheader>
              <v-list-item-group color="primary">
                <v-list-item v-for="(user, i) in users" :key="i">
                  <v-list-item-content>
                    <v-list-item-title v-text="user.name"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-responsive>
        </v-card>
      </v-col>
      <v-col cols="12" lg="8">
        <v-card>
          <v-responsive class="overflow-y-auto" id="chat" max-height="450">
            <v-row v-for="(msg,i) in messages" :key="i">
              <v-col cols="12">
                <Message :mine="msg.from === myId" :message="msg.message" :from="msg.name" />
              </v-col>
            </v-row>
          </v-responsive>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="sticky">
        <v-footer app>
          <!-- <v-text-field label="Message" outlined></v-text-field> -->
          <v-text-field v-model="msg" label="Type a message" outlined hide-details>
            <template slot="append">
              <v-btn height="100%" icon @click="sendMsg">
                <v-icon left size="30">mdi-send</v-icon>
              </v-btn>
            </template>
          </v-text-field>
        </v-footer>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import Message from "../components/Theme/Message";
export default {
  components: {
    Message
  },
  data: () => ({
    myId: "",
    users: [],
    messages: [],
    msg: "",
    totalChatHeight: 0
  }),
  methods: {
    sendMsg() {
      this.$socket.emit("sendmsg", this.msg);
      this.msg = "";
    }
  },
  computed: {
    token() {
      return this.$store.getters.token;
    }
  },
  sockets: {
    changeusers(users) {
      this.users = users;
    },
    signedup(id) {
      this.myId = id;
    },
    msgsent(msg) {
      this.messages.push(msg);
    }
  },
  created() {
    this.$socket.emit("signup", this.token);
  }
};
</script>
<style  scoped>
.chat {
  overflow-y: scroll;
}
</style>
