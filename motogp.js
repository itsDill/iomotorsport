async function loadData(type, isLocal = false) {
  const contentDiv = document.getElementById('content');
  contentDiv.innerHTML = "Loading...";
  let url;

  if (isLocal) {
    url = 'motogp.json'; // Path to your local JSON file
  } else {
    // API handling (if you decide to use an API in the future)
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
    // If reading local JSON
    if (isLocal) {
      const response = await fetch(url);
      const data = await response.json();

      // Handle local data differently
      let results;
      switch (type) {
        case 'results':
          results = data.results;
          break;
        case 'drivers':
          results = data.drivers;
          break;
        case 'constructors':
          results = data.constructers;
          break;
        default:
          results = [];
      }
      renderResults(type, results, contentDiv);
    } else {
      const response = await fetch(url, {
        headers: {
          "X-RapidAPI-Key": "YOUR_API_KEY", // Replace with your API key
          "X-RapidAPI-Host": "api-motorsport.p.rapidapi.com"
        }
      });
      const data = await response.json();
      renderData(type, data, contentDiv);
    }
  } catch (error) {
    contentDiv.innerHTML = "Error loading data.";
    console.error(error);
  }
}
