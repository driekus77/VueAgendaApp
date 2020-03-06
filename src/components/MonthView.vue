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
          <th>Thur.</th>
          <th>Fri.</th>
          <th>Sat.</th>
          <th>Sun.</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="week in weeksInMonth" :key="week[0].format()" class="week">
          <td class="weeknum">{{week[0].format("w")}}</td>
          <td v-for="weekday in week" :key="weekday.format()" class="weekday">
            <span v-if="checkValidMonthDay(weekday)" class="day">{{weekday.format("D")}}</span>
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
}

.weeknum {
  text-align: right;
}

.weekday {
  text-align: right;
}
.day {
  background-color: var(--bloemertlight-color);
  padding: 5px;
}
</style>
