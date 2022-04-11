/**
 * Class to manage hover then click on touch devices
 */
export default class DoubleTapToGo {

  constructor(selector, className = 'hover') {
    //@formatter:off
    if (!('ontouchstart' in window) && !navigator.msMaxTouchPoints && !navigator.userAgent.toLowerCase().match(/windows phone os 7/i)) {
      return false;
    }
    //@formatter:on

    document.querySelectorAll(selector).forEach(tapHover => {
      tapHover.addEventListener('click', function (e) {
        const tapHover = this;

        if (tapHover.classList.contains(className)) {
          return true;
        } else {
          const tapHovers = [...document.querySelectorAll(selector)];

          tapHover.dispatchEvent(new Event('touchDeviceHover'));
          tapHover.classList.add(className);
          tapHovers.filter(element => {
            if (element !== tapHover) {
              element.dispatchEvent(new Event('touchDeviceOut'));
              element.classList.remove(className);
            }
          });

          e.preventDefault();
          return false;
        }
      });
    });
  }

}