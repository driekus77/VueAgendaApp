<template>
  <div id="month-view">
    <h2>{{ monthName }}</h2>
    <table class="month">
      <thead>
        <tr>
          <th>week</th>
          <th>Mon.</th>
          <th>Tue.</th>
          <th>Wed.</th>
          <th>Thu.</th>
          <th>Fri.</th>
          <th>Sat.</th>
          <th>Sun.</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="week in weeksInMonth" :key="week[0].format()" class="week">
          <td class="weeknum">{{week[0].format("w")}}</td>
          <td v-for="weekday in week" :key="weekday.format()" class="weekday">
            <button
              v-if="checkValidMonthDay(weekday)"
              @click="onDayClick(weekday, $event)"
              class="day"
            >{{weekday.format("D")}}</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { getFullMonthName, getCalendarMonthAsMatrix } from "../helpers";

export default {
  name: "month-view",
  props: ["year", "month"],

  methods: {
    checkValidMonthDay(m) {
      return m.month() + 1 === Number(this.month);
    },
    onDayClick(day, event) {
      this.$emit("clicked", day);
    }
  },
  computed: {
    monthName() {
      return getFullMonthName(this.year, this.month);
    },
    weeksInMonth() {
      return getCalendarMonthAsMatrix(this.year, this.month);
    }
  }
};
</script>


<style>
.month {
  border-width: 1px;
  border-style: solid;
  table-layout: fixed;
  border-radius: 15px;
  box-shadow: 5px 5px 5px var(--bloemertshadow-color);
}

.month > thead > tr > th:not(first),
.month > thead > tr > td:not(first) {
  text-align: center;
  width: 35px;
}

.weeknum {
  text-align: right;
}

.weekday {
  width: 35px;
}
button.day {
  background-color: var(--bloemertlight-color);
  padding: 5px;
  width: 100%;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
}

button.day:hover {
  cursor: pointer;
}

button.day:active {
  cursor: grabbing;
}
</style>
