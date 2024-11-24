async function loadData(type) {
  const contentDiv = document.getElementById('content');
  contentDiv.innerHTML = "Loading...";
  let url;

  switch (type) {
    case 'results':
      url = 'https://ergast.com/api/f1/current/last/results.json';
      break;
    case 'drivers':
      url = 'https://ergast.com/api/f1/current/driverStandings.json';
      break;
    case 'constructors':
      url = 'https://ergast.com/api/f1/current/constructorStandings.json';
      break;
    case 'fixtures':
      url = 'https://ergast.com/api/f1/current.json';
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
      const results = data.MRData.RaceTable.Races[0];
      container.innerHTML = `
        <h2>${results.raceName} - ${results.date}</h2>
        <table>
          <tr><th>Position</th><th>Driver</th><th>Constructor</th></tr>
          ${results.Results.map(r => `
            <tr>
              <td>${r.position}</td>
              <td>${r.Driver.givenName} ${r.Driver.familyName}</td>
              <td>${r.Constructor.name}</td>
            </tr>`).join('')}
        </table>`;
      break;

    case 'drivers':
      const driverStandings = data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
      container.innerHTML = `
        <h2>Driver Standings</h2>
        <table>
          <tr><th>Position</th><th>Driver</th><th>Points</th></tr>
          ${driverStandings.map(d => `
            <tr>
              <td>${d.position}</td>
              <td>${d.Driver.givenName} ${d.Driver.familyName}</td>
              <td>${d.points}</td>
            </tr>`).join('')}
        </table>`;
      break;

    case 'constructors':
      const constructorStandings = data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
      container.innerHTML = `
        <h2>Constructor Standings</h2>
        <table>
          <tr><th>Position</th><th>Constructor</th><th>Points</th></tr>
          ${constructorStandings.map(c => `
            <tr>
              <td>${c.position}</td>
              <td>${c.Constructor.name}</td>
              <td>${c.points}</td>
            </tr>`).join('')}
        </table>`;
      break;

    case 'fixtures':
      const races = data.MRData.RaceTable.Races;
      container.innerHTML = `
        <h2>Fixtures</h2>
        <table>
          <tr><th>Round</th><th>Race</th><th>Date</th></tr>
          ${races.map(r => `
            <tr>
              <td>${r.round}</td>
              <td>${r.raceName}</td>
              <td>${r.date}</td>
            </tr>`).join('')}
        </table>`;
      break;

    default:
      container.innerHTML = "Data format not supported.";
  }
}
