<template>
  <q-page padding>
    <div class="row window-height">
      <div class="col-6">
        <!-- overview for email, subscription_type, last_payment_date, next_payment_date, total_uses, remaining_uses -->
        <q-card flat>
          <q-card-section>
            <div class="text-h5">Email</div>
            <div class="text-h6">{{ state.user.email }}</div>
          </q-card-section>
          <q-card-section>
            <div class="text-h5">Subscription Type</div>
            <div class="text-h6">{{ state.user.subscription_type }}</div>
          </q-card-section>
          <q-card-section>
            <div class="text-h5">Subscription ID</div>
            <div class="text-h6">{{ state.user.subscription_id }}</div>
          </q-card-section>
          <q-card-section>
            <div class="text-h5">Customer ID</div>
            <div class="text-h6">{{ state.user.customer_id }}</div>
          </q-card-section>
          <q-card-section>
            <div class="text-h5">Last Payment Date</div>
            <div class="text-h6">{{ state.user.last_payment_date }}</div>
          </q-card-section>
          <q-card-section>
            <div class="text-h5">Next Payment Date</div>
            <div class="text-h6">{{ state.user.next_payment_date }}</div>
          </q-card-section>
          <q-card-section>
            <div class="text-h5">Total Uses</div>
            <div class="text-h6">{{ state.user.total_uses }}</div>
          </q-card-section>
          <q-card-section>
            <div class="text-h5">Remaining Uses</div>
            <div class="text-h6">
              {{
                state.user.subscription_type == "pro"
                  ? "infinite"
                  : state.user.remaining_uses
              }}
            </div>
          </q-card-section>
          <!-- if user is subscribed, show cancel subscription button -->
          <q-card-section v-if="state.user.subscription_type !== 'free'">
            <q-btn
              outline
              class="full-width"
              color="primary"
              @click="cancelSubscription()"
              >Cancel Subscription</q-btn
            >
          </q-card-section>
        </q-card>
      </div>
      <div
        v-if="
          state.user.subscription_type === 'free' ||
          state.user.subscription_type === 'basic'
        "
        class="col-6 bg-white q-pa-sm"
      >
        <!-- form to fill in card and billing_details -->
        <q-input v-model="card.number" label="Card Number" outlined />
        <div class="row justify-between">
          <div class="col">
            <q-input
              v-model="card.exp_month"
              label="Expiration Month"
              outlined
            />
          </div>
          <div class="col">
            <q-input v-model="card.exp_year" label="Expiration Year" outlined />
          </div>
          <div class="col">
            <q-input v-model="card.cvc" label="CVC" outlined />
          </div>
        </div>
        <q-input v-model="billing_details.name" label="Name" outlined />
        <div class="row">
          <q-input
            v-model="billing_details.address.line1"
            label="Line 1"
            outlined
          />
          <q-input
            v-model="billing_details.address.line2"
            label="Line 2"
            outlined
          />
        </div>
        <div class="row">
          <q-input
            v-model="billing_details.address.city"
            label="City"
            outlined
          />
          <q-input
            v-model="billing_details.address.postal_code"
            label="Postal Code"
            outlined
          />
        </div>
        <div class="row">
          <q-input
            v-model="billing_details.address.state"
            label="State"
            outlined
          />
          <q-input
            v-model="billing_details.address.country"
            label="Country Code"
            outlined
          />
        </div>
        <!-- two buttons, one to call subscribeBasic and another to call subscribePro -->
        <div class="row q-pa-sm">
          <div v-if="state.user.subscription_type == 'free'" class="col-6">
            <q-btn flat class="full-width" @click="subscribeBasic()"
              ><div v-if="!state.loadingBasic">Subscribe Basic</div>
              <q-spinner v-else color="primary" size="1em" :thickness="10"
            /></q-btn>
          </div>
          <div class="col-6">
            <q-btn
              outline
              class="full-width"
              color="primary"
              @click="subscribePro()"
              ><div v-if="!state.loadingPro">{{ subscribeProText }}</div>
              <q-spinner v-else color="primary" size="1em" :thickness="10"
            /></q-btn>
          </div>
        </div>
        <!-- if subscription failed, show error message -->
        <div v-if="state.subscriptionFailed">
          <q-card>
            <q-card-section>
              <div class="text-h5">Subscription Failed</div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { useUserStore } from "../stores/user";
import { reactive, computed, ref } from "vue";

export default {
  // name: 'PageName',
  setup() {
    const store = useUserStore();
    store.fetchUser();

    const card = ref({
      number: "",
      exp_month: null,
      exp_year: null,
      cvc: "",
    });

    const billing_details = ref({
      name: "",
      address: {
        city: "",
        country: "",
        line1: " ",
        line2: "",
        postal_code: "",
        state: "",
      },
    });

    const subscribeBasic = () => {
      store.subscribeBasic(card.value, billing_details.value);
    };

    const subscribePro = () => {
      store.subscribePro(card.value, billing_details.value);
    };

    const cancelSubscription = () => {
      store.cancelSubscription();
    };

    const subscribeProText = computed(() => {
      if (store.user.subscription_type === "free") {
        return "Subscribe Pro";
      } else {
        return "Upgrade to Pro";
      }
    });

    const state = reactive({
      user: computed(() => store.user),
      subscriptionFailed: computed(() => store.subscriptionFailed),
      loadingUser: computed(() => store.loadingUser),
      loadingBasic: computed(() => store.loadingBasic),
      loadingPro: computed(() => store.loadingPro),
    });

    return {
      state,
      subscribeProText,
      subscribeBasic,
      subscribePro,
      card,
      billing_details,
      cancelSubscription,
    };
  },
};
</script>

<style scoped>
.q-input {
  margin: 4px;
  padding: 4px;
}
</style>
