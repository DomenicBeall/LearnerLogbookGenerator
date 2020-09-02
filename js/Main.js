let currentOdometer, currentDate, currentHours, currentMinutes;

function onSubmitClick()
{
  // Hides the form
  document.getElementById('detailsForm').style.display = "none";
  document.getElementById('resultsTable').style.display = "block";

  currentOdometer = parseInt(document.getElementById('inputOdometer').value);
  currentDate = new Date(document.getElementById('dateInput').value);
  currentHours = parseInt(document.getElementById('hourInput').value);
  currentMinutes = parseInt(document.getElementById('minuteInput').value);

  generateEntries();
}

function generateEntries()
{
  var entries = [];

  for (var i = 0; i < 12; i++) {
    // Generate trip length
    while (true) {
      var tripHours = Math.floor(Math.random() * 2);
      var tripMinutes = Math.floor(Math.random() * 60);

      if (tripHours > 0)
      {
        break;
      } else {
        if (tripMinutes > 10)
          break;
      }
    }

    // Generate start and end time
    var startHour = Math.floor(Math.random() * 12) + 1;
    var startMinute = Math.floor(Math.random() * 60);
    var endHour = startHour + tripHours;
    var endMinute = startMinute + tripMinutes;

    if (endMinute >= 60)
    {
      endMinute -= 60;
      endHour ++;
    }

    if (endHour > 12)
      endHour -= 12;

    // Generate end odometer value
    var odoIncrement = Math.floor((tripHours * 60) + tripMinutes + (Math.random() * 11) - 5);
    var endOdometer = currentOdometer + odoIncrement;

    currentHours += tripHours;
    currentMinutes += tripMinutes;

    if (currentMinutes >= 60)
    {
      currentMinutes -= 60;
      currentHours ++;
    }

    entries.push({date:currentDate.getDate() + "/" + (currentDate.getMonth() + 1) + "/" + currentDate.getFullYear(),
                  startTime:startHour + ":" + formatMinutes(startMinute),
                  endTime:endHour + ":" + formatMinutes(endMinute),
                  tripLength:tripHours + "h " + tripMinutes + "m",
                  totalHours:currentHours + "h " + currentMinutes + "m",
                  odoStart:currentOdometer,
                  odoEnd:endOdometer});

    // Add to the current odometer, date
    currentOdometer = endOdometer;
    if (Math.floor(Math.random() * 4) == 1)
      currentOdometer += Math.floor(Math.random() * 20) + 10;
    currentDate = currentDate.addDays(Math.floor(Math.random() * 5) + 1);
  }

  displayTable(entries);
}

function displayTable(entries)
{
  var table = document.getElementById("displayTable");

  for (var i = entries.length - 1; i >= 0; i--) {
    var row = table.insertRow(1);

    row.insertCell(0).innerHTML = entries[i].date;
    row.insertCell(1).innerHTML = entries[i].startTime;
    row.insertCell(2).innerHTML = entries[i].endTime;
    row.insertCell(3).innerHTML = entries[i].tripLength;
    row.insertCell(4).innerHTML = entries[i].totalHours;
    row.insertCell(5).innerHTML = entries[i].odoStart;
    row.insertCell(6).innerHTML = entries[i].odoEnd;

  }
}

function formatMinutes(minutes)
{
  var min = minutes;
  if (min < 10)
    min = "0" + min;
  return min;
}

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

// Hides the table initially
document.getElementById('resultsTable').style.display = "none";
