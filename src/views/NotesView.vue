<template>
  <div>
    Notes

    <div>
      <div>
        <!--<button @click="toggle()">
          <span v-if="isList">list</span><span v-else>calendar</span>
        </button>-->

        <v-btn @click="toggle()" :disabled="isList">List</v-btn>
        <v-btn @click="toggle()" :disabled="!isList">calendar</v-btn>
      </div>
      <br />

      <div v-show="notes">
        <div v-show="isList">

          <List :notes="notes" />
        </div>
        <div v-show="!isList">
          <FCalendar :notes="notes" />
        </div>
      </div>
    </div>

    <br />
    <br />

    <!--<div v-if="notes">
      <div
        v-for="(item, index) in notes"
        :key="index"
        @click="handleRemove(item._id)"
      >
        item: {{ item.title }}
      </div>
    </div>-->

    <!--<button @click="navToNote">view</button>

    <button @click="navToEdit">edit</button>
    <button
      @click="
        (e) => {
          handleRemove(note_id);
        }
      "
    >
      remove
    </button>-->
  </div>
</template>

<script setup>
import { NoteService } from "@/services/api/requests/note/note.service";
import { useStore } from "@/stores/pinia/store";
import { toRefs, ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import List from "@/components/List.vue";
import Calendar from "@/components/Calendar.vue";
import FCalendar from "@/components/FCalendar.vue";


const router = useRouter();

const store = useStore();
const { user, userDoc, notes } = toRefs(store);

const isList = ref(true);

const note_id = "659bb95c0f5f634df4b24b92";

const navToEdit = (e) => {
  const route_name = "/notes/edit/:_id";
  // pass selected_note
  store.setNote({ _id: note_id });
  router.push({ path: "/notes/edit/" + note_id, params: { _id: note_id } });
};

const navToNote = () => {
  const route_name = "/notes/123";
  router.push({ path: route_name });
};

const handleRemove = async (_id) => {
  console.log("removed:", _id);
  //await store.removeNote(_id);
  //console.log("removed note: ", store.note);
};

const toggle = (val) => {
  isList.value = !isList.value;
};

onMounted(async () => {
  //const docs = await NoteService.getAllNotes()
  //console.log("fetch all notes:", docs)
  await store.setFetchAllNotes();
  console.log("user id**:", user,)
 // await store.setFetchAllNotesByUserID()
});
</script>

<style lang="scss" scoped>
</style>
