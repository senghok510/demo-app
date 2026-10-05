import test from "node:test";
import assert from "node:assert/strict";
import { createIdea, deleteIdea, filterIdeas, toggleIdea } from "../src/ideas.js";

test("createIdea trims its title", () => {
  assert.deepEqual(createIdea("  Add search  ", "idea-1"), {
    id: "idea-1",
    title: "Add search",
    done: false,
  });
});

test("createIdea rejects an empty title", () => {
  assert.throws(() => createIdea("   ", "idea-1"), /Write an idea/);
});

test("toggleIdea changes only the selected idea", () => {
  const ideas = [
    { id: "one", title: "First", done: false },
    { id: "two", title: "Second", done: false },
  ];

  assert.deepEqual(toggleIdea(ideas, "two"), [
    ideas[0],
    { id: "two", title: "Second", done: true },
  ]);
});

test("deleteIdea removes the selected idea", () => {
  const ideas = [
    { id: "one", title: "First", done: false },
    { id: "two", title: "Second", done: true },
  ];

  assert.deepEqual(deleteIdea(ideas, "one"), [ideas[1]]);
});

test("filterIdeas filters open and completed ideas", () => {
  const ideas = [
    { id: "one", title: "First", done: false },
    { id: "two", title: "Second", done: true },
  ];

  assert.deepEqual(filterIdeas(ideas, "open"), [ideas[0]]);
  assert.deepEqual(filterIdeas(ideas, "done"), [ideas[1]]);
  assert.deepEqual(filterIdeas(ideas, "all"), ideas);
});
