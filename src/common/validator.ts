class Validator {
  constructor() {
    throw new Error("Validation error");
  }

  hasItems(list: any) {
    if (list.length < 1) {
      throw new Error(" has not items");
    }
  }
}
