---
name: commit
description: Enforces granular, logical git commits with conventional format (feat/fix/refactor/etc). Use when the user asks to commit, save progress, or create git history. Ensures step-by-step commit narrative and never adds Co-Authored-By.
user-invocable: true
allowed-tools: Bash(git *)
---

# Git Commit Rules

When the user asks you to commit changes, follow these rules strictly.

## Granular Commits

- **Never** bundle all changes into a single commit.
- Create **granular, logical commits** that show the step-by-step reasoning followed to reach the final result.
- Each commit should represent **one logical unit of work** (e.g., add a component, add styles, wire up data, fix a bug).
- The commit history should read like a **narrative** of the work done.
- Stage only the files relevant to each logical step using `git add <file>...` — never use `git add .` or `git add -A` for granular commits.

## Commit Message Format

- Always use this convention: `prefix: short description in english`
- Keep messages **concise** and in **lowercase English** after the prefix.
- Valid prefixes: `feat:`, `fix:`, `refactor:`, `style:`, `chore:`, `docs:`, `test:`
- Examples:
  - `feat: add product card component`
  - `style: apply responsive layout to header`
  - `fix: resolve null pointer on user lookup`
  - `refactor: extract auth logic into custom hook`
  - `chore: update dependencies`
  - `docs: add api usage examples to readme`
  - `test: add unit tests for cart service`

## No Co-Authored-By

- **NEVER** add `Co-Authored-By` lines to commit messages. No exceptions.

## Workflow

1. Run `git status` and `git diff` to understand all pending changes.
2. Group changes into logical steps.
3. For each step:
   a. Stage only the relevant files with `git add <file>...`
   b. Commit with the proper format: `git commit -m "prefix: description"`
4. After all commits, run `git log --oneline -n <number_of_commits>` to show the user the resulting history.
