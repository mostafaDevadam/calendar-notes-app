<template>
  <div>
    <div class="text-center">
      <v-btn color="" variant="plain">
        <v-dialog v-model="modalShow" activator="parent" width="400">
          <v-card>
            <v-card-text v-if="event">
              <p>Event: {{ event.title }}</p>
              <p>Start: {{ event.start }}</p>
              <p v-if="formate">formate: {{ formate }}</p>

              <br />
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" block @click="close">Close Dialog</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-btn>
    </div>
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

const props = defineProps(["modalShow", "selectedEvent"]);
const { modalShow, selectedEvent } = toRefs(props);
const toggle = ref(false);
const event = ref();

const adapter = useDate();

const emits = defineEmits(["closeModal"]);

const close = () => {
  emits("closeModal", false);
};

const formate = ref();

formate.value = computed( (el) => {
  if (event.value) {
    let d = event.value.start;
    console.log("event computed:", d);
   let d2 = adapter.format(d, "dd-mm-YY");
   let d3 = (new Date(d)).toISOString().split('T')[0]
    return d3
  }
});

onUpdated(() => {
  console.log("mounted :", selectedEvent.value.event.title);
  event.value = selectedEvent.value.event;
});
</script>
