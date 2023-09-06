export {};

Date.prototype.addDaysToNow = function (days: number): Date {
    this.setUTCDate(this.getUTCDate() + days);
    return this;
};

Date.prototype.equalsTo = function (date: Date): Boolean {
    let selfCopy = new Date(
        Date.UTC(this.getUTCFullYear(), this.getUTCMonth(), this.getUTCDate())
    );
    let check = new Date(
        Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
    );
    return selfCopy === check;
};
