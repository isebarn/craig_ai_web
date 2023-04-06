<template>
  <q-page class="column" style="background-color: #f2f2f2">
    <div class="row bg-white align-center items-center">
      <div class="col-6 offset-3 q-pa-sm">
        <div>
          <q-select
            v-model="model"
            use-input
            class="q-pa-sm q-pb-lg"
            hide-selected
            fill-input
            outlined
            input-debounce="0"
            label="Style"
            :options="options"
            @filter="filterFn"
          />
        </div>
        <div class="q-pa-sm">
          <q-input v-model="brand" outlined label="Brand" />
        </div>
        <div class="q-pa-sm">
          <q-input v-model="product" outlined label="Product" />
        </div>
        <div class="q-pa-sm">
          <q-input v-model="benefits" outlined label="Benefits" />
        </div>
        <div class="q-pa-sm">
          <q-input v-model="prompt" outlined label="Write a prompt here">
          </q-input>
        </div>
        <div class="q-pa-sm">
          <div class="row bg-white align-center items-center">
            <div class="col-3 q-pa-xs">
              <q-btn
                v-if="!state.loading"
                @click="clearInputs()"
                color="primary"
                disable
                class="full-width"
                >Get more scripts</q-btn
              >
            </div>
            <div class="col-3 q-pa-xs">
              <q-btn
                v-if="!state.loading"
                @click="clearInputs()"
                color="primary"
                class="full-width"
                >Clear Inputs</q-btn
              >
            </div>
            <div class="col-3 offset-3 q-pa-xs" style="full-width">
              <q-btn
                v-if="!state.loading"
                @click="addPrompt()"
                color="primary"
                class="full-width"
                >| 1 |</q-btn
              >
            </div>
            <!-- <q-spinner-ball v-else color="primary" size="1.5rem" /> -->
          </div>
        </div>
      </div>
    </div>
    <q-separator class="bg-grey" />
    <div
      class="row align-center items-center q-pa-lg"
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

const styles = [
  "Unboxing",
  "Problem Solution",
  "Testimonial",
  "2 Person 1 Person",
  "Before & After",
];

export default {
  // name: 'PageName',

  data() {
    return {
      options: styles,
    };
  },

  methods: {
    filterFn(val, update, abort) {
      // call abort() at any time if you can't retrieve data somehow

      setTimeout(() => {
        update(() => {
          if (val === "") {
            this.options = styles;
          } else {
            const needle = val.toLowerCase();
            this.options = styles.filter(
              (v) => v.toLowerCase().indexOf(needle) > -1
            );
          }
        });
      }, 100);
    },

    clearInputs() {
      this.brand = "";
      this.product = "";
      this.prompt = "";
      this.model = "";
      this.benefits = "";
    },
  },

  setup() {
    const prompt = ref("");
    const model = ref("");

    const brand = ref("");
    const product = ref("");
    const benefits = ref("");
    const style = ref("");

    const store = usePromptStore();
    const state = reactive({
      prompts: computed(() => store.prompts),
      currentResponse: computed(() => store.currentResponse),
      loading: computed(() => store._loading),
    });
    store.getPrompts();
    const addPrompt = () => {
      store.addPrompt({
        prompt: prompt.value,
        brand: brand.value,
        product: product.value,
        style: model.value,
        benefits: benefits.value,
      });
    };

    return {
      benefits,
      model,
      brand,
      product,
      style,
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
