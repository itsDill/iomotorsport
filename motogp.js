async function loadData(type, isLocal = false) {
  const contentDiv = document.getElementById('content');
  contentDiv.innerHTML = "Loading...";
  let url;

  if (isLocal) {
    // Use local JSON file for testing
    url = 'motogp.json';
  } else {
    // Define the API endpoints based on the type of data requested
    switch (type) {
      case 'leagues':
        // Get MotoGP league details
        url = 'https://www.thesportsdb.com/api/v1/json/1/search_all_leagues.php?s=MotoGP';
        break;
      case 'fixtures':
        // Replace {league_id} with actual ID obtained from leagues API
        url = 'https://www.thesportsdb.com/api/v1/json/1/eventsnextleague.php?id={league_id}';
        break;
      case 'results':
        // Replace {league_id} with actual ID obtained from leagues API
        url = 'https://www.thesportsdb.com/api/v1/json/1/eventspastleague.php?id={league_id}';
        break;
      case 'drivers':
        // Use team/player lookup if needed (not directly supported for MotoGP standings)
        url = 'https://www.thesportsdb.com/api/v1/json/1/lookup_all_players.php?id={team_id}';
        break;
      default:
        contentDiv.innerHTML = "Invalid selection.";
        return;
    }
  }

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    renderData(type, data, contentDiv);
  } catch (error) {
    contentDiv.innerHTML = "Error loading data. Check the console for details.";
    console.error(error);
  }
}

function renderData(type, data, contentDiv) {
  contentDiv.innerHTML = ""; // Clear previous content

  switch (type) {
    case 'leagues':
      contentDiv.innerHTML = "<h2>Available MotoGP Leagues</h2>";
      data.leagues.forEach((league) => {
        const leagueInfo = document.createElement('p');
        leagueInfo.textContent = `${league.strLeague} (${league.strCountry})`;
        contentDiv.appendChild(leagueInfo);
      });
      break;
    case 'fixtures':
      contentDiv.innerHTML = "<h2>Upcoming Fixtures</h2>";
      data.events.forEach((event) => {
        const eventInfo = document.createElement('p');
        eventInfo.textContent = `${event.strEvent} on ${event.dateEvent}`;
        contentDiv.appendChild(eventInfo);
      });
      break;
    case 'results':
      contentDiv.innerHTML = "<h2>Past Results</h2>";
      data.events.forEach((event) => {
        const resultInfo = document.createElement('p');
        resultInfo.textContent = `${event.strEvent}: ${event.intHomeScore || 'N/A'} - ${event.intAwayScore || 'N/A'}`;
        contentDiv.appendChild(resultInfo);
      });
      break;
    case 'drivers':
      contentDiv.innerHTML = "<h2>Drivers</h2>";
      data.player.forEach((driver) => {
        const driverInfo = document.createElement('p');
        driverInfo.textContent = `${driver.strPlayer} - ${driver.strPosition || 'Position N/A'}`;
        contentDiv.appendChild(driverInfo);
      });
      break;
    default:
      contentDiv.innerHTML = "Invalid data type.";
  }
}
