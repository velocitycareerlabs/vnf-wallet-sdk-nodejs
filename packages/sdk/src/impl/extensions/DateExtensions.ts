Date.prototype.addDaysToNow = function (days: number): Date {
    this.setUTCDate(this.getUTCDate() + days);
    return this;
};

Date.prototype.equalsTo = function (date: Date): boolean {
    const selfCopy = new Date(
        Date.UTC(this.getUTCFullYear(), this.getUTCMonth(), this.getUTCDate())
    );
    const check = new Date(
        Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
    );
    return selfCopy === check;
};

export {};
