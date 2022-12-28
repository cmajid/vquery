import { calculateStyle, getElement } from "./helper.js";

export default function vQuery(selector) {
  if (!(this instanceof vQuery)) return new vQuery(selector);
  this.elements = getElement(selector);
}

vQuery.prototype.find = function (selector) {
  this.elements = getElement(selector);
  return this;
};

vQuery.prototype.next = function () {
  this.elements = [this.elements[0].nextElementSibling];
  return this;
};

vQuery.prototype.prev = function () {
  this.elements = [this.elements[0].previousElementSibling];
  return this;
};

vQuery.prototype.parent = function () {
  this.elements = [this.elements[0].parentElement];
  return this;
};

vQuery.prototype.children = function () {
  this.elements = [this.elements[0].parentElement];
  return this;
};

vQuery.prototype.html = function (content) {
  // return value of selected element
  if (content === undefined) {
    if (this.elements.length == 1) return this.elements[0].innerHTML;
    return [...this.elements].map((item) => {
      return item.innerHTML;
    });
  }

  // set value for selected element
  if (this.elements.length == 1) return (this.elements[0].innerHTML = content);
  return [...this.elements].map((item) => {
    return (item.innerHTML = content);
  });
};

vQuery.prototype.css = function (style, value) {
  // return value of selected elements
  if (value === undefined) {
    if (this.elements.length === 1)
      return calculateStyle(this.elements[0], style);

    let values = [];
    this.elements.forEach((element) => {
      values.push(calculateStyle(element, style));
    });
    return values;
  }

  // set value for selected elements
  this.elements.forEach((element) => {
    element.style[style] = value;
  });

  // return {this} keyword for fluent writing codes.
  return this;
};

vQuery.prototype.attr = function (attribute, value) {
  // return value of selected elements
  if (value === undefined) {
    if (this.elements.length === 1)
      return this.elements[0].attributes[attribute].value;

    let values = [];
    this.elements.forEach((element) => {
      values.push(element.attributes[attribute].value);
    });
    return values;
  }

  // set value for selected elements
  this.elements.forEach((element) => {
    if (!element.attributes[attribute]) {
      element.setAttribute(attribute, value);
      return;
    }
    element.attributes[attribute].value = value;
  });

  // return {this} keyword for fluent writing codes.
  return this;
};

vQuery.prototype.addClass = function (className) {
  // set value for selected elements
  this.elements.forEach((element) => {
    element.classList.add(className);
  });

  // return {this} keyword for fluent writing codes.
  return this;
};

vQuery.prototype.removeClass = function (className) {
  // set value for selected elements
  this.elements.forEach((element) => {
    element.classList.remove(className);
  });

  // return {this} keyword for fluent writing codes.
  return this;
};

vQuery.prototype.click = function (callback) {
  // set value for selected elements
  this.elements.forEach((element) => {
    element.addEventListener("click", callback);
  });

  // return {this} keyword for fluent writing codes.
  return this;
};
