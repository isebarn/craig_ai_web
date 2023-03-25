<template>
  <q-card
    style="
      width: 22vw;
      padding-top: 24px;
      border-radius: 24px;
      padding-left: 24px;
      padding-right: 24px;
    "
  >
    <!-- large text -->
    <div class="text-h2 q-pa-md" style="font-weight: bold">{{ plan.type }}</div>
    <!-- huge text -->
    <div class="row items-end text-h1 q-pa-md">
      <strong>${{ plan.price }}</strong>
      <div class="text-h6" style="color: gray">/month</div>
    </div>
    <!-- secondary text -->
    <div class="text-h4 q-pa-md" style="font-weight: lighter">
      {{ plan.description }}
    </div>
    <!-- line splitting the card -->
    <q-separator style="margin: 12px" />
    <!-- list of features -->
    <q-list>
      <div
        v-for="(detail, i) in plan.details"
        :key="i"
        class="row justify-start items-end q-pa-md"
      >
        <q-avatar
          size="32px"
          font-size="24px"
          color="primary"
          text-color="white"
          icon="check"
          style="margin-right: 32px"
        />
        <q-item-label class="text-h5">{{ detail }}</q-item-label>
      </div>
    </q-list>
    <!-- full width button to sign up -->
    <div class="row q-pa-md">
      <q-btn
        class="q-pa-md full-width text-h5"
        rounded
        outline
        color="primary"
        label="Sign up"
        style="margin: 24px"
        to="/signup"
      />
    </div>
  </q-card>
</template>

<script>
export default {
  name: "PlanCard",
  props: {
    plan: {
      type: Object,
      required: true,
    },
  },
};
</script>
