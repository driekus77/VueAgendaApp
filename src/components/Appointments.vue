<template>
  <div id="appointments">
    <h2>Appointments on: {{day.format("dddd DD MMMM YYYY")}}</h2>

    <table
      class="appointments"
      v-if="appointments.size && appointments.has(day) && appointments.get(day).hours.length"
    >
      <thead>
        <tr>
          <th>Start</th>
          <th>Appointment</th>
          <th>Label</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="appointment in appointments.get(day).hours" :key="appointment.key">
          <td>
            <span style="text-align: right;">{{appointment.start.format('H:mm')}}</span>
          </td>
          <td>
            <textarea class="app-text" v-model="appointment.text" cols="65" rows="2"/>
          </td>
          <td>
            <select
              id="label"
              type="text"
              v-model="appointment.label"
              @change="onLabelChange({day, appointment}, $event)"
            >
              <option value="normal">Normal</option>
              <option value="important">Important</option>
            </select>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import moment from "moment";
import _ from "lodash";

export default {
  name: "appointments",
  props: ["day"],
  data() {
    return {
      appointments: new Map()
    };
  },
  mounted() {
    this.appointments.set(this.day, {
      day: this.day,
      hours: this.initAppointments(7, 18)
    });
  },
  watch: {
    day: function(newVal, oldVal) {
      if (!this.appointments.has(newVal)) {
        this.appointments.set(newVal, {
          day: newVal,
          hours: this.initAppointments(7, 18)
        });
      }
    }
  },
  methods: {
    initAppointments(startHour, endHour) {
      return Array.from({ length: endHour - startHour }, (_, i) => i).reduce(
        (r, hour) => {
          r.push({
            key: startHour + hour,
            start: moment({ hour: startHour + hour, minute: 0 }),
            text: "",
            label: "normal"
          });

          return r;
        },
        []
      );
    },
    onLabelChange({ day, appointment }, event) {
      var count = this.appointments
        .get(this.day)
        .hours.filter(h => h.label === "important").length;

      //alert("Day: " + day.dayId() + "Count: " + count + " typeof(count): " + typeof(count));

      this.$emit("importantLabelChange", {
        dayId: day.dayId(),
        day,
        count: count
      });
    }
  }
};
</script>


<style>
.app-text {
  background-color: var(--bloemertlight-color);
  height: 25px;
  border: none;
  border-style: none;
  width: 100%;
  font-weight: bolder;
  font-size: 10pt;
}
</style>
