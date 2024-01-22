<template>
  <nav>
     <template v-if="store.isAuth">
      <!--<router-link to="/">Home</router-link> |-->
      <router-link to="/notes">Home</router-link> |
      <router-link to="/notes/new">NewNote</router-link> |
      <!--<router-link to="/about">About</router-link>--> |
      <router-link to="/profile">Profile</router-link> |

      <span v-if="userDoc"> <router-link to="/profile" class="link">{{ userDoc.email }}</router-link></span> |

    </template>


    <router-link to="/login" v-if="!store.isAuth">Login</router-link>

    <a href="javascript:void(0)" @click="logout" v-if="store.isAuth">logout</a>
  </nav>
</template>

<script setup>
import { ref, computed, toRefs,  } from "vue";

import { useStore } from "../stores/pinia/store";
import { useRoute, useRouter } from "vue-router";

const store = useStore();
const { user, userDoc } = toRefs(store);
const router = useRouter();

const auth = ref(store.isAuth);

auth.value = computed(() => {
  return store.isAuth;
});

const logout = (e) => {
  store.setAuth(false);
  store.logout()
  router.push({ path: "/login" });
};




</script>

<style lang="scss" scoped>

.link {
  text-decoration-line: none;
}
</style>
