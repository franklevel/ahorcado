export function addClassesTo(elements: HTMLElement[], klasses: string[]) {
  /* return elements.map((el: HTMLElement) => {
    klasses.map((klass: string) => el.classList.add(klass));
  }); */
}

export function removeClassesFrom(elements: HTMLElement[], klasses: string[]) {
  return elements.map((el: HTMLElement) => {
    klasses.map((klass: string) => el.classList.remove(klass));
  });
}

export function changeClass(element: HTMLElement, from: string, to: string) {
  element.classList.remove(from);
  return element.classList.add(to);
}

export default {
  Utils: {
    addClassesTo,
    removeClassesFrom,
    changeClass,
  },
};
