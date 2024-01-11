<template>
  <div>
    New Note , <span v-if="_id">id:{{ _id }}</span>

    <button @click="handleCreate">create</button>
  </div>
</template>

<script setup>
import { NoteService } from "@/services/api/requests/note/note.service";
import { computed, onBeforeMount, onMounted, ref, toRefs } from "vue";
import { useStore } from "../stores/pinia/store";

const store = useStore();
const { user, userDoc } = toRefs(store);
const usr = ref(user);
const user_doc = ref(userDoc);
const _id = ref(null);

const handleCreate = async (e) => {
  console.log("create note...!");
  if (_id.value) {
    console.log("_id*:", _id.value);
    //const doc = await NoteService.postCreateNoteByUserID(_id.value, {title: "tolla", body: "booda"})
    await store.createNote(_id.value, { title: "tolla2", body: "booda2" });
    //console.log("doc note: ", doc)
  }
};

/*
_id.value = computed(() => {
   if (user_doc) {
    console.log("create note user id*...!: ", user_doc.value);
    return user_doc.value._id;
  }
})*/

onMounted(() => {
  if (user_doc) {
    console.log("create note user id...!: ", user_doc.value);
    _id.value = user_doc.value._id;
    console.log("_id ", _id.value);
  }
});
</script>

<style lang="scss" scoped>
</style>
