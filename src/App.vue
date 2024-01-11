<template>
  <!--<nav>
    <template v-if="store.isAuth">
      <router-link to="/">Home</router-link> |
      <router-link to="/notes">Notes</router-link> |
      <router-link to="/notes/new">NewNote</router-link> |
      <router-link to="/about">About</router-link> |
      <span @click="logout">logout</span>
    </template>
    <router-link to="/login" v-if="!store.isAuth">Login </router-link>
  </nav>-->

  <Header />

  <main>
    <router-view :isAuth="store.isAuth" />
  </main>
</template>

<script setup>
import { ref, computed, onMounted, toRefs } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "./stores/pinia/store";
import Header from "@/components/Header.vue";
import { UserService } from "./services/api/requests/user/user.service";


const store = useStore();

const router = useRouter();

const auth = ref(store.isAuth);
const user_doc = ref(null)

const { user, userDoc } = toRefs(store);

auth.value = computed(() => {
  return store.isAuth;
});

const logout = (e) => {
  //store.setAuth(false);
  store.logout();
  router.push({ path: "/login" });
};

 user_doc.value = computed( async () => {
   if (user && user.id) {
    const doc = UserService.getUserByID(user.id);
    doc.then((th) => console.log("doc: ", doc));
    return await doc
  }
})

// build-in hook
onMounted(() => {
  console.log("mounted app");
  //store.fetchUserByID(user.id);
  //const doc = store.getUserByID()
  /*if(doc){
      user_doc.value  = doc
      console.log("fetch use doc in home:", doc)
    }*/
  console.log("mounted userDoc ");

});
</script>

<style lang="scss">
/*@import '~bootstrap';
@import '~bootstrap-vue';
@import '~bootstrap/scss/bootstrap.scss';
@import '~bootstrap-vue/src/index.scss';
*/

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
