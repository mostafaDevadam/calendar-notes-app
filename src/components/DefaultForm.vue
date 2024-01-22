
<template>
  <v-form @submit.prevent="handleSubmit">
    <v-text-field
      v-model="firstName"
      label="First name"
      :rules="rules"
    ></v-text-field>

    <v-text-field
      v-model="lastName"
      label="Last name"
      :rules="rules"
    ></v-text-field>

    <v-btn type="submit" class="mt-2">Submit</v-btn>
  </v-form>
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

const props = defineProps(["showAddDialog", "selectedEvent"]);
const { showAddDialog, selectedEvent } = toRefs(props);
const toggle = ref(false);
const event = ref();
const rules = ref([]);
const firstName = ref("");
const lastName = ref("");

const adapter = useDate();

const emits = defineEmits(["closeModal"]);

const close = () => {
  emits("closeModal", false);
};

const formate = ref();

rules.value.push(
  computed(() => {
    if (firstName.value) {
      return [true];
    }
    return ["You must enter a first name"];
  })
);

const submit = (e) => {
  alert("submit");
};
</script>
