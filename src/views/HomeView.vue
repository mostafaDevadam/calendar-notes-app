<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />

    <div ref="container"></div>

    <div>
      <p ref="container">dddd</p>
      <button @click="(e) => insert(container)">ok</button>
    </div>

    <!--<component :is="con"></component>-->
  </div>
</template>

<script setup>
// @ is an alias to /src
import {
  computed,
  onBeforeMount,
  onMounted,
  ref,
  toRefs,
  onUnmounted,
  getCurrentInstance,
  watchEffect,
} from "vue";
import { useStore } from "../stores/pinia/store";

import { renderComponent, renderComponent2 } from "@/help/renderComponent";

import HelloWorld from "@/components/HelloWorld.vue";
import Profile from "@/views/ProfileView.vue";

const { appContext } = getCurrentInstance();

let counter = 1;
let destroyComp = null;

onUnmounted(() => destroyComp?.());

const container = ref();

const con = ref(HelloWorld);

watchEffect(() => {
  if (container.value) {
    container.value.focus();
    console.log("watch: ", container.value);
  } else {
    // not mounted yet, or the element was unmounted (e.g. by v-if)
  }
});

onMounted(() => {
  console.log("co: ", container.value);
});

const insert = async (el) => {
  container.value.innerText = "www";

  // con.value = Profile

  destroyComp?.();
  destroyComp = renderComponent2({
    el: el, //container.value,
    component: (await import("@/components/HelloWorld.vue")).default,
    props: {
      key: counter,
      msg: "Message " + counter++,
    },
    appContext,
  });
};

const AsyncComponent = () => ({
  // The component to load (should be a Promise)
  component: import("@/components/HelloWorld.vue"),
  // A component to use while the async component is loading
  loading: HelloWorld,
  // A component to use if the load fails
  error: HelloWorld,
  // Delay before showing the loading component. Default: 200ms.
  delay: 200,
  // The error component will be displayed if a timeout is
  // provided and exceeded. Default: Infinity.
  timeout: 3000,
});

const change = (e) => {
  console.log("change element");
  container.value = 33;
};
</script>


<style lang="scss" scoped>
</style>
