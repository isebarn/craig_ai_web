<template>
  <q-page>
    <div class="row window-height">
      <div class="col-6">
        <!-- signup form with email, password and confirm password -->
        <div class="row justify-center items-center window-height">
          <div class="col-8 q-pa-md">
            <div class="text-h2 text-primary">Sign Up</div>
            <div v-if="state.failedSignup" class="text-h6 text-negative">
              Account with this email already exists
            </div>
            <div class="q-pa-md">
              <q-input
                v-model="email"
                label="Email"
                filled
                type="email"
                hint="Enter your email"
                :rules="[
                  (val) => (val && val.length > 0) || 'Please enter your email',
                ]"
              />
              <q-input
                v-model="password"
                label="Password"
                filled
                type="password"
                hint="Enter your password"
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Please enter your password',
                ]"
              />
              <q-input
                v-model="confirmPassword"
                label="Confirm Password"
                filled
                type="password"
                hint="Confirm your password"
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Please confirm your password',
                ]"
              />
              <div class="row justify-end">
                <q-btn
                  class="q-pa-md text-h5"
                  rounded
                  outline
                  color="primary"
                  label="Sign Up"
                  @click="signup"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-6 bg-primary">
        <!-- large text and subtitle centered vertically and horizontally-->
        <div class="row justify-center items-center window-height">
          <div class="col-8 q-pa-md">
            <div class="text-h1 text-white">Welcome!</div>
            <div class="text-h6 text-info">Sign up to continue</div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { reactive, computed, ref } from "vue";
import { useAuthenticationStore } from "../stores/authentication";

export default {
  // name: 'PageName',
  setup() {
    const email = ref("a@isebarn.com");
    const password = ref("blink182");
    const confirmPassword = ref("blink182");

    const store = useAuthenticationStore();

    const state = reactive({
      loading: computed(() => store.loading),
      failedSignup: computed(() => store.failedSignup),
    });

    const signup = () => {
      store.signup(email.value, password.value);
    };

    return {
      email,
      password,
      state,
      confirmPassword,
      signup,
    };
  },
};
</script>
