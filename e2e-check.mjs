import { chromium } from "playwright";

const BASE = "http://localhost:3000";
const log = (...a) => console.log(...a);
const errors = [];
let revealsUsed = 0;

const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" });
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const page = await ctx.newPage();
page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));
page.on("console", (m) => { if (m.type() === "error") errors.push(`console: ${m.text()}`); });

/** Answer whatever question is showing, trying options until one is accepted. */
async function solveQuestion() {
  const check = page.getByRole("button", { name: /تحقق من الإجابة|Check answer/ });
  if (!(await check.count())) return true;

  for (let attempt = 0; attempt < 6; attempt += 1) {
    const leftList = page.getByRole("list", { name: /عناصر للتوصيل|Items to match/ });
    const rightList = page.getByRole("list", { name: /الإجابات المحتملة|Possible matches/ });
    const sortPool = page.getByRole("group", { name: /عناصر لم تُصنَّف|Items not sorted/ });
    const arrows = page.getByRole("button", { name: "↓" });
    const radios = page.locator('[role="radio"]:not([disabled])');
    const boxes = page.locator('[role="checkbox"]:not([disabled])');
    const inputs = page.locator('input[type="text"]:not([disabled])');
    const pressed = page.locator('button[aria-pressed]:not([disabled])');

    if (await leftList.count()) {
      const lefts = leftList.getByRole("button");
      const total = await lefts.count();
      for (let i = 0; i < total; i += 1) {
        await lefts.nth(i).click();
        const rights = rightList.getByRole("button");
        const available = await rights.count();
        if (!available) break;
        await rights.nth((i + attempt) % available).click();
        await page.waitForTimeout(40);
      }
    } else if ((await sortPool.count()) && (await sortPool.getByRole("button").count())) {
      let guard = 0;
      while ((await sortPool.getByRole("button").count()) && guard < 20) {
        await sortPool.getByRole("button").first().click();
        const buckets = page.locator("div.rounded-3xl > button:not([disabled])");
        const available = await buckets.count();
        if (!available) break;
        await buckets.nth((guard + attempt) % available).click();
        guard += 1;
        await page.waitForTimeout(40);
      }
    } else if (await arrows.count()) {
      const moves = Math.min(attempt + 1, await arrows.count());
      for (let i = 0; i < moves; i += 1) {
        const a = page.getByRole("button", { name: "↓" });
        if (await a.count()) await a.first().click();
      }
    } else if (await radios.count()) {
      await radios.nth(attempt % (await radios.count())).click();
    } else if (await boxes.count()) {
      const total = await boxes.count();
      for (let i = 0; i < total; i += 1) if ((i + attempt) % 2 === 0) await boxes.nth(i).click();
    } else if (await inputs.count()) {
      const guesses = ["5", "10", "4", "12", "3", "much", "جدار"];
      const total = await inputs.count();
      for (let i = 0; i < total; i += 1) await inputs.nth(i).fill(guesses[(attempt + i) % guesses.length]);
    } else if (await pressed.count()) {
      await pressed.nth(attempt % (await pressed.count())).click();
    } else {
      return false;
    }

    if (await check.isEnabled().catch(() => false)) await check.click();
    await page.waitForTimeout(120);

    if (await page.getByText(/إجابة صحيحة|^Correct!/).count()) return true;

    const reveal = page.getByRole("button", { name: /^(أظهر الحل|Show the answer)$/ });
    if (await reveal.count()) {
      // Two misses unlock the answer, which is also how a stuck student moves on.
      await reveal.click();
      revealsUsed += 1;
      return true;
    }
    const retry = page.getByRole("button", { name: /حاول مرة أخرى|Try again/ });
    if (await retry.count()) await retry.click();
    else return true;
  }
  return false;
}

async function playLesson(url, label) {
  await page.goto(url, { waitUntil: "networkidle" });
  const title = await page.locator("h1").first().innerText();
  let steps = 0;
  for (let i = 0; i < 40; i += 1) {
    if (await page.getByText(/أحسنت! أنهيت الدرس|Well done! Lesson complete/).count()) break;
    await solveQuestion();
    const next = page.getByRole("button", { name: /^(التالي|أنهِ الدرس|Next|Finish lesson)$/ });
    if (!(await next.count()) || (await next.isDisabled())) break;
    await next.click();
    steps += 1;
    await page.waitForTimeout(120);
  }
  const done = (await page.getByText(/أحسنت! أنهيت الدرس|Well done! Lesson complete/).count()) > 0;
  const score = done ? await page.locator("dd").first().innerText() : "—";
  log(`${label}: "${title}" — steps=${steps} completed=${done} score=${score}`);
  return done;
}

// 1. home page, Arabic by default
await page.goto(BASE, { waitUntil: "networkidle" });
log("1. home dir:", await page.getAttribute("html", "dir"), "| h1:", (await page.locator("h1").first().innerText()).slice(0, 50));

// 2. login as the demo student
await page.goto(`${BASE}/login`, { waitUntil: "networkidle" });
await page.fill('input[name="email"]', "student@school-on.test");
await page.fill('input[name="password"]', "demo1234");
const loginForm = page.locator("form").filter({ has: page.locator('input[name="password"]') });
await Promise.all([page.waitForURL("**/learn", { timeout: 30000 }), loginForm.locator('button[type="submit"]').click()]);
log("2. login ok →", page.url(), "|", (await page.locator("h1").first().innerText()).slice(0, 40));

// 3. play three authored lessons covering every question type
await playLesson(`${BASE}/learn/lesson/saudi-g4-math-fractions-1`, "3a. saudi maths");
await playLesson(`${BASE}/learn/lesson/american-g5-science-life-2`, "3b. american science");
await playLesson(`${BASE}/learn/lesson/british-g1-english-reading-1`, "3c. british phonics");

// 4. progress is persisted
await page.goto(`${BASE}/learn`, { waitUntil: "networkidle" });
const statValues = await page.locator(".card dd, .card .text-2xl").allInnerTexts();
log("4. dashboard stats:", statValues.slice(0, 4).join(" | "));

// 5. gating: a paid lesson is locked before subscribing
await page.goto(`${BASE}/learn/lesson/saudi-g4-math-number-2`, { waitUntil: "networkidle" });
log("5. locked before subscribing:", (await page.getByText(/يحتاج اشتراكًا|needs a subscription/).count()) > 0);

// 6. subscribe, then the same lesson opens
await page.goto(`${BASE}/pricing`, { waitUntil: "networkidle" });
await page.getByRole("button", { name: /^(اشترك الآن|Subscribe)$/ }).first().click();
await page.waitForTimeout(2500);
log("6. subscribed:", (await page.getByText(/تم تفعيل اشتراكك|subscription is active/).count()) > 0);
await page.goto(`${BASE}/learn/lesson/saudi-g4-math-number-2`, { waitUntil: "networkidle" });
log("   lesson unlocked:", (await page.getByText(/يحتاج اشتراكًا|needs a subscription/).count()) === 0);

// 7. language switch
await page.goto(BASE, { waitUntil: "networkidle" });
await page.locator("header").getByRole("link", { name: /^(اللغة|Language):/ }).click();
await page.waitForLoadState("networkidle");
log("7. after switch dir:", await page.getAttribute("html", "dir"), "| h1:", (await page.locator("h1").first().innerText()).slice(0, 50));

// 8. parent and admin dashboards
for (const [email, path, label] of [
  ["parent@school-on.test", "/parent", "8a. parent"],
  ["teacher@school-on.test", "/teacher", "8b. teacher"],
  ["admin@school-on.test", "/admin", "8c. admin"],
]) {
  await page.context().clearCookies();
  await page.goto(`${BASE}/login`, { waitUntil: "networkidle" });
  if (await page.locator('input[name="email"]').count()) {
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', "demo1234");
    await page.locator("form").filter({ has: page.locator('input[name="password"]') }).locator('button[type="submit"]').click();
    await page.waitForURL(`**${path}`, { timeout: 30000 });
  } else {
    await page.goto(`${BASE}${path}`, { waitUntil: "networkidle" });
  }
  log(`${label}: ${page.url()} — "${(await page.locator("h2, h1").first().innerText()).slice(0, 40)}"`);
}

// 9. a brand-new account has no subscription, so paid lessons are locked
await page.context().clearCookies();
await page.goto(`${BASE}/register`, { waitUntil: "networkidle" });
const stamp = Date.now();
await page.fill('input[name="name"]', "طالب تجريبي");
await page.fill('input[name="email"]', `new${stamp}@school-on.test`);
await page.fill('input[name="password"]', "verysecret123");
await page.locator("form").filter({ has: page.locator('input[name="password"]') }).locator('button[type="submit"]').click();
await page.waitForURL("**/learn", { timeout: 30000 });
console.log("9. registered new student →", page.url());
await page.goto(`${BASE}/learn/lesson/saudi-g4-math-fractions-2`, { waitUntil: "networkidle" });
console.log("   paid lesson locked:", (await page.getByText(/يحتاج اشتراكًا|needs a subscription/).count()) > 0);
await page.goto(`${BASE}/learn/lesson/saudi-g4-math-fractions-1`, { waitUntil: "networkidle" });
console.log("   free authored lesson open:", (await page.getByRole("button", { name: /^(التالي|Next)$/ }).count()) > 0);

log("reveals used:", revealsUsed);
log("--- browser errors ---");
log(errors.length ? [...new Set(errors)].slice(0, 10).join("\n") : "none");
await browser.close();
