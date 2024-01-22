<template>
  <div class="d-flex justify-center mb-6 ">
    <!-- form -->
    <v-btn @click="handleClickStateBtn"> {{action_type}}</v-btn>
     <v-sheet width="400" class="mt-6">
        <AuthForm :action_type="action_type" @handleClick="handleSubmit" />
     </v-sheet>


    <!--<div v-if="action_type=='sign-in'">
      <AuthForm :action_type="action_type" />-->
        <!--<button @click="handleSignIn">Sign-in</button>-->
   <!-- </div>-->
     <!--<div v-else-if="action_type=='sign-up'">
      <AuthForm :action_type="action_type" />-->
        <!--<button @click="handleSignup">Sign-up</button>-->
    <!--</div>-->



  </div>
</template>

<script setup>
import { computed, ref, nextTick, onMounted, onUpdated } from "vue";
import { useStore } from "../stores/pinia/store";
import { useRoute, useRouter } from "vue-router";
import { UserService } from "@/services/api/requests/user/user.service";
import AuthForm from '@/components/AuthForm.vue'
const router = useRouter();

const btn = ref('sign-in')

const isAuth = ref(false);
const res = ref(false);

const store = useStore();
const y = ref(false);
const x = ref(false);
const action_type = ref('sign-in')

res.value = computed(() => {
  return store.isAuth;
});

const handleSignup = async (val) => {
  console.log('handleSignup: ', val)
  //store.signup("test7@gmx.de", "127127");
};

const handleSignIn = async (val) => {
   console.log('handleSignIn: ', val)

  //isAuth.value = !isAuth.value;

  //store.setAuth(isAuth.value);

  //store.setAuthLogin("test1@gmx.de", "123123");
  store.setAuthLogin(val.email, val.password);
  const user_ = await store.getUserAfterSignin
  const _id = user_.id

  console.log("user signin: ", user_, _id)

  if(user_ && _id){
      //
    const user = await UserService.getUserByID(_id);
    if (user) {

      store.setUserDoc(user);
      console.log(" getUserByID in signin: ",user);
      isAuth.value = !isAuth.value;
      router.replace({ path: "/" });
  }

  //router.push({path: "/"})
  //
  }




};

const handleClickStateBtn = (e) => {
  if(action_type.value == 'sign-in'){
        action_type.value = 'sign-up'
    }else{
        action_type.value = 'sign-in'
    }

}

const handleSubmit = async (val) => {
if(action_type.value == 'sign-up'){
        handleSignup(val)
    }else if(action_type.value == 'sign-in'){
         await handleSignIn(val)
    }
}
</script>

<style lang="scss" scoped>

.v-sheet {
  margin: auto;
  margin-top: 30px;
}
</style>
