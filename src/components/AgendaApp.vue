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
      <div class="row">
        <MonthView
          class="col-4 montview"
          :year="currentYear"
          :month="currentMonth"
          :importantDateCount="importantDateCount"
          @clicked="onDayClick"
        />
        <Appointments
          class="col-8 appointments"
          :day="currentAppointmentDate"
          @importantLabelChange="onImportantLabelChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import MonthView from "./MonthView";
import Appointments from "./Appointments";
import moment from "moment";

export default {
  name: "agenda-app",
  data() {
    return {
      currentYear: moment().year(),
      currentMonth: moment().month() + 1,
      currentAppointmentDate: moment(),
      importantDateCount: { dayId: moment().dayId(), day: moment(), count: 0 }
    };
  },
  components: {
    MonthView,
    Appointments
  },
  methods: {
    onDayClick(day) {
      this.currentAppointmentDate = day;
    },
    onImportantLabelChange({ dayId, day, count }) {
      //alert("dayId: " + dayId + " count: " + count + " typeof(count): " + typeof(count));
      this.importantDateCount = { dayId: dayId, day: day, count: count };
    }
  }
};
</script>


<style>
.monthview {
  margin: 15px;
}
.appointments {
  margin: 15px;
}
</style>
