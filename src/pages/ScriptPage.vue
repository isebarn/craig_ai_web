<template>
  <q-page class="column reverse" style="background-color: #f2f2f2">
    <div class="row bg-white align-center items-center" style="height: 15vh">
      <div class="col-6 offset-3">
        <q-input
          v-model="prompt"
          outlined
          label="Write a prompt here"
          :rules="[
            (val) => (val && val.length > 0) || 'Please enter your prompt',
          ]"
        >
          <template v-slot:append>
            <q-btn
              v-if="!state.loading"
              @click="addPrompt()"
              color="primary"
              round
              dense
              flat
              icon="send"
            />
            <q-spinner-ball v-else color="primary" size="1.5rem" /> </template
        ></q-input>
      </div>
    </div>
    <q-separator class="bg-grey" />
    <div
      class="row align-center items-center"
      style="background-color: #d9d9d9"
    >
      <div v-if="state.currentResponse" class="col-6 offset-3 q-pa-md text-h6">
        {{ state.currentResponse }}
      </div>
    </div>
    <q-separator class="bg-grey" />
  </q-page>
</template>

<script>
import { usePromptStore } from "../stores/prompt";
import { reactive, computed, ref } from "vue";

export default {
  // name: 'PageName',
  setup() {
    const prompt = ref("");

    const store = usePromptStore();
    const state = reactive({
      prompts: computed(() => store.prompts),
      currentResponse: computed(() => store.currentResponse),
      loading: computed(() => store._loading),
    });
    store.getPrompts();
    const addPrompt = () => {
      store.addPrompt(prompt.value);
    };

    return {
      state,
      prompt,
      history,
      addPrompt,
    };
  },
};
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.column {
  flex: 1;
}
</style>
