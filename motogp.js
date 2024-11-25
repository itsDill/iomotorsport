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
      case 'results':
        url = 'https://api-motorsport.p.rapidapi.com/races?series=motogp&season=2024';
        break;
      case 'drivers':
        url = 'https://api-motorsport.p.rapidapi.com/standings?series=motogp&type=riders&season=2024';
        break;
      case 'constructors':
        url = 'https://api-motorsport.p.rapidapi.com/standings?series=motogp&type=teams&season=2024';
        break;
      case 'fixtures':
        url = 'https://api-motorsport.p.rapidapi.com/calendar?series=motogp&season=2024';
        break;
      default:
        contentDiv.innerHTML = "Invalid selection.";
        return;
    }
  }

  try {
    // Fetch the data from the API or local file
    const response = await fetch(url, {
      headers: isLocal
        ? {}
        : {
            "X-RapidAPI-Key": "03664d8b42msh77373c6a1450ca0p1e857ejsn71a29df15875", // Replace with your RapidAPI Key
            "X-RapidAPI-Host": "motorsportapi.p.rapidapi.com"
          }
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (isLocal) {
      renderResults(type, data, contentDiv);
    } else {
      renderData(type, data, contentDiv);
    }
  } catch (error) {
    contentDiv.innerHTML = "Error loading data. Check the console for details.";
    console.error(error);
  }
}
