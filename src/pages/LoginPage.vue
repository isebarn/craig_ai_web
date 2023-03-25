<template>
  <q-page>
    <div class="row window-height">
      <div class="col-6">
        <!-- login with email and password -->
        <div class="row justify-center items-center window-height">
          <div class="col-8 q-pa-md">
            <div class="text-h2 text-primary">Login</div>
            <div v-if="state.failedLogin" class="text-h6 text-negative">
              Incorrect credentials
            </div>
            <div class="q-pa-md">
              <q-input
                v-model="email"
                label="Email"
                filled
                type="email"
                :rules="[
                  (val) => (val && val.length > 0) || 'Please enter your email',
                ]"
              />
              <q-input
                v-model="password"
                label="Password"
                filled
                type="password"
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Please enter your password',
                ]"
              />
              <div class="row justify-end">
                <q-btn
                  v-if="!state.loading"
                  class="q-pa-md text-h5"
                  rounded
                  outline
                  color="primary"
                  label="Login"
                  @click="login(email, password)"
                />
                <q-spinner v-else color="primary" size="3em" :thickness="10" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-6 bg-primary">
        <!-- large text and subtitle centered vertically and horizontally-->
        <div class="row justify-center items-center window-height">
          <div class="col-8 q-pa-md">
            <div class="text-h1 text-white">Welcome back!</div>
            <div class="text-h6 text-info">Login to continue</div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { useAuthenticationStore } from "../stores/authentication";
import { reactive, computed, ref } from "vue";

export default {
  // name: 'PageName',

  setup() {
    const email = ref("isebarn@gmail.com");
    const password = ref("blink182");
    const store = useAuthenticationStore();

    const state = reactive({
      loading: computed(() => store.loading),
      failedLogin: computed(() => store.failedLogin),
    });

    const login = (email, password) => {
      store.login(email, password);
    };

    return {
      login,
      email,
      state,
      password,
    };
  },
};
</script>
