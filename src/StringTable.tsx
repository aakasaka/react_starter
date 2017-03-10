export class StringTable {

    coreArray : string[][];

    constructor(rowCount : number, columnCount : number);
    constructor(coreArray : string[][]);
    constructor(arg1 : (number | string[][]), arg2? : number) {
        if (typeof(arg1) == "number") {
            const rowCount = arg1 as number;
            const clmCount = arg2.valueOf();

            this.coreArray = new Array<string[]>(rowCount);
            for (let ri = 0; ri < rowCount; ri++) {
                const row = new Array(clmCount);
                for (let ci = 0; ci < clmCount; ci++) {
                    row[ci] = null;
                }
                this.coreArray[ri] = row;
            }

        } else {
            this.coreArray = arg1 as string[][];
            if (this.coreArray == null) throw TypeError("coreArrayの型が不正です");

            if (this.coreArray.length > 0) {
                var clmLen = this.coreArray[0].length;
                if (this.coreArray.some(r => r.length !== clmLen)) {
                    //TODO throw some error.
                }
            }
        }
    }

    NewUpdatedTable(rowIndex : number, columnIndex : number, value : string) {

        var newArray = this.coreArray.slice();
        var row = newArray[rowIndex].slice();
        row[columnIndex] = value;
        newArray[rowIndex] = row;
        
        return new StringTable(newArray);
    }

    GetValue(rowIndex : number, columnIndex : number) {
        return this.coreArray[rowIndex][columnIndex];
    }

    get rowCount() : number {
        return this.coreArray.length;
    }
    get columnCount() : number {
        
        if (this.coreArray.length === 0) return 0;
        return this.coreArray[0].length;
    }

    sliceRow(rowIndex : number) {
        return this.coreArray[rowIndex].slice();
    }
    sliceColumn(columnIndex : number) {
        return this.coreArray.map(r => r[columnIndex]);
    }

}