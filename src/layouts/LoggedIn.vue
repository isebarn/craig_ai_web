<template>
  <q-layout view="hHh Lpr fFf">
    <q-header elevated>
      <q-toolbar class="bg-primary">
        <q-toolbar-title></q-toolbar-title>
        <q-btn flat round dense @click="routeTo('/prompts')"
          ><q-icon name="description"
        /></q-btn>
        <q-btn flat round dense @click="routeTo('/user')"
          ><q-icon name="person"
        /></q-btn>
        <q-btn flat round dense @click="logout()"
          ><q-icon name="logout"
        /></q-btn>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import { useAuthenticationStore } from "../stores/authentication";

export default {
  // name: 'LayoutName',

  methods: {
    routeTo(path) {
      this.$router.push(path);
    },
  },

  setup() {
    const miniState = ref(true);
    const store = useAuthenticationStore();
    const logout = () => {
      store.logout();
    };

    return {
      miniState,
      logout,
    };
  },
};
</script>
