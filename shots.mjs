import { chromium } from "playwright";
const B = "http://localhost:3000";
const b = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" });
const c = await b.newContext({ viewport: { width: 1280, height: 1000 }, deviceScaleFactor: 1 });
const p = await c.newPage();
await p.goto(`${B}/api/locale?to=ar&next=/`, { waitUntil: "networkidle" });
const shots = [
  ["/", "home"],
  ["/curricula/saudi", "curriculum"],
  ["/grade/american-g4", "grade"],
  ["/subject/saudi-g4-math", "subject"],
  ["/pricing", "pricing"],
];
for (const [path, name] of shots) {
  await p.goto(B + path, { waitUntil: "networkidle" });
  await p.waitForTimeout(400);
  await p.screenshot({ path: `/tmp/claude-0/${name}.png` });
}
// lesson mid-question
await p.goto(`${B}/login`, { waitUntil: "networkidle" });
await p.fill('input[name="email"]', "student@school-on.test");
await p.fill('input[name="password"]', "demo1234");
await p.locator("form").filter({ has: p.locator('input[name="password"]') }).locator('button[type="submit"]').click();
await p.waitForURL("**/learn");
await p.screenshot({ path: "/tmp/claude-0/dashboard.png" });
await p.goto(`${B}/learn/lesson/american-g4-math-fractions-1`, { waitUntil: "networkidle" });
for (let i = 0; i < 6; i += 1) {
  const n = p.getByRole("button", { name: "التالي" });
  if (await n.count() && !(await n.isDisabled())) { await n.click(); await p.waitForTimeout(150); }
}
await p.screenshot({ path: "/tmp/claude-0/lesson.png" });
await b.close();
