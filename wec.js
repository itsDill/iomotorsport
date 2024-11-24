async function loadData(type) {
  const contentDiv = document.getElementById('content');
  contentDiv.innerHTML = "Loading...";
  let url;

  switch (type) {
    case 'results':
      url = 'https://api-motorsport.p.rapidapi.com/races?series=wec&season=2024'; // Replace with actual endpoint
      break;
    case 'drivers':
      url = 'https://api-motorsport.p.rapidapi.com/standings?series=wec&type=drivers&season=2024'; // Replace with actual endpoint
      break;
    case 'constructors':
      url = 'https://api-motorsport.p.rapidapi.com/standings?series=wec&type=teams&season=2024'; // Replace with actual endpoint
      break;
    case 'fixtures':
      url = 'https://api-motorsport.p.rapidapi.com/calendar?series=wec&season=2024'; // Replace with actual endpoint
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
      const race = data.response[0]; // Adjust based on the API response
      container.innerHTML = `
        <h2>${race.name} - ${race.date}</h2>
        <table>
          <tr><th>Position</th><th>Driver</th><th>Team</th></tr>
          ${race.results.map(r => `
            <tr>
              <td>${r.position}</td>
              <td>${r.driver.name}</td>
              <td>${r.team.name}</td>
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

    case 'constructors':
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

    case 'fixtures':
      const calendar = data.response; // Adjust based on the API response
      container.innerHTML = `
        <h2>Fixtures</h2>
        <table>
          <tr><th>Round</th><th>Race</th><th>Date</th></tr>
          ${calendar.map(f => `
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
