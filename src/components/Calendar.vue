<template>
  <div>
    Calendar #######--------------------
    <div>
    </div>

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

import { ref, toRef } from "vue";

const props = defineProps(["notes"]);
const { notes } = toRef(props);


</script>
