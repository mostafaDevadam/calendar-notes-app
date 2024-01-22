<template>
  <div>
    <div v-if="_id">
    
        <FormNote :action_type="action_type" @handleClick="handleCreate" :data="note" />
   </div>
  </div>
</template>

<script setup>
import { NoteService } from "@/services/api/requests/note/note.service";
import { computed, onBeforeMount, onMounted, ref, toRefs } from "vue";
import { useStore } from "../stores/pinia/store";
import FormNote from "@/components/FormNote.vue";

const store = useStore();
const { user, userDoc } = toRefs(store);
const usr = ref(user);
const user_doc = ref(userDoc);
const _id = ref(null);
const note = ref({title: "", body: ""})
const action_type = ref('create')


const handleCreate = async (e) => {
  console.log("create note...!");
  if (_id.value) {
    action_type.value = "create"
    console.log("_id*:", _id.value, note.value);
    //const doc = await NoteService.postCreateNoteByUserID(_id.value, {title: "tolla", body: "booda"})
    if(note.value){
      await store.createNote(_id.value, note.value);
      //console.log("doc note: ", doc)
    }
  }
};

const handleClick = () => {
  if(action_type.value === 'create'){
        handleCreate()
  }
}

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
