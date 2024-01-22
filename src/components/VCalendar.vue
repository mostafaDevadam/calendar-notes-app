<template>
  <div>
    <!--<v-calendar></v-calendar>-->

    <!--<v-row>
    <v-col>
      <v-sheet>
        <v-calendar color="primary"></v-calendar>
      </v-sheet>
    </v-col>
  </v-row>-->
    <v-row class="fill-height">
      <v-col>
        <v-sheet height="600">
          <v-calendar
            ref="calendar"
            title-position="left"
            v-model="value"
            :now="today"
            color="primary"
            :weekdays="weekday"
            :type="type"
            :events="events"
            @click:next="clickNext"

            :hide-day-header="false"
            title="my title"
            @click:prev="clickPrev"
            :highlight="true"
             @click:date="viewDay"
              @click:time="viewDay"

              first-interval="10"
              interval-minutes="60"
              interval-count="18"
              :attributes="attrs"


            @change="updateRange"



          >
          <v-calendar-day >
             <template v-slot:day="arg">
          <b>{{ arg }} </b>

        </template>

          </v-calendar-day>
          </v-calendar>
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</template>


<script setup>
import { onMounted, ref, watchEffect,  } from "vue";
import { useDate } from "vuetify";
import moment from 'moment'


const calendar = ref()
const value = ref() //[new Date()];
const now = ref("2024-01-10")

const today = ref(moment().format('YYYY-MM-DD'))
const focus = ref(new Date().toISOString().substr(0, 10))
const dialog = false

const mode = null
const type = "month";
const types = ["month", "week", "day"];
const weekday = [0, 1, 2, 3, 4, 5, 6];
const weekdays = [
  { title: "Sun - Sat", value: [0, 1, 2, 3, 4, 5, 6] },
  { title: "Mon - Sun", value: [1, 2, 3, 4, 5, 6, 0] },
  { title: "Mon - Fri", value: [1, 2, 3, 4, 5] },
  { title: "Mon, Wed, Fri", value: [1, 3, 5] },
];
//const value = defineModel()

watchEffect(() => {
    //const date = useDate()
   console.log(moment.locale(), moment().format('YYYY-MM-DD'))
   // console.log(date.getMonth(new Date('March 1, 2021'))) // 3


  if(calendar.value){
console.log("calendar",calendar.value, calendar.value.start)
  }

})

const attrs = ref( [{
        key: 'today',
        highlight: {
          class: 'date-circle',
          contentClass: 'date-text',
        },
        dates: new Date(),
      }])


const updateRange = ({ start, end }) => {
    /*viewStart = calendar.value.getStartOfWeek(start);
    viewEnd = calendar.value.getEndOfWeek(end);

     console.log("update:", viewStart.date, viewEnd.date)*/

   // this.events = this.getEvents(viewStart.date, viewEnd.date);
   alert("")
}

const viewDay = (e) => {
  //value.value = calendar.value.date
  type.value = 'day'
  consoel.log("viewDay: ", e,  calendar.value)
}

const clickPrev = (e) => {
  console.log("prev: ", e);
};

const clickNext = (e) => {
  //calendar.value.next()

  //console.log("next: ", e);
};

const clickToday = (e) => {
  console.log("today: ", e);
};

const events = ref([
  /*{
    name: "Weekly Meeting",
    start: "2019-01-07 09:00",
    end: "2019-01-07 10:00",
  },
  {
    name: `Thomas' Birthday`,
    start: "2019-01-10",
  },
  {
    name: "Mash Potatoes",
    start: "2019-01-09 12:30",
    end: "2019-01-09 15:30",
  },*/
]);

const colors = [
  "blue",
  "indigo",
  "deep-purple",
  "cyan",
  "green",
  "orange",
  "grey darken-1",
];
const titles = [
  "Meeting",
  "Holiday",
  "PTO",
  "Travel",
  "Event",
  "Birthday",
  "Conference",
  "Party",
];

onMounted(() => {
  const adapter = useDate();
  getEvents({
    start: adapter.startOfDay(adapter.startOfMonth(new Date())),
    end: adapter.endOfDay(adapter.endOfMonth(new Date())),
  });
});

const showEvent = async ({ nativeEvent, event }) => {
  console.log("show ");
};

const getEvents = ({ start, end }) => {
  const events_ = [];

  const min = start;
  const max = end;
  const days = (max.getTime() - min.getTime()) / 86400000;
  const eventCount = rnd(days, days + 20);

  for (let i = 0; i < eventCount; i++) {
    const allDay = rnd(0, 3) === 0;
    const firstTimestamp = rnd(min.getTime(), max.getTime());
    const first = new Date(firstTimestamp - (firstTimestamp % 900000));
    const secondTimestamp = rnd(2, allDay ? 288 : 8) * 900000;
    const second = new Date(first.getTime() + secondTimestamp);

    events_.push({
      title: titles[rnd(0, titles.length - 1)],
      start: first,
      end: second,
      color: colors[rnd(0, colors.length - 1)],
      allDay: !allDay,
      // open: true
    });
  }

  events.value = events_;
};
const getEventColor = (event) => {
  return event.color;
};

const rnd = (a, b) => {
  return Math.floor((b - a + 1) * Math.random()) + a;
};
</script>
