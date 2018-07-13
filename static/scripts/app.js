const addEvent = (el, type, handler) => {
  if (el.attachEvent) el.attachEvent("on" + type, handler);
  else el.addEventListener(type, handler);
};

const search = () => {
  const searchQuery = document.getElementById("search");
  const query = `+${encodeURI(searchQuery.value)}`;
  console.log(query);
  const searchURL = `https://duckduckgo.com/?q=site%3Aetrade.design${query}`;
  window.open(searchURL, "_blank");
  // fetch(`/search?q=${query}`)
  //   .then(function(response) {
  //     if (response.status !== 200) {
  //       console.log(
  //         "Looks like there was a problem. Status Code: " + response.status
  //       );
  //       return;
  //     }

  //     // Examine the text in the response
  //     response.json().then(function(data) {
  //       console.log(data);
  //     });
  //   })
  //   .catch(function(err) {
  //     console.log("Fetch Error :-S", err);
  //   });
};

document.onreadystatechange = function() {
  if (document.readyState === "complete") {
    const submitButton = document.getElementById("submit");
    addEvent(submitButton, "click", search);
    const searchField = document.getElementById("search");
    addEvent(searchField, "keyup", function() {
      event.preventDefault();
      // Number 13 is the "Enter" key on the keyboard
      if (event.keyCode === 13) {
        search();
      }
    });
  }
};
