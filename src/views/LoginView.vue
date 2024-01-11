<template>
  <div>
    login

    <!-- form -->

    <button @click="handleSignIn">login</button>
    <button @click="handleSignup">Signup</button>
  </div>
</template>

<script setup>
import { computed, ref, nextTick, onMounted, onUpdated } from "vue";
import { useStore } from "../stores/pinia/store";
import { useRoute, useRouter } from "vue-router";
import { UserService } from "@/services/api/requests/user/user.service";

const router = useRouter();

const isAuth = ref(false);
const res = ref(false);

const store = useStore();
const y = ref(false);
const x = ref(false);

res.value = computed(() => {
  return store.isAuth;
});

const handleSignup = async (e) => {
  store.signup("test7@gmx.de", "127127");
};

const handleSignIn = async (e) => {
  isAuth.value = !isAuth.value;

  //store.setAuth(isAuth.value);

  store.setAuthLogin("test1@gmx.de", "123123");

  //
  const user = await UserService.getUserByID("659ba6a73810f134e09d360c");
  if (user) {
    store.setUserDoc(user);
    console.log(user);
  }

  //router.push({path: "/"})
  router.replace({ path: "/" });
};
</script>

<style lang="scss" scoped>
</style>
