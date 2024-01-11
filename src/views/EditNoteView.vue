<template>
  <div>
    Edit Note

    <div v-if="id">{{ id }}</div>
    <div v-show="note">{{ note }}</div>

    <div v-show="store.note">{{ store.note }}</div>

    <div v-if="refStore.note">{{ refStore.note }}</div>

    <button @click="handleUpdate">update</button>
  </div>
</template>

<script setup>
import { NoteService } from "@/services/api/requests/note/note.service";
import { useStore } from "@/stores/pinia/store";
import { ref, toRefs, computed, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const store = useStore();

const refStore = toRefs(store);

const id = ref(route.params._id);

const note = ref();
/*
id.value = computed(() => {
  const _id = route.params._id;
  return _id;
});*/

note.value = computed(async () => {
  if (id.value) {
    const doc = await NoteService.getNoteById(id.value);
    console.log("note doc 1:", doc);
    //await store.setFetchNoteById(id.value)
    //return doc
  }
  if (store.note && store.note._id) {
    const doc = await NoteService.getNoteById(store.note._id);
    console.log("note doc 2:", doc);
    //await store.setFetchNoteById(store.note._id)
    store.setNote(doc);
    return doc;
  }
});

const handleUpdate = async () => {
  /*const updated = await NoteService.patchUpdateNoteById(id.value, {
    title: "updated 03",
    body: "updated 03",
  });*/
  const obj = { title: "updated 07", body: "updated 07" };
  await store.updateNote(id.value, obj);
};

onMounted(async () => {
  if (id.value) {
    const _id = id.value;
    console.log("mounted id: ", _id);
  }
});
</script>

<style lang="scss" scoped>
</style>
