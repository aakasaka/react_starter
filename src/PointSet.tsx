export class PointSet {

    private readonly points : Array<{ row : number, clm : number}>;

    constructor(points : Array<{ row : number, clm : number}>) {
        if (points == null) {
            this.points = new Array();
        } else {
            this.points = points;
        }
    }

    contains(row : number, clm : number) : boolean {
        return this.points.some(p => p.row === row && p.clm === clm);
    }
}