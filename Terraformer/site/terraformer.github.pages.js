#!/usr/bin/env node
"use strict";

function buildSite() {
  const fs = require("node:fs");
  const path = require("node:path");
  const outputDirectory = path.resolve(process.argv[2] || "dist");
  const html = String.raw`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'self'; style-src 'self'; connect-src 'none'; base-uri 'none'; form-action 'none';">
  <meta name="referrer" content="no-referrer">
  <title>Terraformer | Under construction</title>
  <link rel="stylesheet" href="./terraformer.css">
  <script src="./terraformer.github.pages.js" defer></script>
</head>
<body>
  <header class="masthead">
    <span class="wordmark">TERRAFORMER<span>/</span></span>
    <span class="masthead-note"><i></i> SYSTEM ASSEMBLY IN PROGRESS</span>
  </header>
  <main class="launch">
    <section class="intro" aria-labelledby="page-title">
      <p class="eyebrow"><span>FIELD NOTE 001</span><span>42.3601 N / 71.0589 W</span></p>
      <h1 id="page-title">A new world<br>is <em>in progress.</em></h1>
      <p class="lede">Terraformer is taking shape as a careful, inspectable environment for working with code and data.</p>
      <div class="build-state"><span class="state-mark" aria-hidden="true"></span><span>FOUNDATION PHASE</span><span class="state-line"></span><span>UNDER CONSTRUCTION</span></div>
    </section>
    <section class="prompt-shell" aria-labelledby="prompt-title">
      <div class="prompt-heading">
        <div class="copilot-mark" aria-hidden="true">Co</div>
        <div class="prompt-title-group">
          <h2 id="prompt-title">Copilot</h2>
          <span>Prompt preview</span>
        </div>
        <span class="connection-state"><i></i> PREVIEW ONLY</span>
      </div>
      <form id="prompt-form">
        <label class="sr-only" for="prompt-input">Write a prompt</label>
        <textarea id="prompt-input" name="prompt" rows="3" maxlength="280" placeholder="What would you like to explore?" required></textarea>
        <div class="prompt-controls">
          <span id="prompt-count">0 / 280 · stays in this tab</span>
          <button id="prompt-submit" type="submit" disabled>Preview prompt</button>
        </div>
      </form>
      <p id="prompt-status" class="prompt-status" role="status" aria-live="polite" hidden></p>
      <p class="privacy-note">No Copilot connection is configured. Your prompt is not sent or stored.</p>
    </section>
    <div class="instrument" aria-hidden="true">
      <span>ATMOSPHERE MODEL / OFFLINE</span>
      <div class="instrument-grid"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
      <span>SIMULATION WILL BEGIN WHEN THE CORE IS READY</span>
    </div>
  </main>
  <footer>
    <span>ENGINEERING LOG / BUILD 001</span>
    <span>PAGE STATUS / UNDER CONSTRUCTION</span>
  </footer>
</body>
</html>
`;
  const css = String.raw`:root {
  color-scheme: light;
  --ink: #192b2b;
  --muted: #657573;
  --line: #c9d3ce;
  --paper: #edf1ed;
  --white: #fbfcf9;
  --green: #0b7664;
  --green-dark: #075447;
  --orange: #d05a39;
  --night: #1a2928;
  --mono: "SFMono-Regular", Consolas, "Liberation Mono", monospace;
  font-family: "Avenir Next", Avenir, "Segoe UI", sans-serif;
  color: var(--ink);
  background: var(--paper);
}
* { box-sizing: border-box; }
body {
  min-width: 320px;
  min-height: 100vh;
  margin: 0;
  background-image: linear-gradient(rgba(25, 43, 43, 0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(25, 43, 43, 0.045) 1px, transparent 1px);
  background-size: 36px 36px;
}
.masthead, footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  min-height: 64px;
  padding: 0 6vw;
  border-bottom: 1px solid var(--line);
  background: rgba(237, 241, 237, 0.94);
}
.wordmark { color: var(--ink); font: 700 16px var(--mono); text-decoration: none; }
.wordmark span { color: var(--orange); }
.masthead-note, .eyebrow, .build-state, .connection-state, .prompt-controls, .privacy-note, .instrument, footer { font: 10px var(--mono); }
.masthead-note { display: flex; align-items: center; gap: 10px; color: var(--muted); }
.masthead-note i, .connection-state i, .state-mark { width: 7px; height: 7px; border-radius: 50%; background: var(--orange); }
.launch { position: relative; display: flex; min-height: calc(100svh - 122px); flex-direction: column; align-items: center; justify-content: center; overflow: hidden; padding: 70px 24px 76px; text-align: center; }
.launch::before, .launch::after { position: absolute; width: 36%; height: 1px; background: var(--line); content: ""; }
.launch::before { top: 16%; right: -10%; transform: rotate(-28deg); }
.launch::after { bottom: 20%; left: -10%; transform: rotate(-28deg); }
.intro { z-index: 1; max-width: 720px; animation: arrive 700ms both; }
.eyebrow { display: flex; justify-content: center; gap: 20px; margin: 0 0 27px; color: var(--green-dark); }
.eyebrow span + span { color: var(--muted); }
h1, h2, p { margin-top: 0; }
h1 { margin-bottom: 20px; font: 400 68px/1.04 Georgia, "Times New Roman", serif; }
h1 em { color: var(--green); font-weight: 400; }
.lede { max-width: 540px; margin: 0 auto; color: var(--muted); font-size: 16px; line-height: 1.65; }
.build-state { display: flex; align-items: center; gap: 11px; max-width: 540px; margin: 29px auto 32px; color: var(--muted); white-space: nowrap; }
.state-mark { flex: 0 0 auto; animation: signal 2s infinite; }
.state-line { width: 66px; height: 1px; background: var(--line); }
.prompt-shell { z-index: 1; width: min(100%, 660px); padding: 19px 21px 14px; border: 1px solid #344846; background: var(--night); color: #e5ece8; text-align: left; box-shadow: 9px 9px 0 rgba(25, 43, 43, 0.08); animation: arrive 700ms 120ms both; }
.prompt-heading { display: flex; align-items: center; gap: 11px; padding-bottom: 15px; border-bottom: 1px solid #344846; }
.copilot-mark { display: grid; width: 30px; height: 30px; place-items: center; border: 1px solid #66837a; border-radius: 8px 8px 8px 2px; color: #b6e4cf; font: 700 12px var(--mono); }
.prompt-title-group { display: grid; gap: 3px; }
.prompt-title-group h2 { margin: 0; font: 600 13px "Avenir Next", Avenir, sans-serif; }
.prompt-title-group span { color: #96aaa3; font: 10px var(--mono); }
.connection-state { display: flex; align-items: center; gap: 8px; margin-left: auto; color: #b5c6bf; }
.connection-state i { width: 6px; height: 6px; background: #e09a68; }
.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; clip-path: inset(50%); }
textarea { display: block; width: 100%; min-height: 92px; padding: 17px 2px 12px; resize: vertical; border: 0; outline: 0; background: transparent; color: #f5f8f6; font: 15px/1.6 "Avenir Next", Avenir, sans-serif; }
textarea::placeholder { color: #8ea39b; }
textarea:focus-visible { outline: 2px solid #81c6a8; outline-offset: 2px; }
.prompt-controls { display: flex; align-items: center; justify-content: space-between; gap: 15px; padding-top: 12px; border-top: 1px solid #344846; color: #96aaa3; }
button { min-height: 38px; padding: 0 13px; border: 0; border-radius: 2px; background: #b5e2c9; color: #18362f; font: 600 12px "Avenir Next", Avenir, sans-serif; cursor: pointer; }
button:hover:not(:disabled) { background: #d0f0dd; }
button:disabled { cursor: default; opacity: 0.45; }
button:focus-visible, a:focus-visible { outline: 3px solid #e69a70; outline-offset: 3px; }
.prompt-status { margin: 13px 0 0; padding: 11px 12px; border-left: 2px solid #82c6a5; background: #223632; color: #d6e4dd; font-size: 13px; line-height: 1.5; }
.privacy-note { margin: 13px 0 0; color: #9eb1a9; }
.instrument { display: flex; align-items: center; gap: 13px; width: min(100%, 660px); margin-top: 30px; color: var(--muted); font-size: 9px; }
.instrument-grid { display: flex; flex: 1; align-items: center; justify-content: center; gap: 4px; height: 19px; overflow: hidden; }
.instrument-grid i { display: block; width: 2px; height: 6px; background: var(--green); opacity: 0.65; }
.instrument-grid i:nth-child(3n) { height: 13px; }
.instrument-grid i:nth-child(4n) { height: 17px; background: var(--orange); }
.instrument-grid i:nth-child(5n) { height: 9px; }
footer { min-height: 58px; border-top: 1px solid var(--line); border-bottom: 0; color: var(--muted); }
footer a { color: var(--green-dark); text-decoration: none; }
footer a span { color: var(--orange); }
@keyframes arrive { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
@keyframes signal { 50% { opacity: 0.35; } }
@media (max-width: 600px) {
  .masthead, footer { padding-right: 18px; padding-left: 18px; }
  .masthead-note { max-width: 155px; justify-content: flex-end; text-align: right; line-height: 1.5; }
  .launch { min-height: calc(100svh - 122px); padding: 55px 18px; }
  h1 { font-size: 46px; }
  .eyebrow { gap: 12px; font-size: 9px; }
  .build-state { gap: 7px; font-size: 8px; }
  .state-line { width: 28px; }
  .prompt-shell { padding: 16px 15px 12px; }
  .prompt-controls { align-items: flex-start; flex-direction: column; }
  .instrument { gap: 7px; font-size: 7px; }
  footer { font-size: 8px; }
}
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; scroll-behavior: auto !important; }
}
`;

  fs.mkdirSync(outputDirectory, { recursive: true });
  fs.writeFileSync(path.join(outputDirectory, "index.html"), html);
  fs.writeFileSync(path.join(outputDirectory, "terraformer.css"), css);
  const browserScript = path.join(outputDirectory, "terraformer.github.pages.js");
  if (path.resolve(__filename) !== browserScript) fs.copyFileSync(__filename, browserScript);
  process.stdout.write(`Built Pages site in ${outputDirectory}\n`);
}

if (typeof document === "undefined") buildSite();
else initializeBrowserClient();

function initializeBrowserClient() {
  const form = document.querySelector("#prompt-form");
  const input = document.querySelector("#prompt-input");
  const count = document.querySelector("#prompt-count");
  const submit = document.querySelector("#prompt-submit");
  const status = document.querySelector("#prompt-status");

  input.addEventListener("input", () => {
    const length = input.value.trim().length;
    count.textContent = `${input.value.length} / 280 · stays in this tab`;
    submit.disabled = length === 0;
    status.hidden = true;
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    status.textContent = "Prompt preview ready. Copilot is not connected, and nothing was sent.";
    status.hidden = false;
  });
}
