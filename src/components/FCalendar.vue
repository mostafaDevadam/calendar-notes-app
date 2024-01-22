<template>
  <div>
    <h5></h5>

    <button hidden @click="toggleWeekends">toggle weekends</button>

    <div>
      <!--<button @click="insert">comp.</button>-->

      <!--<div v-show="showAddDialog">
        <AddDialog :showAddDialog="showAddDialog" @closeModal="closeModal" />
      </div>-->

      <div v-show="modalShow">
        <DefaultModal
          :modalShow="modalShow"
          @closeModal="closeModal"
          :selectedEvent="selectedEvent"
          @dateClick="handleDateClick"
        />
      </div>
    </div>

    <div>
      <div class="text-center" id="rect" ref="container">
        <!--<DefaultMMenu :showAddDialog="showAddDialog" :fav="fav" :close="false" />-->
        <v-menu
          v-model="showAddDialog"
          activator="parent"
          :close-on-content-click="false"
          location="top"
        >
          <v-card min-width="400">
            <v-list>
              <v-list-item
                prepend-avatar="https://cdn.vuetifyjs.com/images/john.jpg"
                title="John Leider"
                subtitle="Founder of Vuetify"
              >
                <template v-slot:append>
                  <v-btn
                    variant="text"
                    :class="fav ? 'text-red' : ''"
                    icon="mdi-heart"
                    @click="fav = !fav"
                  ></v-btn>
                </template>
              </v-list-item>
              <!-- form in menu -->
              <v-sheet max-width="300" class="mx-auto">
                <v-form @submit.prevent="handleSubmit">
                  <v-text-field
                    v-model="firstName"
                    label="First name"
                    :rules="rules"
                  ></v-text-field>

                  <v-text-field
                    v-model="lastName"
                    label="Last name"
                    :rules="rules"
                  ></v-text-field>

                  <v-btn type="submit" class="mt-2">Submit</v-btn>
                </v-form>
              </v-sheet>

              <v-list-item title="add" subtitle="my note"> </v-list-item>
            </v-list>
          </v-card>
        </v-menu>
      </div>
    </div>



    <div ref="cont_rect"></div>

    <div>
      <FullCalendar default="DayGridPlugin" :options="options">
        <template v-slot:eventContent="arg">
          <b>{{ arg.timeText }} </b> <span>{{ ' - ' }}</span>
          <b>{{ arg.event.title }}</b>
        </template>
      </FullCalendar>
    </div>
  </div>
</template>

<script setup>
import {
  computed,
  getCurrentInstance,
  onUnmounted,
  reactive,
  ref,
  toRef,
  toRefs,
  watchEffect,
} from "vue";

import FullCalendar from "@fullcalendar/vue3";
import InteractionPlugin from "@fullcalendar/interaction";
import DayGridPlugin from "@fullcalendar/daygrid";
import TimeGridPlugin from "@fullcalendar/timegrid";
import ListPlugin from "@fullcalendar/list";
import Bootstrap5Plugin from "@fullcalendar/bootstrap5";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css"; // needs additional webpack config!
import DefaultModal from "@/components/DefaultModal.vue";
import AddDialog from "@/components/AddDialog.vue";
import HelloWorld from "@/components/HelloWorld.vue";
import { renderComponent2 } from "@/help/renderComponent";
import DefaultMMenu from "@/components/DefaultMMenu.vue";
import DefaultForm from "@/components/DefaultForm.vue";

const rules = ref([]);
const firstName = ref("");
const lastName = ref("");

const props = defineProps(["notes"]);
const { notes } = toRefs(props);

const modalShow = ref(false);
const showAddDialog = ref(false);

const selectedEvent = ref();

const showComp = ref(false);

const fav = ref(true);
const menu = ref(false);
const message = ref(false);
const hints = ref(true);

const cont_rect = ref();

const docs = ref()

const default_events = [
  { title: "event 1", date: "2024-01-01", url: "https://google.com/" },
    {
      title: "event 2", //date: "2024-01-02",
      // allDay: true,
      start: new Date(Date.UTC(2024, 0, 1)),
      end: new Date(Date.UTC(2024, 0, 2)),
    },
    {
      title: "Event Now",
      start: new Date() /*id: "1", end: date, allDay: false */,
    },
    { title: "Event Now", start: new Date() },
    { title: "Event Now", start: new Date(), startEditable: true },
    { title: "Event Now", start: new Date() },
    { title: "Event Now", start: new Date(), allDay: true },
    { title: "Event Now", start: new Date() }
]

docs.value = computed( () => {
  let list = []
   if(props.notes){
     for(let item of props.notes){
      if(item.created_at){
        console.log("created_at:", item)
        item["date"] = item.created_at
        list.push(item)
      }
     }
     return list
   }else{
       return default_events
   }

})

const d = {
  today: "اليوم",
  month: "الشهر",
  week: "الاسبوع",
  day: "اليوم",
};

const handleSubmit = (e) => {
  console.log("submit");
};

rules.value.push(
  computed(() => {
    if (firstName.value) {
      return [true];
    }
    if (lastName.value) {
      return [true];
    }
    return ["You must enter a last or first name"];
  })
);

const closeModal = (val) => {
  if (modalShow.value) {
    console.log("close modal,", val);
    modalShow.value = val;
  }

  if (showAddDialog.value) {
    showAddDialog.value = val;
  }
};

const toggleWeekends = () => {
  //calendarOptions.weekends = !this.calendarOptions.weekends
  options.value.weekends = !options.value.weekends;
};

watchEffect(() => {
  if (cont_rect.value) {
    cont_rect.value.focus();
    console.log("watch: ", cont_rect.value, cont_rect.target);
    // cont_rect.style.left = "100"
  }
});

const rect = reactive({ position: "absolute", left: "5px", top: "5px" });

const handleDateClick = async (args) => {
  //alert("date click! " + args.dateStr + args.date);
  console.log("date click! " + args.jsEvent, args.el, args.view, args.dayEl);
  //args.dayEl.style.backgroundColor = "red";

  args.dayEl.style.zIndex = 1;

  //let rect = args.dayEl.getBoundingClientRect();
  //console.log("rect 1:", rect, rect.top + 100); //rect.top, rect.right, rect.bottom, rect.left);

  const el = document.getElementById("rect");
  el.style.backgroundColor = "green";
  el.style.position = "absolute";
  el.style.zIndex = 2;
  el.style.marginTop = "-100px";

  //insert();

  args.dayEl.appendChild(el);
};
const handleEventClick = (info) => {
  //alert("Event: " + info.event.title);
  //info.el.style.color = "green"
  //info.el.style.borderColor = "red";
  //info.el.style.backgroundColor = "#333";
  // info.el.style.padding = "15px";

  modalShow.value = true;

  selectedEvent.value = info;

  info.jsEvent.preventDefault(); // don't let the browser navigate
  // open the url in a new tab in Browser
  /*if (info.event.url) {
    window.open(info.event.url);
  }*/
};

const id = ref(10);

const BUTTON_CSS =
  "v-btn v-btn--elevated v-theme--light v-btn--density-default v-btn--size-default v-btn--variant-elevated";

let cl = ref(0);

const choose = async (args) => {
  id.value++;
  // alert("select " + args.start)
  console.log("select:", args);
  const style = args.jsEvent.target.style;
  //style.backgroundColor = "#333"
  style.border = "2px solid #333";
  //style.color = "white"
  style.padding = "5px";

  const cal = args.view.calendar;
  console.log("calendar:", cal, args.view.viewDidMount);

  //addNoteInCalendar("event life 2",args.startStr)
  showAddDialog.value = true;
  /*
const div = document.createElement("div")
div.id="my-div"
div.setAttribute("ref", 'container')

console.log("div:", div)
*/
  const target = args.jsEvent.target;

  //target.appendChild(div)

  console.log("target el", args.jsEvent.target);

  //insert();
  //showComp.value = true
};

const headerToolbar = {
  right: "prev today next",
  left: "title",
  center: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
};

const calendarOptions = {
  plugins: [
    DayGridPlugin,
    InteractionPlugin,
    ListPlugin,
    TimeGridPlugin,
    Bootstrap5Plugin,
  ],
  initialView: "dayGridMonth", // "timeGridWeek", "multiMonthYear"

  weekends: true, // initial value
  themeSystem: "bootstrap5",

  views: {
    timeGrid: {
      dayMaxEventRows: 6, // adjust to 6 only for timeGridWeek/timeGridDay
    },
  },
  dateClick: handleDateClick,
  events: docs.value,
  eventMouseEnter: (mouseEnterInfo) => {
    console.log("mouse enter: ", mouseEnterInfo);
    console.log("mouse enter: ", mouseEnterInfo.event.title);
  },
  eventClassNames: function (arg) {
    if (arg.event.extendedProps.isUrgent) {
      return ["urgent"];
    } else {
      return ["normal"];
    }
  },
  selectOverlap: function (event) {
    return event.rendering === "background";
  },
  // eventColor: '#378006',
  eventOverlap: function (stillEvent, movingEvent) {
    return stillEvent.allDay && movingEvent.allDay;
  },
  eventClick: handleEventClick,
  customButtons: {
    myCustomButton: {
      text: "Click!",
      click: function () {
        alert("clicked the custom button!");
      },
    },
    /* prev_: {
      // this overrides the prev button
      text: "PREV",
      click: () => {
        console.log("eventPrev");
        let calendarApi = this.$refs.fullCalendar.getApi();
        calendarApi.prev();
      },
    },*/
  },
  //prev: 'chevron-left',
  headerToolbar: headerToolbar,
  selectable: true,
  editable: true,
  select: choose,
  buttonText: {},
  navLinks: true,
  selectOverlap: (event) => {
    return event.rendering === 'background';
  }
};

const options = ref(calendarOptions);

const count = ref(10);

const addNoteInCalendar = (
  title = "event",
  date = "2024-01-01",
  start = "2024-01-01",
  end = "2024-01-01"
) => {
  count.value++;
  options.value.events.push({
    id: count.value,
    title: title + "-" + count.value,
    date: date,
    start: date,
    end: end,
  });
};

// dynamic
let counter = 1;
let destroyComp = null;

onUnmounted(() => destroyComp?.());

const container = ref();

const { appContext } = getCurrentInstance();

const insert = async () => {
  destroyComp?.();
  destroyComp = renderComponent2({
    el: container.value,
    component: DefaultMMenu, //(await import("@/components/DefaultMMenu.vue")).default,
    props: {
      key: counter,
      msg: "Message " + counter++,
    },
    appContext,
  });
};
//
</script>

<style lang="scss" scoped>
//@import 'vue-material';
@import "~vue-material/dist/vue-material.min.css";
@import "~vue-material/dist/theme/default.css";

/*@import '~bootstrap';
@import '~bootstrap-vue';
@import '~bootstrap/scss/bootstrap.scss';
@import '~bootstrap-vue/src/index.scss';
*/
</style>
