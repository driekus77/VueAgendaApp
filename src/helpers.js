import moment from "moment-with-locales-es6";
import _ from "lodash";

export function getCalendarMonthAsMatrix(year, month, day) {
  var arr = getMomentsPerMonth(year, month, day);

  var result = _.groupBy(arr, function(m) {
    return m.isoWeek();
  });

  return result;
}

export function getMomentsPerMonth(year, month, day) {
  moment.locale("nl");

  var n = getIsoWeekDaysInMonth(year, month, day);

  return Array.from(
    {
      length: n
    },
    (x, i) =>
      moment(year + "-" + month + "-01", "YYYY-MM-DD")
        .startOf("isoWeek")
        .add(i, "days")
  );
}

export function getFullMonthName(year, month, day) {
  moment.locale("nl");

  return moment(year + "-" + month + "-" + day, "YYYY-MM-DD").format("MMMM");
}

export function getIsoWeekDaysInMonth(year, month, day) {
  moment.locale("nl");

  var momentObj = moment(year + "-" + month + "-" + day, "YYYY-MM-DD");

  var mFirstIsoWeekDayOfMonth = momentObj
    .clone()
    .startOf("month")
    .startOf("isoWeek");
  var mLastIsoWeekDayOfMonth = momentObj
    .clone()
    .endOf("month")
    .endOf("isoWeek");

  var d = moment.duration(mLastIsoWeekDayOfMonth.diff(mFirstIsoWeekDayOfMonth));

  return d.asDays() + 1;
}
