## Knowledge graph (private repo)

This site's knowledge graph lives in a separate private repo, [Hole-Donuts/Official-Website-graph](https://github.com/Hole-Donuts/Official-Website-graph), checked out as `graphify-out/` inside this folder. `graphify-out/` is in `.gitignore`, so it never lands in this public repo.

At the start of a session:
- If `graphify-out/` is missing, clone it: `git clone https://github.com/Hole-Donuts/Official-Website-graph.git graphify-out`
- If it exists, update it: `git -C graphify-out pull --ff-only`

After the graph is rebuilt (`/graphify --update` or `graphify update .`), commit and push it from inside `graphify-out/` so other sessions get the same graph: `git -C graphify-out add -A && git -C graphify-out commit -m "Update graph" && git -C graphify-out push`. Never copy graph files into this repo.

The Clear Desk 17.00, Pos Jaga Lobi and Meja Kasir pages ship obfuscated here. Their function-level nodes in the graph come from the readable sources, so re-extracting those three pages from this repo loses detail; keep their existing nodes unless the readable source changes.

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:
- When graphify-out/graph.json exists, run `graphify query "<question>"` before your first grep, search or source-file read for a codebase question, and put this rule in every subagent prompt that explores code. Read raw files only for lines the graph or an earlier read already located. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).
- A committed graphify-out/graph.json is rewritten whole on every build, so a large diff to it in a pull request is expected. Do not flag it as churn or suggest skipping the graph rebuild or its hooks.
