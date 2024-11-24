async function loadData(type) {
  const contentDiv = document.getElementById('content');
  contentDiv.innerHTML = "Loading...";
  let url;

  switch (type) {
    case 'results':
      url = 'https://api-motorsport.p.rapidapi.com/races?series=wrc&season=2024'; // Replace with WRC-specific endpoint
      break;
    case 'drivers':
      url = 'https://api-motorsport.p.rapidapi.com/standings?series=wrc&type=drivers&season=2024'; // Driver standings
      break;
    case 'teams':
      url = 'https://api-motorsport.p.rapidapi.com/standings?series=wrc&type=teams&season=2024'; // Constructor standings
      break;
    case 'calendar':
      url = 'https://api-motorsport.p.rapidapi.com/calendar?series=wrc&season=2024'; // Fixtures
      break;
    default:
      contentDiv.innerHTML = "Invalid selection.";
      return;
  }

  try {
    const response = await fetch(url, {
      headers: {
        "X-RapidAPI-Key": "YOUR_API_KEY", // Replace with your API key
        "X-RapidAPI-Host": "api-motorsport.p.rapidapi.com"
      }
    });
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
      const rally = data.response[0]; // Adjust based on the API response
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
      const drivers = data.response; // Adjust based on the API response
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
      const teams = data.response; // Adjust based on the API response
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
      const rallies = data.response; // Adjust based on the API response
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
