export function createIdea(title, id = crypto.randomUUID()) {
  const normalizedTitle = title.trim();

  if (!normalizedTitle) {
    throw new Error("Write an idea before adding it.");
  }

  return { id, title: normalizedTitle, done: false };
}

export function toggleIdea(ideas, id) {
  return ideas.map((idea) => (idea.id === id ? { ...idea, done: !idea.done } : idea));
}

export function deleteIdea(ideas, id) {
  return ideas.filter((idea) => idea.id !== id);
}

export function filterIdeas(ideas, filter, query = "") {
  const normalizedQuery = query.trim().toLocaleLowerCase();

  return ideas.filter((idea) => {
    const matchesStatus =
      filter === "open" ? !idea.done : filter === "done" ? idea.done : true;
    const matchesSearch = idea.title.toLocaleLowerCase().includes(normalizedQuery);

    return matchesStatus && matchesSearch;
  });
}
