// Count-up numbers, growing bars and fade-ins as each part scrolls into view.
const fmt = (n, d) => n.toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d });

function countUp(el) {
  const end = parseFloat(el.dataset.count), d = parseInt(el.dataset.decimals || "0", 10);
  const suffix = el.dataset.suffix || "", start = performance.now(), dur = 1400;
  const step = (t) => {
    const p = Math.min((t - start) / dur, 1), e = 1 - Math.pow(1 - p, 3);
    el.textContent = fmt(end * e, d) + suffix;
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
document.querySelectorAll(".card, .kpi, .tool, .skills > div, .pcard, .flow > div, figure").forEach((el) => el.classList.add("reveal"));

const io = new IntersectionObserver((entries) => {
  entries.forEach((en) => {
    if (!en.isIntersecting) return;
    const el = en.target;
    if (el.dataset.count) reduce ? (el.textContent = fmt(parseFloat(el.dataset.count), parseInt(el.dataset.decimals || "0", 10)) + (el.dataset.suffix || "")) : countUp(el);
    el.classList.add("on");
    io.unobserve(el);
  });
}, { threshold: 0.25 });

document.querySelectorAll("[data-count], .bar, .reveal").forEach((el) => io.observe(el));
