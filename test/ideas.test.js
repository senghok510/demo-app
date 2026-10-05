import test from "node:test";
import assert from "node:assert/strict";
import {
  createIdea,
  deleteIdea,
  filterIdeas,
  reorderIdeas,
  toggleIdea,
} from "../src/ideas.js";

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

test("filterIdeas searches titles case-insensitively", () => {
  const ideas = [
    { id: "one", title: "Add Keyboard Shortcuts", done: false },
    { id: "two", title: "Improve mobile layout", done: false },
  ];

  assert.deepEqual(filterIdeas(ideas, "all", "keyboard"), [ideas[0]]);
  assert.deepEqual(filterIdeas(ideas, "all", "MOBILE"), [ideas[1]]);
});

test("filterIdeas combines search with the status filter without changing ideas", () => {
  const ideas = [
    { id: "one", title: "Add search", done: false },
    { id: "two", title: "Test search", done: true },
    { id: "three", title: "Improve layout", done: false },
  ];
  const originalIdeas = structuredClone(ideas);

  assert.deepEqual(filterIdeas(ideas, "open", "search"), [ideas[0]]);
  assert.deepEqual(filterIdeas(ideas, "done", "search"), [ideas[1]]);
  assert.deepEqual(ideas, originalIdeas);
});

test("reorderIdeas moves an idea upward to the destination position", () => {
  const ideas = [
    { id: "one", title: "First", done: false },
    { id: "two", title: "Second", done: true },
    { id: "three", title: "Third", done: false },
  ];

  assert.deepEqual(reorderIdeas(ideas, "three", "one"), [
    ideas[2],
    ideas[0],
    ideas[1],
  ]);
});

test("reorderIdeas moves an idea downward to the destination position", () => {
  const ideas = [
    { id: "one", title: "First", done: false },
    { id: "two", title: "Second", done: true },
    { id: "three", title: "Third", done: false },
  ];

  assert.deepEqual(reorderIdeas(ideas, "one", "three"), [
    ideas[1],
    ideas[2],
    ideas[0],
  ]);
});

test("reorderIdeas returns a new collection without changing idea data or its input", () => {
  const ideas = [
    { id: "one", title: "First", done: false },
    { id: "two", title: "Second", done: true },
  ];
  const originalIdeas = structuredClone(ideas);

  const reordered = reorderIdeas(ideas, "two", "one");

  assert.notStrictEqual(reordered, ideas);
  assert.deepEqual(reordered, [ideas[1], ideas[0]]);
  assert.deepEqual(ideas, originalIdeas);
});

test("reorderIdeas leaves the order unchanged for invalid and same-item moves", () => {
  const ideas = [
    { id: "one", title: "First", done: false },
    { id: "two", title: "Second", done: true },
  ];

  assert.strictEqual(reorderIdeas(ideas, "one", "one"), ideas);
  assert.strictEqual(reorderIdeas(ideas, "missing", "one"), ideas);
  assert.strictEqual(reorderIdeas(ideas, "one", "missing"), ideas);
});
