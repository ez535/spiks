"use strict";

// =require ../core/config/js/index.js
// =require ../core/lib/js/index.js
window.onload = function () {
  slideMin();
  slideMax();
};

var minVal = document.querySelector(".range__min");
var maxVal = document.querySelector(".range__max");
var priceInputMin = document.querySelector(".input-wrap__min");
var priceInputMax = document.querySelector(".input-wrap__max");
var maxTooltip = document.querySelector(".tooltip_max");
var minGap = 0;
var range = document.querySelector(".range__track");
var sliderMinValue = parseInt(minVal.min);
var sliderMaxValue = parseInt(maxVal.max);

function slideMin() {
  var gap = parseInt(maxVal.value) - parseInt(minVal.value);

  if (gap <= minGap) {
    minVal.value = parseInt(maxVal.value) - minGap;
  }

  priceInputMin.value = minVal.value;
  setArea();
}

function slideMax() {
  var gap = parseInt(maxVal.value) - parseInt(minVal.value);

  if (gap <= minGap) {
    maxVal.value = parseInt(minVal.value) + minGap;
  }

  maxTooltip.innerHTML = maxVal.value + '$';
  priceInputMax.value = maxVal.value;
  setArea();
}

function setArea() {
  range.style.left = "".concat((minVal.value - sliderMinValue) / (sliderMaxValue - sliderMinValue) * 100, "%");
  range.style.right = "".concat(100 - (maxVal.value - sliderMinValue) / (sliderMaxValue - sliderMinValue) * 100, "%");
  maxTooltip.style.right = 100 - maxVal.value / sliderMaxValue * 100 + "%";
}

function setMinInput() {
  var minPrice = parseInt(priceInputMin.value);

  if (minPrice < sliderMinValue) {
    priceInputMin.value = sliderMinValue;
  }

  minVal.value = priceInputMin.value;
  slideMin();
}

function setMaxInput() {
  var maxPrice = parseInt(priceInputMax.value);

  if (maxPrice > sliderMaxValue) {
    priceInputMax.value = sliderMaxValue;
  }

  maxVal.value = priceInputMax.value;
  slideMax();
}

var dropDownTitleAll = document.querySelectorAll('.dropdown__title');
dropDownTitleAll.forEach(function (item) {
  item.addEventListener('click', function () {
    item.classList.toggle('click');
  });
});
var dropDownCheckboxes = document.querySelectorAll('.dropdown__checkbox');
var badgesList = document.querySelector('.badges');
dropDownCheckboxes.forEach(function (checkbox) {
  checkbox.addEventListener('change', function () {
    var checkboxValue = this.value;

    if (this.checked) {
      var badge = document.createElement('li');
      badge.classList.add('badges__item');
      badgesList.appendChild(badge);
      var badgeName = document.createElement('span');
      badgeName.classList.add('badges__name');
      badge.appendChild(badgeName);
      badgeName.textContent = checkboxValue;
      var badgeClose = document.createElement('button');
      badgeClose.classList.add('badges__btn');
      badge.appendChild(badgeClose);
      badgeClose.addEventListener('click', function () {
        badgesList.removeChild(badge);
        dropDownCheckboxes.forEach(function (cb) {
          if (cb.value === checkboxValue) {
            cb.checked = false;
          }
        });
      });
    } else {
      var badgesItem = document.querySelectorAll('.badges__item');
      badgesItem.forEach(function (badge) {
        if (badge.textContent === checkboxValue) {
          badgesList.removeChild(badge);
        }
      });
    }
  });
});