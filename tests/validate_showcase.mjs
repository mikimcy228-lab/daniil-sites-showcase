import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const testDir = dirname(fileURLToPath(import.meta.url));
const siteRoot = resolve(testDir, "..");
const templateNames = ["dental", "repair", "beauty", "education"];

async function source(relativePath) {
  return readFile(join(siteRoot, relativePath), "utf8");
}

function assertLocalAnchorsResolve(html, pageName) {
  const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]));
  for (const match of html.matchAll(/\bhref="#([^"]+)"/g)) {
    assert.ok(ids.has(match[1]), `${pageName} has unresolved #${match[1]} anchor`);
  }
}

test("shared motion contract", async () => {
  const [motion, templateCss, showcaseCss] = await Promise.all([
    source("motion.js"),
    source("template.css"),
    source("styles.css"),
  ]);

  assert.match(motion, /IntersectionObserver/);
  assert.match(motion, /prefers-reduced-motion/);
  assert.match(templateCss, /--motion-ease:\s*cubic-bezier\(\.22,\s*1,\s*\.36,\s*1\)/);
  assert.match(templateCss, /\[data-reveal\]/);
  assert.match(templateCss, /@media\s*\(prefers-reduced-motion:\s*reduce\)/);
  assert.match(showcaseCss, /#motion-pulse/);
  assert.match(showcaseCss, /@media\s*\(prefers-reduced-motion:\s*reduce\)/);
});

test("template page contract", async () => {
  for (const name of templateNames) {
    const html = await source(`${name}/index.html`);
    assert.match(html, new RegExp(`<body[^>]*data-motion-scope="${name}"`));
    assert.match(html, /<script\s+defer\s+src="\.\.\/motion\.js"><\/script>/);
    assert.match(html, new RegExp(`pulse-signal--${name}`));
    assert.match(html, /class="scenario-card"/);
    assert.doesNotMatch(html, /class="quote-card"/);
    assert.match(html, /href="#brief"/);
    assertLocalAnchorsResolve(html, name);
  }
});

test("showcase page contract", async () => {
  const html = await source("index.html");
  assert.match(html, /<body[^>]*data-motion-scope="showcase"/);
  assert.match(html, /id="motion-pulse"/);
  assert.match(html, /<script\s+defer\s+src="motion\.js"><\/script>/);
  assert.match(html, /href="#brief"/);
  assert.match(html, /data-reveal/);
  assertLocalAnchorsResolve(html, "showcase");
});
