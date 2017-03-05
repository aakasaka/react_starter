
interface Array<T> {
    firstOr(callbackfn: (element : T) => boolean, defaultValue : T) : T;
    minOr(callbackfn: (element : T) => number, defaultValue : number) : number;
    maxOr(callbackfn: (element : T) => number, defaultValue : number) : number;
}

Array.prototype.firstOr = function<T>(callbackfn: (element : T) => boolean, defaultValue : T) {
    this.forEach((e : T) => {
        if (callbackfn(e)) return e;
    });
    return defaultValue;
}


Array.prototype.minOr = function<T>(callbackfn: (element : T) => number, defaultValue : number) {

    let rtn : number;

    this.forEach((e : T) => {
        const tmp = callbackfn(e);
        if (rtn == null || tmp < rtn) rtn = tmp;
    });

    return rtn == null ? defaultValue : rtn;
}

Array.prototype.maxOr = function<T>(callbackfn: (element : T) => number, defaultValue: number) {

    let rtn : number;

    this.forEach((e : T) => {
        const tmp = callbackfn(e);
        if (rtn == null || rtn < tmp) rtn = tmp;
    });

    return rtn == null ? defaultValue : rtn;
}
