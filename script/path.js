/*jshint globalstrict:true, sub:true*/
/*global Z*/
'use strict';

/**
 * @constructor
 */
Z.Path = function() {
    this.points = [];
    this.drawCurve.apply(this, arguments);
};

Z.Path.prototype.drawCurve = function() {
    var arg0, argn;

    arg0 = arguments[0];
    argn = arguments[arguments.length - 1];

    for (var i = 0, m = arguments.length; i < m; i++) {
        this.plotBezierQuad(
            arguments[i - 1] || arg0,
            arguments[i + 0] || arg0,
            arguments[i + 1] || argn,
            arguments[i + 2] || argn
        );
    }
};

Z.Path.prototype.getControlPoints = function(P0, P1, P2) {
    var dx1, dy1, dx2, dy2, l1, l2, m1, m2, dxm, dym, k, cm, tx, ty, c1, c2;

    dx1 = P0.x - P1.x;
    dy1 = P0.y - P1.y;
    dx2 = P1.x - P2.x;
    dy2 = P1.y - P2.y;

    l1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
    l2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

    m1 = {x: (P0.x + P1.x) / 2, y: (P0.y + P1.y) / 2};
    m2 = {x: (P1.x + P2.x) / 2, y: (P1.y + P2.y) / 2};

    dxm = (m1.x - m2.x);
    dym = (m1.y - m2.y);

    k = l2 / (l1 + l2);

    cm = new Z.Point(m2.x + dxm * k, m2.y + dym * k);

    tx = P1.x - cm.x;
    ty = P1.y - cm.y;

    c1 = new Z.Point(m1.x + tx, m1.y + ty);
    c2 = new Z.Point(m2.x + tx, m2.y + ty);

    return {
        c1: c1,
        c2: c2,
        l1: Math.floor(l1),
        l2: Math.floor(l2)
    };
};

Z.Path.prototype.plotBezierQuad = function(P0, P1, P2, P3) {
    var step, C1, C2, ctr, p1, p2, p3, p4, ss, ss2, ss3, pre1, pre2, pre4, pre5,
        tmp1x, tmp1y, tmp2x, tmp2y, pf, dfx, dfy, ddfx, ddfy, dddfx, dddfy;

    step = Z.settings.step;

    C1 = this.getControlPoints(P0, P1, P2);
    C2 = this.getControlPoints(P1, P2, P3);

    ctr = Math.floor(( (C1.l1 || C1.l2) + (C2.l2 || C2.l1) ) / step);

    pf = P1;
    p1 = P1;
    p2 = C1.c2;
    p3 = C2.c1;
    p4 = P2;

    ss = 1 / (ctr + 1);
    ss2 = ss * ss;
    ss3 = ss2 * ss;

    pre1 = 3 * ss;
    pre2 = 3 * ss2;
    pre4 = 6 * ss2;
    pre5 = 6 * ss3;

    tmp1x = p1.x - p2.x * 2 + p3.x;
    tmp1y = p1.y - p2.y * 2 + p3.y;
    tmp2x = (p2.x - p3.x) * 3 - p1.x + p4.x;
    tmp2y = (p2.y - p3.y) * 3 - p1.y + p4.y;

    dfx = (p2.x - p1.x) * pre1 + tmp1x * pre2 + tmp2x * ss3;
    dfy = (p2.y - p1.y) * pre1 + tmp1y * pre2 + tmp2y * ss3;

    ddfx = tmp1x * pre4 + tmp2x * pre5;
    ddfy = tmp1y * pre4 + tmp2y * pre5;
    dddfx = tmp2x * pre5;
    dddfy = tmp2y * pre5;

    while (ctr--) {
        pf = new Z.Point(pf.x + dfx, pf.y + dfy);

        dfx += ddfx;
        dfy += ddfy;
        ddfx += dddfx;
        ddfy += dddfy;

        this.points.push(pf);
    }

    this.points.push(p4);
};
