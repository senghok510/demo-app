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

export function filterIdeas(ideas, filter) {
  if (filter === "open") return ideas.filter((idea) => !idea.done);
  if (filter === "done") return ideas.filter((idea) => idea.done);
  return ideas;
}
