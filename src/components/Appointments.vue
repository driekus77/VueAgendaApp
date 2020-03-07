<template>
  <div id="appointments">
    <h2>Appointments on: {{day.format("dddd DD MMMM YYYY")}}</h2>
  </div>
</template>

<script>
export default {
  name: "appointments",
  props: ["day"]
};
</script>


<style>
</style>
