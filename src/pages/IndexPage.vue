<template>
  <q-page>
    <div class="row window-height content-around bg-primary">
      <div class="col-3"></div>
      <div class="col-6 q-pa-md text-center">
        <div class="text-h2 text-white" style="text-align: left">
          Unlock the Power of AI-Generated Copyright Scripts with ScriptShield
          AI
        </div>
        <div class="text-h6 text-info" style="text-align: left">
          Discover an innovative way to create high-quality, original scripts
          quickly and easily with ScriptShield AI, the cutting-edge SaaS that
          uses state-of-the-art artificial intelligence technology to generate
          unique copyright scripts tailored to your needs.
        </div>
      </div>
      <div class="col-3"></div>
    </div>
    <div class="row">
      <div class="col">
        <div class="row window-height bg-info justify-center content-center">
          <div class="q-pa-lg"><Plan :plan="basicPlan" /></div>
          <div class="q-pa-lg"><Plan :plan="proPlan" /></div>
        </div>
      </div>
    </div>
    <div class="row bg-positive" style="height: 20vh">
      Here we need some info like emails
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import Plan from "../components/Plan.vue";
export default defineComponent({
  name: "IndexPage",
  components: {
    Plan,
  },

  setup() {
    const basicPlan = {
      type: "Basic",
      price: 7,
      description: "For hobbyists and small businesses",
      details: ["7 scripts/month", "Script history", "Email support"],
    };

    const proPlan = {
      type: "Pro",
      price: 20,
      description: "For professionals and large businesses",
      details: ["Unlimited scripts", "Script history", "Email support"],
    };
    return {
      basicPlan,
      proPlan,
    };
  },
});
</script>

<style>
.semi-circle {
  background-color: #48abe0;
  border-radius: 0 0 100rem 100rem;
}
</style>
