"use strict";

// =require ../core/config/js/index.js
// =require ../core/lib/js/index.js
var slider = document.getElementById('slider');
var input0 = document.getElementById('input-with-keypress-0');
var input1 = document.getElementById('input-with-keypress-1');
var inputs = [input0, input1];
var moneyFormat = wNumb({
  decimals: 0,
  thousand: ",",
  postfix: "$"
});
noUiSlider.create(slider, {
  start: [100, 8000],
  connect: true,
  tooltips: [false, true],
  range: {
    'min': 0,
    'max': 9999
  },
  format: moneyFormat
});
slider.noUiSlider.on('update', function (values, handle) {
  inputs[handle].value = values[handle];
});
inputs.forEach(function (input, handle) {
  input.addEventListener('change', function () {
    slider.noUiSlider.setHandle(handle, this.value);
  });
  input.addEventListener('keydown', function (e) {
    var values = slider.noUiSlider.get();
    var value = Number(values[handle]);
    var steps = slider.noUiSlider.steps();
    var step = steps[handle];
    var position;

    switch (e.which) {
      case 13:
        slider.noUiSlider.setHandle(handle, this.value);
        break;

      case 38:
        position = step[1];

        if (position === false) {
          position = 1;
        }

        if (position !== null) {
          slider.noUiSlider.setHandle(handle, value + position);
        }

        break;

      case 40:
        position = step[0];

        if (position === false) {
          position = 1;
        }

        if (position !== null) {
          slider.noUiSlider.setHandle(handle, value - position);
        }

        break;
    }
  });
});
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