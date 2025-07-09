function pad(num) {
    return num.toString().padStart(2, '0');
  }

/**
 * @param {string} dateSelected Date selected on the calendar
 * @param {object} calendar Content in the FormAppoinment object
 */
export function getSchedules(dateSelected, calendar){
    const selection = new Date(dateSelected);
    let deltaTime = calendar.deltaTime;
    let currentMinutes = calendar.initialTime * 60;
    const endMinutes = calendar.finalTime * 60 + deltaTime;
    options = [];
    while (currentMinutes <= endMinutes) {
        const hours = Math.floor(currentMinutes / 60);
        const minutes = currentMinutes % 60;
        const timeStr = `${pad(hours)}:${pad(minutes)}`;
        options.push(timeStr);
        currentMinutes += deltaTime;
        }
    return options;
    }

