<template>
<div>
     <div>

     </div>
  <v-form @submit.prevent="submit">
    <v-text-field
      v-model="data['email']"
      label="Email"
      type="email"
    ></v-text-field>

    <v-text-field
      v-model="data['password']"
      label="Password"
      type="password"
    ></v-text-field>

    <v-btn type="submit" class="mt-2">{{action_type}}</v-btn>
  </v-form>
  </div>
</template>


<script setup>
import {
  toRefs,
  ref,
  defineProps,
  defineEmits,
  onMounted,
  onUpdated,
  computed,
} from "vue";
import { useDate } from "vuetify";

const props = defineProps(["action_type", "fields"]);
const { action_type, fields } = toRefs(props);
const toggle = ref(false);
const event = ref();
const rules = ref([]);
const email = ref("");
const password = ref("");
const data = ref({email:'', password:''})

const adapter = useDate();

const emits = defineEmits(["handleClick"]);

const close = () => {
  emits("closeModal", false);
};

const formate = ref();

rules.value.push(
  computed(() => {
    if (email.value) {
      return [true];
    }else{
       return ["You must enter a email"];
    }

     if (password.value) {
      return [true];
    }else{
       return ["You must enter a password"];
    }

  })
);

const submit = async (e) => {
    if(action_type.value == 'sign-in'){
        emits("handleClick", data.value)
    }else if(action_type.value == 'sign-up'){
        emits("handleClick", data.value)
    }
};
</script>
