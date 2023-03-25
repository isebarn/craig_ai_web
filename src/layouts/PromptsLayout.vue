<template>
  <q-layout view="hHh Lpr fFf">
    <q-header>
      <q-toolbar class="bg-primary">
        <q-toolbar-title>ScriptShield</q-toolbar-title>
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

    <q-drawer v-model="leftDrawerOpen" side="left" class="bg-grey-2 bg-primary">
      <q-scroll-area class="fit q-pa-sm bg-primary">
        <!-- q-list that iterates the items in state.prompts  -->
        <q-list v-for="item in state.prompts" :key="item.prompt">
          <q-item
            clickable
            v-ripple
            @click="setCurrentResponse(item.response_text)"
          >
            <q-item-section>
              <q-item-label class="text-h6 text-black">{{
                item.prompt_text
              }}</q-item-label>
              <q-item-label class="text-white" caption>{{
                item.response_text
              }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-separator class="bg-white q-ma-md" />
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { reactive, computed, ref } from "vue";
import { useAuthenticationStore } from "../stores/authentication";
import { usePromptStore } from "../stores/prompt";

export default {
  // name: 'LayoutName',

  methods: {
    routeTo(path) {
      this.$router.push(path);
    },
  },

  setup() {
    // auth part
    const leftDrawerOpen = ref(true);
    const miniState = ref(true);
    const authStore = useAuthenticationStore();
    const logout = () => {
      authStore.logout();
    };

    // prompt part
    const promptStore = usePromptStore();
    const state = reactive({
      // prompts are sorted by created_at
      prompts: computed(() => promptStore.prompts),
      currentResponse: computed(() => promptStore.currentResponse),
    });
    promptStore.getPrompts();
    const addPrompt = () => {
      promptStore.addPrompt(prompt.value);
    };

    const setCurrentResponse = (response) => {
      promptStore.setCurrentResponse(response);
    };

    return {
      leftDrawerOpen,
      miniState,
      logout,
      state,
      addPrompt,
      setCurrentResponse,
    };
  },
};
</script>
