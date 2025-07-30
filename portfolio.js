// sparkle effect
const root = document.getElementById("app");

const urls = ["/image/P2.svg"];
const classes = ["star-1"];
function createStar(x, y) {
  const star = document.createElement("img");
  const idx = Math.floor(Math.random() * classes.length);
  star.classList.add("star", classes[idx], "fall");
  star.setAttribute("src", urls[idx]);
  star.setAttribute(
    "style",
    `
  position:fixed;
  top: ${y}px;
  left: ${x}px;
  `
  );
  root.appendChild(star);
  setTimeout(() => star.remove(), 1250);
  return star;
}

window.addEventListener("mousemove", (e) => {
  requestAnimationFrame(function () {
    createStar(e.clientX, e.clientY);
  });
});
