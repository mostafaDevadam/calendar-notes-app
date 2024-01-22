    <template>
  <div>
    <div>
      <div v-if="action_type == 'create'">
        <h5>Create New Note</h5>
         <v-sheet width="300" class="mx-auto" height="500">
            <v-form @submit.prevent="submit" >
                <div v-for="(field, k_ ) in data" :key="k_">
                  <v-text-field v-model="data[k_]" :name="k_" :id="k" :placeholder="k_" :label="k_" ></v-text-field>
                </div>
                <v-btn type="submit" class="mt-2">Submit</v-btn>
            </v-form>
         </v-sheet>

       <!-- <div v-for="field, k in data">
           <input type="text" v-model="data[k]" :name="k" :id="k" :placeholder="k" />
        </div>
        <v-btn @click="submit">Save</v-btn>

        <div>
          form
          <v-sheet width="300" class="mx-auto" >

          <input type="text" v-model="data.title" name="title" id="title" placeholder="title"  />
          <input type="text" v-model="data.body" name="body" id="body" placeholder="body"  />
          <v-btn @click="submit">Save</v-btn>
          </v-sheet>
        </div>-->



          <!--<div v-else-if="action_type == 'edit_note'">
            <input type="text" v-model="update_note.title" />
            <input type="text" v-model="update_note.body" />
            <v-btn @click="update">update</v-btn>
          </div>-->

       </div>

        <div v-else-if="action_type == 'edit'">
                <div v-show="note">
                   <v-sheet width="300" class="mx-auto" height="500">
                        <v-form @submit.prevent="submit" >
                            <div v-for="field, k in note" :key="k">
                                <v-text-field v-show="k == 'title' || k == 'body' " v-model="note[k]" :name="k" :id="k" :placeholder="k" :label="k" ></v-text-field>
                                <!--<v-text-field type="text" v-show="k != '_id' && k !== '__v' && k !== 'user' && k !== 'created_at' && k !== 'updated_at' " v-model="note[k]" :name="k" :id="k" :placeholder="k" ></v-text-field>-->
                            </div>
                            <v-btn type="submit" class="mt-2">Submit</v-btn>
                        </v-form>
                    </v-sheet>
                </div>
          </div>



    </div>
  </div>
</template>

<script setup>
import { ref, toRefs, defineEmits } from "vue";
import { useStore } from "@/stores/pinia/store";

const props = defineProps(["action_type", "note", "data"]);
//const props_ = defineProps({method: {type: Function}});

const emits = defineEmits(["handleClick"]);
 //data from create, note for update
const { action_type, note, data } = toRefs(props);
const store = useStore();
//const note = ref();

const submit = async () => {

  if(action_type.value == 'create'){
    alert("submit")
emits("handleClick", data.value);
  }
  else if(action_type.value == 'edit'){
      alert("edit: ", action_type.value)
    emits("handleClick", note.value);
  }


};


</script>



