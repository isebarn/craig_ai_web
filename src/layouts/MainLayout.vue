<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-toolbar-title>ScriptShield</q-toolbar-title>
        <q-space />
        <q-btn outline label="Login" to="/login" />
        <q-btn flat label="Signup" to="/signup" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "MainLayout",

  setup() {},
});
</script>
