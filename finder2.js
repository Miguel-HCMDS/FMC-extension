let matches = [];
let currentIndex = -1;

/* ---------- styles ---------- */
const injectStyles = () => {
  if (document.getElementById("__mwf_styles")) return;

  const style = document.createElement("style");
  style.id = "__mwf_styles";
  style.textContent = `
    mark.__mwf {
      background: yellow;
    }
    mark.__mwf.__active {
      background: orange;
      outline: 2px solid red;
    }
  `;
  document.head.appendChild(style);
};

/* ---------- visibility ---------- */
const isVisible = (el) => {
  while (el && el !== document.body) {
    const style = window.getComputedStyle(el);
    if (
      style.display === "none" ||
      style.visibility === "hidden" ||
      style.opacity === "0"
    ) {
      return false;
    }
    el = el.parentElement;
  }
  return true;
};

/* ---------- cleanup ---------- */
const clearHighlights = () => {
  document.querySelectorAll("mark.__mwf").forEach(mark => {
    mark.replaceWith(document.createTextNode(mark.textContent));
  });
};

/* ---------- highlight logic ---------- */
const highlightWords = (words) => {
  injectStyles();
  clearHighlights();

  matches = [];
  currentIndex = -1;
  if (!words.length) return;

  const searchRegex = new RegExp(`(${words.join("|")})`, "gi");
  const testRegex = new RegExp(`(${words.join("|")})`, "i"); // no "g"

  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode(node) {
        const parent = node.parentElement;
        if (!parent) return NodeFilter.FILTER_REJECT;

        if (!isVisible(parent)) return NodeFilter.FILTER_REJECT;

        if (
          parent.closest("script, style, noscript, mark") ||
          !node.textContent.trim()
        ) {
          return NodeFilter.FILTER_REJECT;
        }

        return testRegex.test(node.textContent)
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_REJECT;
      }
    }
  );

  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);

  nodes.forEach(textNode => {
    const frag = document.createDocumentFragment();
    let lastIndex = 0;

    textNode.textContent.replace(searchRegex, (match, _, offset) => {
      frag.appendChild(
        document.createTextNode(textNode.textContent.slice(lastIndex, offset))
      );

      const mark = document.createElement("mark");
      mark.className = "__mwf";
      mark.textContent = match;
      frag.appendChild(mark);

      matches.push(mark);
      lastIndex = offset + match.length;
    });

    frag.appendChild(
      document.createTextNode(textNode.textContent.slice(lastIndex))
    );

    textNode.replaceWith(frag);
  });
};

/* ---------- navigation ---------- */
const updateCounter = () => {
  chrome.runtime.sendMessage({
    action: "updateCounter",
    current: matches.length ? currentIndex + 1 : 0,
    total: matches.length
  });
};

const scrollToCurrent = () => {
  if (!matches.length) return;

  matches.forEach(m => m.classList.remove("__active"));

  currentIndex = (currentIndex + matches.length) % matches.length;
  const current = matches[currentIndex];

  current.classList.add("__active");
  current.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });

  updateCounter();
};

/* ---------- messages ---------- */
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.action === "find") {
    highlightWords(msg.words);
    if (matches.length) {
      currentIndex = 0;
      scrollToCurrent();
    }
  }

  if (msg.action === "next") {
    currentIndex++;
    scrollToCurrent();
  }

  if (msg.action === "prev") {
    currentIndex--;
    scrollToCurrent();
  }
});