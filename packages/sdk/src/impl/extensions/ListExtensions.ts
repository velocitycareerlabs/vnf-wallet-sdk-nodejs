Array.prototype.toJsonArray = function <T>(): T[] {
    const retVal: T[] = [];
    this.forEach((item: T) => {
        retVal.push(item);
    });
    return retVal;
};

export {};