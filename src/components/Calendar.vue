<template>
  <div>
    Calendar #######--------------------
    <div>
      {{ props.notes }}
    </div>
    <div v-for="(item, index) in notes" :key="index">
      item: {{ item.title }}
    </div>
    --------------------
  </div>
</template>



<script setup>


import { toRef } from "vue";

const props = defineProps(["notes"]);
const { notes } = toRef(props);


</script>
