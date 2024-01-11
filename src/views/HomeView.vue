<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />

    auth: {{ is_auth }}

    user: <span v-if="usr">{{ usr.id }}</span>

    usr: user: <span v-if="userDoc">{{ userDoc.email }}</span>
  </div>
</template>

<script setup>
// @ is an alias to /src
import { computed, onBeforeMount, onMounted, ref, toRefs } from "vue";
import { useStore } from "../stores/pinia/store";
const isAuth = ref(false);
const y = ref(false);
const x = ref(false);

const props = defineProps(["isAuth"]);

const { isAuth: is_auth } = toRefs(props);

const store = useStore();
const { user, userDoc } = toRefs(store);
const usr = ref(user);
const user_doc = ref(userDoc);

//user_doc.value = computed(async () => {});

onMounted(async () => {
  console.log("mounted home")

    //await store.fetchUserByID(user.id);
    //const doc = store.getUserByID()
    /*if(doc){
      user_doc.value  = doc
      console.log("fetch use doc in home:", doc)
    }*/

});

y.value = computed(() => {
  if (store.isAuth) {
    return store.isAuth;
  }
});

/*usr.value = computed(() => {
  if(store.user){
    console.log("store.user: ", store.user)
    return store.user
  }
})*/
</script>
