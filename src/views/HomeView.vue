<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />

    auth: {{ is_auth }}

    user: <span v-if="usr">{{ usr.id }}</span>

    usr: user: <span v-if="userDoc">{{ userDoc.email }}</span>
    <br />

    <b-button>{"aa"}</b-button>
    <br>

    <span>calendar</span>
    <button @click="toggleWeekends">toggle weekends</button>

    <br>

    <div v-show="modalShow" @click="(e) => {modalShow=false} ">modal...</div>

    <br />
    <FullCalendar
      default="dayGridPlugin"
      :options="options"
      @dateClick="handleDateClick"
    >
      <template v-slot:eventContent="arg">
         <b>{{ arg.timeText }}</b>
        <b>{{ arg.event.title }}</b>
      </template>
    </FullCalendar>
    <br />
  </div>
</template>

<script setup>
// @ is an alias to /src
import { computed, onBeforeMount, onMounted, ref, toRefs } from "vue";
import { useStore } from "../stores/pinia/store";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/vue3";
import timeGridPlugin from "@fullcalendar/timegrid";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css"; // needs additional webpack config!
import bootstrap5Plugin from "@fullcalendar/bootstrap5";
import { Calendar } from "@fullcalendar/core";

// must manually include stylesheets for each plugin
/*
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
*/

const isAuth = ref(false);
const y = ref(false);
const x = ref(false);

const props = defineProps(["isAuth"]);

const { isAuth: is_auth } = toRefs(props);

const store = useStore();
const { user, userDoc } = toRefs(store);
const usr = ref(user);
const user_doc = ref(userDoc);

const modalShow = ref(false)

const handleDateClick = (args) => {
  alert("date click! " + args.dateStr + args.date);
};

const myCustomButton = {
  text: "custom!",
  click: function () {
    alert("clicked the custom button!");
  },
};

const handleEventClick = (info) => {
  //alert("Event: " + info.event.title);
  //info.el.style.color = "green"
  //info.el.style.borderColor = "red";
  //info.el.style.backgroundColor = "#333";
 // info.el.style.padding = "15px";

 modalShow.value = true

  info.jsEvent.preventDefault(); // don't let the browser navigate

  if (info.event.url) {
    window.open(info.event.url);
  }
};
//const option = CalendarOptions()

const header = {
  left: "prev,next today",
  center: "title",
  right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
};

const calendarOptions = {
  plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin, bootstrap5Plugin],
  initialView: "dayGridMonth", // "timeGridWeek", "multiMonthYear"

  weekends: false, // initial value
  themeSystem: "bootstrap5",

  views: {
    timeGrid: {
      dayMaxEventRows: 6 // adjust to 6 only for timeGridWeek/timeGridDay
    }
  },

  dateClick: handleDateClick,
  events: [
    { title: "event 1", date: "2024-01-01", url: "https://google.com/" },
    { title: "event 2", //date: "2024-01-02",
     // allDay: true,
     start: new Date(Date.UTC(2024, 0, 1)),
     end: new Date(Date.UTC(2024, 0, 2)),


    },
    { title: "Event Now", start: new Date() },
    { title: "Event Now", start: new Date() },
    { title: "Event Now", start: new Date(), startEditable: true },
    { title: "Event Now", start: new Date(), },
    { title: "Event Now", start: new Date(), allDay: true, },
    { title: "Event Now", start: new Date(),


    },
  ],
  eventMouseEnter: (mouseEnterInfo ) => {
    console.log("mouse enter: ", mouseEnterInfo)
     console.log("mouse enter: ", mouseEnterInfo.event.title)
  },
  eventClassNames: function(arg) {
  if (arg.event.extendedProps.isUrgent) {
    return [ 'urgent' ]
  } else {
    return [ 'normal' ]
  }
},
   selectOverlap: function(event) {
    return event.rendering === 'background';
  },
  color: 'yellow',   // an option!
  textColor: 'black', // an option!
 // eventColor: '#378006',
   eventOverlap: function(stillEvent, movingEvent) {
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
  headerToolbar: {
    left: "prev,next today",
    center: "title",
    right: "dayGridMonth,timeGridWeek,timeGridDay",
  },
};

const options = ref(calendarOptions);

//user_doc.value = computed(async () => {});

onMounted(async () => {
  console.log("mounted home");

  //await store.fetchUserByID(user.id);
  //const doc = store.getUserByID()
  /*if(doc){
      user_doc.value  = doc
      console.log("fetch use doc in home:", doc)
    }*/
});

const toggleWeekends = () => {
  //calendarOptions.weekends = !this.calendarOptions.weekends
  options.value.weekends = !options.value.weekends;
};

y.value = computed(() => {
  if (store.isAuth) {
    return store.isAuth;
  }
});

/*usr.value = computed(() => {
  if(store.user){
    console.log("store.user: ", store.user)
    return store.user
  }
})*/
</script>


<style lang="scss" scoped>
</style>
