<template>
  <div>
    <div class="text-center">
      <v-btn color="" variant="plain">
        <v-dialog v-model="showAddDialog" activator="parent" :height="action_type == 'view' ? 650 : '' " :width="action_type == 'view' ? '350' : (action_type == 'remove' ? '300' : '500') ">
           <v-card >

            <div v-if="action_type == 'view' ">
                  <v-card-text>view</v-card-text>
                  <v-sheet width="350" class="mx-auto" >
                      <v-container class="bg-surface-variant">
                        <v-row
                          class="mb-6"
                          v-show="data"
                        >
                          <v-col >
                            <div v-for="item, k in data" class="d-flex flex-column gap-1 " :key="k">
                              <p v-if="k == 'title' || k == 'body' "> {{ k}} : {{item}}</p>
                              <p v-if=" k == 'body' ">
                                lorem The simpler of the table components is v-table, a basic wrapper component for the HTML
                                table element. In addition, regular table elements such as thead, tbody, tr, and td work by default.
                              </p>
                              <p v-if=" k == 'body' ">
                                lorem The simpler of the table components is v-table, a basic wrapper component for the HTML
                                table element. In addition, regular table elements such as thead, tbody, tr, and td work by default.
                              </p>
                              <p v-if=" k == 'body' ">
                                lorem The simpler of the table components is v-table, a basic wrapper component for the HTML
                                table element. In addition, regular table elements such as thead, tbody, tr, and td work by default.
                              </p>
                              <v-btn v-if=" k == 'body' " @click="close">Close</v-btn>
                            </div>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-sheet>

            </div>
              <div v-else-if="action_type == 'edit' ">

                 <v-card-text>Edit Note</v-card-text>
                 <div v-if="data">
                     <FormNote :action_type="action_type" :note="data" @handleClick="submit"  />
                 </div>

              </div>
              <div v-else-if="action_type == 'remove' ">

                  <v-sheet width="300" class="mx-auto">
                      <v-card-text>
                          <div class="text-h1 pa-12">Do you want remove it?</div>
                      </v-card-text>
                      <br>

                      <v-divider></v-divider>
                      <v-card-actions>
                            <v-btn
                              color="blue-darken-1"
                              variant="text"
                              @click="(e) => submit(e, false)"
                            >
                              No
                            </v-btn>
                            <v-btn
                              color="blue-darken-1"
                              variant="text"
                              @click="(e) => submit(e, true)"
                            >
                              Yes
                            </v-btn>
                      </v-card-actions>
                    </v-sheet>
               </div>

               <!--<v-card-actions>
                    <v-btn variant="text" block @click="close">Close Dialog</v-btn>
                </v-card-actions>-->
           </v-card>
           <v-card-actions v-show="action_type == 'edit'">
                   <v-btn class="bg-success" color="" block @click="close">Close Dialog</v-btn>
            </v-card-actions>
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
import FormNote from "@/components/FormNote.vue";
import ProfileForm from '@/components/ProfileForm.vue'



const props = defineProps(["showAddDialog", "selectedEvent", "action_type", "data", ]);
const { showAddDialog, selectedEvent, data, action_type,  } = toRefs(props);
const toggle = ref(false);
const event = ref();
const rules = ref([]);
const firstName = ref("");
const width = ref(600)
const height = ref(200)

const adapter = useDate();

const emits = defineEmits(["closeModal", "handleClick"]);

const close = () => {
  emits("closeModal", false);
};

width.value = computed( () => {
    if(action_type.value == 'view'){
      width.value = 300
        return 300
    }
    return '600'
})

const formate = ref();

rules.value.push(computed(() => {
  if (firstName.value) {
    return [true]
  }
  return ["You must enter a first name"];
}))

const submit = async (e, isRemoved = false, updated_data = null) => {
  console.log("submit: ", action_type.value)
  if(action_type.value === 'edit'){
     console.log("submit edit: ", action_type.value)
    emits("handleClick",data.value)
    close()
  }else if(action_type.value == 'view') {
         console.log("submit view")
  }else if(action_type.value == 'remove') {

         emits("handleClick",isRemoved)
         close()
  }else if(action_type.value == 'edit_profile') {
    console.log(updated_data)
         emits("handleClick",updated_data)
         close()
  }

}

/*
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
*/
</script>
