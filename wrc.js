async function loadData(type) {
  const contentDiv = document.getElementById('content');
  contentDiv.innerHTML = "Loading...";
  let url;

  // Replace these with the correct paths to your JSON files
  switch (type) {
    case 'results':
      url = 'wrc/wrcresults.json;' // Path to the local results JSON
      break;
    case 'drivers':
      url = 'path/to/drivers.json'; // Path to the local drivers JSON
      break;
    case 'teams':
      url = 'path/to/teams.json'; // Path to the local teams JSON
      break;
    case 'calendar':
      url = 'path/to/calendar.json'; // Path to the local calendar JSON
      break;
    default:
      contentDiv.innerHTML = "Invalid selection.";
      return;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    renderData(type, data, contentDiv);
  } catch (error) {
    contentDiv.innerHTML = "Error loading data.";
    console.error(error);
  }
}

function renderData(type, data, container) {
  container.innerHTML = ''; // Clear content
  switch (type) {
    case 'results':
      const rally = data.response[0]; // Adjust based on the JSON structure
      container.innerHTML = `
        <h2>${rally.name} - ${rally.date}</h2>
        <table>
          <tr><th>Position</th><th>Driver</th><th>Car</th></tr>
          ${rally.results.map(r => `
            <tr>
              <td>${r.position}</td>
              <td>${r.driver.name}</td>
              <td>${r.car.model}</td>
            </tr>`).join('')}
        </table>`;
      break;

    case 'drivers':
      const drivers = data.response; // Adjust based on the JSON structure
      container.innerHTML = `
        <h2>Driver Standings</h2>
        <table>
          <tr><th>Position</th><th>Driver</th><th>Points</th></tr>
          ${drivers.map(d => `
            <tr>
              <td>${d.position}</td>
              <td>${d.driver.name}</td>
              <td>${d.points}</td>
            </tr>`).join('')}
        </table>`;
      break;

    case 'teams':
      const teams = data.response; // Adjust based on the JSON structure
      container.innerHTML = `
        <h2>Team Standings</h2>
        <table>
          <tr><th>Position</th><th>Team</th><th>Points</th></tr>
          ${teams.map(t => `
            <tr>
              <td>${t.position}</td>
              <td>${t.team.name}</td>
              <td>${t.points}</td>
            </tr>`).join('')}
        </table>`;
      break;

    case 'calendar':
      const rallies = data.response; // Adjust based on the JSON structure
      container.innerHTML = `
        <h2>Fixtures</h2>
        <table>
          <tr><th>Round</th><th>Event</th><th>Date</th></tr>
          ${rallies.map(f => `
            <tr>
              <td>${f.round}</td>
              <td>${f.name}</td>
              <td>${f.date}</td>
            </tr>`).join('')}
        </table>`;
      break;

    default:
      container.innerHTML = "Data format not supported.";
  }
}
