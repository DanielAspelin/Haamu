(() => {
  "use strict";

  const root = document.getElementById("haamu-root");
  if (!root) return;

  const heading = document.createElement("h1");
  heading.textContent = "Haamu";

  const status = document.createElement("p");
  status.textContent = "Currently under construction.";

  root.replaceChildren(heading, status);
})();
