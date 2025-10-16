const members = [
    { role: "President", name: "Pratish Subedi" },
    { role: "Vice President", name: "Sohan Ghimire" },
    { role: "Secretary", name: "Punya Gautam" },
    { role: "Treasurer", name: "Rijan Dhakal" },
    { role: "Technical Lead", name: "Bhagya Neupane" },
    { role: "Events Coordinator", name: "Rishi Dhamala" },
  ];

  const cabinetGrid = document.getElementById("cabinet-grid");

  cabinetGrid.innerHTML = members
    .map(
      ({ role, name }) => `
      <div class="member-card">
        <div class="member-image">
          <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=2563eb&color=fff&size=200" 
               alt="${role}" loading="lazy">
        </div>
        <h3>${role}</h3>
        <p>${name}</p>
      </div>`
    )
    .join("");