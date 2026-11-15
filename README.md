# How to control "bug"

[packages/app-x/src/router.tsx:22](packages/app-x/src/router.tsx) has a variable which enables or disables workaround.

# How to run

start by

```
nub i
```

```
nub run build && nub run tauri build --no-bundle && ./packages/runtime/target/release/universal-player-3
```

> rerun after each change

---

```
npm i
```

```
npm run build && npm run tauri build --no-bundle && ./packages/runtime/target/release/universal-player-3
```

> rerun after each change

---

**DO NOT USE TAURI DEV MODE - IT WORKS JUST FINE AND WONT REPRODUCE BUG**