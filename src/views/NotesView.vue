<template>
  <div>
    Notes

    <div>
      <div>
        <button @click="toggle()">
          <span v-if="isList">list</span><span v-else>calendar</span>
        </button>
        <br />
        <br />
        <button @click="toggle()" :disabled="isList">List</button>
        <button @click="toggle()" :disabled="!isList">calendar</button>
      </div>
      <br />

      <div v-if="notes">
        <div v-if="isList">
          <List :notes="notes" />
        </div>
        <div v-else>
          <Calendar :notes="notes" />
        </div>
      </div>
    </div>

    <br />
    <br />

    <div v-if="notes">
      <div
        v-for="(item, index) in notes"
        :key="index"
        @click="handleRemove(item._id)"
      >
        item: {{ item.title }}
      </div>
    </div>

    <button @click="navToNote">view</button>

    <button @click="navToEdit">edit</button>
    <button
      @click="
        (e) => {
          handleRemove(note_id);
        }
      "
    >
      remove
    </button>
  </div>
</template>

<script setup>
import { NoteService } from "@/services/api/requests/note/note.service";
import { useStore } from "@/stores/pinia/store";
import { toRefs, ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import List from "@/components/List.vue";
import Calendar from "@/components/Calendar.vue";

const router = useRouter();

const store = useStore();
const { user, userDoc, notes } = toRefs(store);

const isList = ref(false);

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
});
</script>

<style lang="scss" scoped>
</style>
