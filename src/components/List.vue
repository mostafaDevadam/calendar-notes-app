<template>
  <div>
    List

    <AddDialog
    :showAddDialog="showAddDialog"
    @closeModal="closeModal"
    @handleClick="handleClick"
    :action_type="action_type"
    :data="note_doc" />


    <v-row align="center" justify="center" class="mx-auto">
      <v-col v-for="(item, i) in notes"
       :key="i"
       cols="3"
      >
       <v-card
        elevation="16"
          class="mx-auto my-8"
          max-width="344"
          :color="color"

        >
          <v-card-item>
            <div>
              <div class="text-overline mb-1">
                {{ item.title }}
              </div>
              <div class="text-h6 mb-1">
                Headline
              </div>
              <div class="text-caption">Greyhound divisely hello coldly fonwderfully</div>
            </div>
          </v-card-item>

          <v-card-text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </v-card-text>

          <v-card-actions class="d-flex flex-row " align-items="between">
            <v-btn class="bg-secondary" size="small" @click="(e) => {navToNote(e, item._id)}">
               View
            </v-btn>
            <v-btn class="bg-success" size="small" @click="(e) => {navToEdit(e, item._id)}">
               Edit
            </v-btn>
            <v-btn class="bg-danger" color="light"  size="small" @click="(e) => {handleRemove(e, item._id)}">
               Remove
            </v-btn>
          </v-card-actions>
        </v-card>




      </v-col>

      </v-row>

    <!--<div class="d-flex flex-column m-auto align-center gap-10">

      <div v-for="(item, index) in notes" :key="index" >
        <v-card
        class="mt-3 mx-auto"
        width="300"
        title="This is a title"
        subtitle="This is a subtitle"
        text="This is content"
      >
             <span>item: {{ item.title }}</span>
       </v-card>
      </div>

    </div>-->



  </div>
</template>

<script setup>
import { toRef, toRefs,  ref,  } from "vue";
import { useRouter } from "vue-router";
import { NoteService } from "@/services/api/requests/note/note.service";
import { useStore } from "@/stores/pinia/store";
import AddDialog from '@/components/AddDialog.vue'

const props = defineProps(["notes"]);
const { notes } = toRefs(props);
const router = useRouter();

const store = useStore();
const { user, userDoc, notes: store_notes } = toRefs(store);
const showAddDialog = ref(false)
const action_type = ref('view')
const emits = defineEmits([""])
const note_doc = ref()
const id_remove = ref()

const navToNote = (e, _id) => {
  action_type.value = "view"
  const route_name = "/notes/"+_id
  //router.push({ path: route_name,  params: { _id: _id } });
  // result = fetch data by id
  // note_doc.value = result
  fetchNote(_id)
   showAddDialog.value = true

};

const navToEdit = (e, _id) => {
  action_type.value = "edit"

  const route_name = "/notes/edit/:_id";
  // pass selected_note
  store.setNote({ _id: _id });
  //router.push({ path: "/notes/edit/" + _id, params: { _id: _id } });
  // result = fetch note by id
  // note_doc.value = result
  fetchNote(_id)
   showAddDialog.value = true
};

const save_update = async (val) => {
  //const obj = { title: "updated 07", body: "updated 07" };
  //await store.updateNote(data._id, data);
  console.log("save_update: " + val)
  console.log("save_update:", val._id, val)
  await store.updateNote(val._id, val);

}

const fetchNote = async (_id) => {
// result = fetch note by id
  // note_doc.value = result
  const result = await NoteService.getNoteById(_id);
  console.log("fetchNote result:", result);
  note_doc.value = result

}




const handleRemove = async (e, _id) => {
  console.log("removed:", _id);
   action_type.value = "remove"
  showAddDialog.value = true
  id_remove.value = _id

  // show dialog/modal and get boolean value from it
  // if bool value is true:
      //await store.removeNote(_id);
     //console.log("removed note: ", store.note);
};

const remove = async (val, isRemoved) => {
  if(val){
    console.log("remove note:", val, id_remove.value )
    await store.removeNote(id_remove.value );
    console.log("removed note: ", store.note);
  }else{
     console.log("remove note:", val)
  }

}

const handleClick = (val) => {

  if(action_type.value === 'edit'){
        save_update(val)
  }else if(action_type.value == 'view') {
         console.log("submit view")
  }else if(action_type.value == 'remove') {
          remove(val, true)
  }

}


const closeModal = (val) => {
  if (showAddDialog.value) {
    showAddDialog.value = val;
  }
};



</script>
