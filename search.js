(function () {
  const input = document.getElementById("inputSuggestions");
  const suggestionsArea = document.getElementById("suggestionsList");

  input.addEventListener("focus", onFocus);
  input.addEventListener("keyup", onChange);
  suggestionsArea.addEventListener("click", onSuggestionClick, true);

  function onFocus() {
    suggestionsArea.style.display = "block";
  }

  function onChange(e) {
    const value = e.target.value.toLowerCase();
    processData(value);
  }

  async function processData(value) {
    suggestionsArea.innerHTML = "";
    try {
      const suggestions = await getSuggestions(value);
      if (suggestions.length > 0) {
        const list = document.createElement("ul");
        suggestions.forEach((suggestion) => {
          const listItem = document.createElement("li");
          listItem.style.cursor = "pointer";
          listItem.textContent = suggestion;
          list.appendChild(listItem);
        });
        suggestionsArea.appendChild(list);
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      return;
    }
  }

  const onClick = (e) => {
    if (e.target === suggestionArea) {
      return;
    }

    const text = e.target.innerText;
    input.value = text;
    input.focus();
  };

  input.addEventListener("focus", onFocus);
  window.addEventListener("click", onBlur);
  input.addEventListener("keyup", onChange);
  suggestionsArea.addEventListener("click", onClick, true);
})();
