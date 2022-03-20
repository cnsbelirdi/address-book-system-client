import groupBy from "lodash/groupBy";

function createTableElements(tableElements) {
  let allTableElements = [];
  const tableHours = [
    "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"
  ];
  // 0,1,2,3,4

  tableHours.forEach(tableHour => {
    for (let i = 0; i <= 5; i++) {

      if (tableElements.some(t => {
        t.hour = t.hour.slice(0, 5);
        let isEqual = (t.hour == tableHour && t.dayOfWeek == i);

        if (isEqual) {
          allTableElements.push(t); return true;
        }

        return false;
      })) continue;

      allTableElements.push({
        dayOfWeek: i,
        hour: tableHour,
        className: '',
        label: ''
      });
    }
  });

  return groupBy(allTableElements, (x) => x.hour);
}

export function containsValue(elements, value, valueName) {
  let contains = false;
  elements.forEach((e) => {
    if (e[valueName] == value) {
      contains = true;
    }
  });
}

export default createTableElements;
