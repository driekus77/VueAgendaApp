<template>
  <div id="agenda">
    <h1>My Agenda App!</h1>
    <div class="main-content">
      <label for="YearSelectionid">Select Year:</label>
      <input type="number" placeholder="Type year..." v-model.number="currentYear">
      {{currentYear}} - {{typeof(currentYear)}}
      <br>
      <label for="step">Select Month:</label>
      <select id="step" type="number" v-model.number="currentMonth">
        <option value="1">January</option>
        <option value="2">Februari</option>
        <option value="3">March</option>
        <option value="4">April</option>
        <option value="5">May</option>
        <option value="6">June</option>
        <option value="7">July</option>
        <option value="8">August</option>
        <option value="9">September</option>
        <option value="10">October</option>
        <option value="11">November</option>
        <option value="12">December</option>
      </select>
      {{currentMonth}} - {{typeof(currentMonth)}}
      <MonthView :year="currentYear" :month="currentMonth"/>
    </div>
  </div>
</template>

<script>
import MonthView from "./MonthView";
import moment from "moment-with-locales-es6";

export default {
  name: "agenda-app",
  data() {
    return {
      currentYear: moment().year(),
      currentMonth: moment().month() + 1
    };
  },
  components: {
    MonthView
  }
};
</script>


<style>
</style>
