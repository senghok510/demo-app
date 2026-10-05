import { createIdea, deleteIdea, filterIdeas, toggleIdea } from "./ideas.js";

const storageKey = "idea-board-items";
const form = document.querySelector("#idea-form");
const input = document.querySelector("#idea-input");
const error = document.querySelector("#form-error");
const list = document.querySelector("#idea-list");
const template = document.querySelector("#idea-template");
const count = document.querySelector("#idea-count");
const emptyState = document.querySelector("#empty-state");
const filters = [...document.querySelectorAll(".filter")];

let ideas = loadIdeas();
let activeFilter = "all";

function loadIdeas() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function saveIdeas() {
  localStorage.setItem(storageKey, JSON.stringify(ideas));
}

function render() {
  const visibleIdeas = filterIdeas(ideas, activeFilter);
  list.replaceChildren();

  for (const idea of visibleIdeas) {
    const fragment = template.content.cloneNode(true);
    const card = fragment.querySelector(".idea-card");
    const toggle = fragment.querySelector(".idea-toggle");
    const title = fragment.querySelector(".idea-title");
    const deleteButton = fragment.querySelector(".delete-button");

    card.dataset.id = idea.id;
    toggle.checked = idea.done;
    title.textContent = idea.title;
    deleteButton.setAttribute("aria-label", `Delete ${idea.title}`);
    list.append(fragment);
  }

  const openCount = ideas.filter((idea) => !idea.done).length;
  count.textContent = `${openCount} open ${openCount === 1 ? "idea" : "ideas"}`;
  emptyState.hidden = visibleIdeas.length > 0;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  error.textContent = "";

  try {
    ideas = [createIdea(input.value), ...ideas];
    saveIdeas();
    form.reset();
    input.focus();
    render();
  } catch (caughtError) {
    error.textContent = caughtError.message;
  }
});

list.addEventListener("change", (event) => {
  if (!event.target.matches(".idea-toggle")) return;
  ideas = toggleIdea(ideas, event.target.closest(".idea-card").dataset.id);
  saveIdeas();
  render();
});

list.addEventListener("click", (event) => {
  if (!event.target.matches(".delete-button")) return;
  ideas = deleteIdea(ideas, event.target.closest(".idea-card").dataset.id);
  saveIdeas();
  render();
});

for (const filter of filters) {
  filter.addEventListener("click", () => {
    activeFilter = filter.dataset.filter;
    filters.forEach((button) => button.classList.toggle("is-active", button === filter));
    render();
  });
}

render();
