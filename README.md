# Публичная витрина демо-концептов

Папка подготовлена для GitHub Pages. После авторизации GitHub CLI она будет опубликована как один публичный сайт с четырьмя демо-нишами.

Каждый макет — демонстрация структуры, не официальный сайт компании.

## Design source

Figma: https://www.figma.com/design/0A2lk17jcnuRdMAAE2Ppq8

Figma MCP discovery is currently blocked by the Starter-plan tool-call limit; no pages or frames were created or confirmed in this run.

## Verification

Run the static contract test:

```powershell
$node='C:\Users\vadim\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe'
& $node --test 'C:\Users\vadim\Desktop\GPT\sales-agent\03_DEMO_SITES\showcase\tests\validate_showcase.mjs'
```

All five pages should be reviewed locally on desktop and mobile before publication. Motion is optional enhancement; the `prefers-reduced-motion` media query keeps content visible without animation.
