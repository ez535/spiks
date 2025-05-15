// =require ../core/config/js/index.js
// =require ../core/lib/js/index.js
window.onload = function () {
  slideMin();
  slideMax();
};

const minVal = document.querySelector(".range__min");
const maxVal = document.querySelector(".range__max");
const priceInputMin = document.querySelector(".input-wrap__min");
const priceInputMax = document.querySelector(".input-wrap__max");
const maxTooltip = document.querySelector(".tooltip_max");
const minGap = 0;
const range = document.querySelector(".range__track");
const sliderMinValue = parseInt(minVal.min);
const sliderMaxValue = parseInt(maxVal.max);

function slideMin() {
  let gap = parseInt(maxVal.value) - parseInt(minVal.value);
  if( gap <= minGap ) {
    minVal.value = parseInt(maxVal.value) - minGap;
  }

  priceInputMin.value = minVal.value;
  setArea();
}

function slideMax() {
  let gap = parseInt(maxVal.value) - parseInt(minVal.value);
  if( gap <= minGap ) {
    maxVal.value = parseInt(minVal.value) + minGap;
  }

  maxTooltip.innerHTML = maxVal.value + '$';
  priceInputMax.value = maxVal.value;
  setArea();
}

function setArea() {
  range.style.left = `${((minVal.value - sliderMinValue) / (sliderMaxValue - sliderMinValue)) * 100}%`;

  range.style.right = `${100 - ((maxVal.value - sliderMinValue) / (sliderMaxValue - sliderMinValue)) * 100 }%`;
  maxTooltip.style.right = 100 - (maxVal.value / sliderMaxValue) * 100 + "%";
}

function setMinInput() {
  let minPrice = parseInt(priceInputMin.value);
  if(minPrice < sliderMinValue) {
    priceInputMin.value = sliderMinValue;
  }

  minVal.value = priceInputMin.value;
  slideMin();
}

function setMaxInput() {
  let maxPrice = parseInt(priceInputMax.value);
  if(maxPrice > sliderMaxValue) {
    priceInputMax.value = sliderMaxValue;
  }
  maxVal.value = priceInputMax.value;
  slideMax();
}

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