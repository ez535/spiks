// =require ../core/config/js/index.js
// =require ../core/lib/js/index.js

let slider = document.getElementById('slider');
let input0 = document.getElementById('input-with-keypress-0');
let input1 = document.getElementById('input-with-keypress-1');
let inputs = [input0, input1];

let moneyFormat = wNumb({
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
    let values = slider.noUiSlider.get();
    let value = Number(values[handle]);
    let steps = slider.noUiSlider.steps();
    let step = steps[handle];
    let position;

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

const dropDownTitleAll = document.querySelectorAll('.dropdown__title');
dropDownTitleAll.forEach((item) => {
  item.addEventListener('click', () => {
    item.classList.toggle('click');
  })
})

const dropDownCheckboxes = document.querySelectorAll('.dropdown__checkbox');
const badgesList = document.querySelector('.badges');
dropDownCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener('change', function() {
    const checkboxValue = this.value;

    if(this.checked) {
      const badge = document.createElement('li');
      badge.classList.add('badges__item');
      badgesList.appendChild(badge);
      const badgeName = document.createElement('span');
      badgeName.classList.add('badges__name');
      badge.appendChild(badgeName);
      badgeName.textContent = checkboxValue;
      const badgeClose = document.createElement('button');
      badgeClose.classList.add('badges__btn');
      badge.appendChild(badgeClose);

      badgeClose.addEventListener('click', () => {
        badgesList.removeChild(badge);

        dropDownCheckboxes.forEach(cb => {
          if (cb.value === checkboxValue) {
            cb.checked = false;
          }
        });
      })
    } else {
      const badgesItem = document.querySelectorAll('.badges__item');
      badgesItem.forEach((badge) => {
        if (badge.textContent === checkboxValue) {
          badgesList.removeChild(badge);
        }
      })
    }
  })
})