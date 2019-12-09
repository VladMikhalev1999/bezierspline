function draw_text(context, points) {
	    	for (let i = 0; i < points.length; i++) {
	    		let point = points[i];
			context.strokeStyle = "yellow";
			context.strokeText(i + 1, point.x + 3, point.y + 10);
	  	}
	    }
            function draw_point(context, point, size = "6") {
                context.fillRect(point.x, point.y, size * 2, size * 2);
                context.stroke();
            }
            function redraw(context, points, ln) {
                canvas.width = canvas.width;
                lineToAll(context, points);
                draw_beziers(context, points, ln);
                points.forEach(p => { draw_point(context, p) });
		draw_text(context, points);
            }
            function lineToAll(context, points) {
                context.beginPath();
                context.strokeStyle = "red";
                context.moveTo(points[0].x + 5, points[0].y + 5);
                for (let i = 1; i < points.length; i++) {
                    context.lineTo(points[i].x + 5, points[i].y + 5);
                }
                context.stroke();
            }
            let fact = [1, 1, 2, 6, 24, 120, 720, 5040];
            function cni(n, i) {
                return fact[n] / fact[i] / fact[n - i];
            }
            function jnit(n, i, t) {
                return cni(n, i) * Math.pow(t, i) * Math.pow(1 - t, n - i);
            }
            function draw_beziers(context, points, ln) {
                let n = points.length - 1;
                let dt = 1 / ln;
                let t = 0.0;
                context.beginPath();
                context.moveTo(points[0].x + 5, points[0].y + 5);
                for (let k = 0; k < ln; k++) {
                    t += dt;
                    let x = 0, y = 0;
                    for (let i = 0; i < points.length; i++) {
                        let w = jnit(n, i, t);
                        x += points[i].x * w;
                        y += points[i].y * w;
                    }
                    context.strokeStyle = "blue";
                    context.lineTo(x + 5, y + 5);
                }
                context.stroke();
            }
            function add() {
                if (points.length <= 7) {
                    let nx = Math.floor(Math.random() * (canvas.width - canvas.offsetLeft) + canvas.offsetLeft);
                    let ny = Math.floor(Math.random() * (canvas.height - canvas.offsetTop) + canvas.offsetTop);
                    points.push({x: nx, y: ny});
                    redraw(context, points, ln);
                }
            }
            function remove() {
                if (points.length >= 3) {
                    points.pop();
                    redraw(context, points, ln);
                }
            }

function beziers_process_function(canvas, context) {
            let mx = 0, my = 0;
            let pIndex = -1;
            canvas.addEventListener("mousedown", e => {
                mx = e.pageX - canvas.offsetLeft;
                my = e.pageY - canvas.offsetTop;
                let pt = points.findIndex(p => {
                    if (mx >= p.x && mx <= p.x + 10) {
                        if (my >= p.y && my <= p.y + 10) {
                            return true;
                        }
                    }
                    return false;
                });
                pIndex = pt;
            });
            canvas.addEventListener("mousemove", e => {
                if (pIndex != -1) {
                    mx = e.pageX - canvas.offsetLeft;
                    my = e.pageY - canvas.offsetTop;
                    points[pIndex].x = mx;
                    points[pIndex].y = my;
                    redraw(context, points, ln);
                }
            });
            canvas.addEventListener("mouseup", e => {
                pIndex = -1;
            })
            let ln = 128;
            let points = [
                {x: 100, y: 100},
                {x: 700, y: 100},
                {x: 900, y: 400},
            ];
            lineToAll(context, points);
            draw_beziers(context, points, ln);
            points.forEach(p => { draw_point(context, p); });
			draw_text(context, points);
}
