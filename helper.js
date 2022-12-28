function getElement(selector) {
  if (!selector) return this;

  let elements = null;
  if (typeof selector === "string") {
    elements = document.querySelectorAll(selector);
  } else {
    elements = innerSelector;
  }

  return elements;
}

function calculateStyle(element, style) {
  let computedStyle = getComputedStyle(element);
  let findedStyle = computedStyle.getPropertyValue(style);
  return findedStyle;
}

export { getElement, calculateStyle };
