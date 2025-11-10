async function obtenerCitaConAutor() {
  try {
    const respuesta = await fetch("./data/members.json");
    const datos = await respuesta.json();

    renderdataJson(datos);
  } catch (error) {
    console.error("Error al obtener la cita:", error);
  }
}

function createViewControls() {
  const viewControls = document.createElement("div");
  viewControls.classList.add("view-controls");
  
  const gridButton = document.createElement("button");
  gridButton.classList.add("view-button", "active");
  gridButton.setAttribute("data-view", "grid");
  gridButton.innerHTML = '<span>Grid</span>';
  gridButton.addEventListener("click", () => toggleView("grid"));
  
  const listButton = document.createElement("button");
  listButton.classList.add("view-button");
  listButton.setAttribute("data-view", "list");
  listButton.innerHTML = '<span>List</span>';
  listButton.addEventListener("click", () => toggleView("list"));
  
  viewControls.appendChild(gridButton);
  viewControls.appendChild(listButton);
  
  return viewControls;
}

function toggleView(viewType) {
  const container = document.querySelector(".cards-container");
  const buttons = document.querySelectorAll(".view-button");
  
  buttons.forEach(button => button.classList.remove("active"));
  
  if (viewType === "list") {
    container.classList.add("list-view");
    document.querySelector('[data-view="list"]').classList.add("active");
  } else {
    container.classList.remove("list-view");
    document.querySelector('[data-view="grid"]').classList.add("active");
  }
}

function renderdataJson(apiData) {
  const sectionPrincipal = document.querySelector(".mainContainer");
  sectionPrincipal.innerHTML = "<h1>Chamber Directory</h1>";
  
  // Agregar controles de vista
  const viewControls = createViewControls();
  sectionPrincipal.appendChild(viewControls);
  
  const cardsContainer = document.createElement("div");
  cardsContainer.classList.add("cards-container");
  
  const fragment = document.createDocumentFragment();

  apiData.forEach((element) => {
    const div = document.createElement("div");
    div.classList.add("member-card");
    
    // Convertir nivel de membresía a texto
    const membershipLevel = getMembershipLevel(element.membershipLevel);
    
    div.innerHTML = `
      <div class="membership-level">${membershipLevel}</div>
      <img src="${element.imageFilename}" alt="${element.name}" loading="lazy">
      <div class="card-content">
        <h3>${element.name}</h3>
        
        <p>${element.description}</p>
        <p><strong>Categoría:</strong> ${element.category}</p>
        <p><strong>Empleados:</strong> ${element.employees}</p>
        <p><strong>Fundado:</strong> ${element.yearFounded}</p>
      </div>
      <div class="card-contact">
        <p><strong>Dirección:</strong> ${element.address}</p>
        <p><strong>Teléfono:</strong> ${element.phone}</p>
        <p><strong>Email:</strong> ${element.email}</p>
        <a href="${element.website}" target="_blank">Visitar sitio web</a>
      </div>
    `;
    fragment.appendChild(div);
  });

  cardsContainer.appendChild(fragment);
  sectionPrincipal.appendChild(cardsContainer);
}

function getMembershipLevel(level) {
  switch (level) {
    case 1:
      return "Bronce";
    case 2:
      return "Plata";
    case 3:
      return "Oro";
    default:
      return "Miembro";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  obtenerCitaConAutor();
});
