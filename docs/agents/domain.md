# Domain Docs

How the engineering skills should consume this repository’s domain documentation.

## Before exploring, read these

- `GLOSSARY.md` at the repository root.
- `GLOSSARY-MAP.md`, if present.
- Relevant ADRs under `docs/adr/`.

If these files do not exist, proceed silently. The `$domain-modeling` skill creates them lazily when terms or decisions are resolved.

## File structure

This is a single-context repository:

/
├── GLOSSARY.md
├── docs/adr/
└── src/

## Use the glossary’s vocabulary

Use terms as defined in `GLOSSARY.md`. Avoid synonyms that the glossary explicitly rejects.

If a necessary concept is missing, reconsider the terminology or note the gap for `$domain-modeling`.

## Flag ADR conflicts

If proposed work contradicts an existing ADR, identify the conflict explicitly instead of silently overriding it.
