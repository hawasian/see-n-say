var choices = [];
var enable;
var colors = ['#F01916', '#f23910', '#f5590b', '#f87905', '#FB9900', '#f9ae00', '#f7c300', '#f5d800', '#F3EE00', '#b6d911', '#7ac422', '#3daf33', '#019B45', '#0e885d', '#1c7675', '#29638d', '#3751A6', '#5b42a0'];
var animals = ["Chicken", "Horse", "Cat"];
var animal_image = [
    "http://www.clipartlord.com/wp-content/uploads/2014/08/chicken3.png",
    "http://www.icon2s.com/wp-content/uploads/2014/06/animal-icon-horse.png",
    "http://www.icon2s.com/wp-content/uploads/2014/06/animal-icon-black-cat.png",
];
var wrapper = "#wrap";
var handle = "#handle";
var canvas = "#canvas";
var arrow = "#arrow";
var aspect = .85;
var n = 0;

var fontVar = "Bowlby One";

$(document).ready(function() {
    choices = [];
    $('#add-input').focus();
    resizeCanvas();
    enable = true;
});
$(window).resize(function() {
    resizeCanvas();
});
document.getElementById("add-input").addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode == 13) {
        document.getElementById("add").click();
    }
});
$("#add").click(function() {
    if (validate()) {
        choices.push($('#add-input').val());
        updateList();
        $('#add-input').val("").focus();
    }
    else {
        $('#add-input').focus();
    }
});
$("#click-face").click(function() {
    pullHandle();
    if (choices.length > 0 && enable) {
        var out = Spin(n);
        n = out[0]
        setTimeout(function() {
            enable = true;
            var cu = colors.length / choices.length;
            var i = Math.floor((n % 360) / (360 / choices.length));
            var color = colors[Math.floor(i * cu)];
            var ai = Math.floor(Math.random() * animals.length);
            $("#answer").html(choices[i]);
            $("#animal").html(animals[ai]);
            $("#animalpic").css({
                "background-color": color,
                "border-color": color,
                "background-image":"url("+animal_image[ai]+")"
            })
            $('#modal').modal('show');
            //alert(choices[Math.floor((n%360)/(360/choices.length))]);
        }, (out[1]));

    }

});

function validate() {
    return $('#add-input').val().length > 0 ? true : false;
}

function pullHandle() {
    $("#handle").css({
        "transform": "rotate(15deg)",
        "transition": "transform .5s"
    });
    setTimeout(function() {
        $("#handle").css({
            "transform": "rotate(0deg)",
            "transition": "transform 1.5s",
            "transition-timing-function": "ease-out"
        });
    }, 750);
}

function Spin(n) {
    enable = false;
    var spin = (Math.floor(Math.random() * 2) + 5) * 360 + Math.floor(Math.random() * 360);
    var spintime = (spin / 500);
    n += spin;
    setTimeout(function() {
        $("#arrow").css({
            "transform": "rotate(" + n + "deg)",
            "transition": "transform " + spintime + "s"
        });
    }, 450);
    setTimeout(function() {
        enable = true;
    }, (spintime * 1000 + 450));
    return [n, spintime * 1000 + 450];
}

function updateList() {
    var output = "";
    var cu = colors.length / choices.length;
    for (var i = 0; i < choices.length; i++) {
        var color = colors[Math.floor(i * cu)];
        output += '<li class="list-group-item" onclick="remove(' + i + ')" style="background:' + color + ';">';
        output += '<span class="label label-default choice">' + choices[i] + '</span>';
        output += '<span class="delete"> <i class="fa fa-ban" aria-hidden="true"></i> &nbsp;&nbsp;&nbsp; Remove </span>';
        output += '</li>';
        //output += '<button id="remove" class="btn btn-default" onclick="remove('+i+')">-</button>\n';
    }
    resizeCanvas();
    $('#el-list').html(output);
}

function remove(n) {
    choices.splice(n, 1);
    updateList();
}

function resize(id, ratio) {
    $(id).height($(id).width() * ratio);
}

function resizeCanvas() {
    resize(wrapper, aspect);
    $(".scrollbar").height($("#wrap").height() - $("#el-head").outerHeight());
    drawHandle(handle);
    drawSpinner(canvas);
    drawArrowFace("#arrow-face")
    drawArrow(arrow);
}

function drawHandle(canvas) {
    var output = '';
    var margin = .1;
    var width = $(canvas).width();
    var height = $(canvas).height();
    var max = (width > height) ? height - (height * margin) : width - (width * margin);
    var u = max * margin;
    output += '<filter id="f3" x="-1" y="-1" width="300%" height="300%">';
    output += '<feOffset result="offOut" in="SourceGraphic" dx="-3" dy="3" />';
    output += '<feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="10" />';
    output += '<feBlend in="SourceGraphic" in2="blurOut" mode="normal" />';
    output += '</filter>';

    output += '<filter id="innershadow" x0="-50%" y0="-50%" width="200%" height="200%">';
    output += '<feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur"></feGaussianBlur>';
    output += '<feOffset dy="2" dx="3"></feOffset>';
    output += '<feComposite in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="shadowDiff"></feComposite>';

    output += '<feFlood flood-color="#444444" flood-opacity="0.75"></feFlood>';
    output += '<feComposite in2="shadowDiff" operator="in"></feComposite>';
    output += '<feComposite in2="SourceGraphic" operator="over" result="firstfilter"></feComposite>';


    output += '<feGaussianBlur in="firstfilter" stdDeviation="7" result="blur2"></feGaussianBlur>';
    output += '<feOffset dy="-2" dx="-3"></feOffset>';
    output += '<feComposite in2="firstfilter" operator="arithmetic" k2="-1" k3="1" result="shadowDiff"></feComposite>';

    output += '<feFlood flood-color="#444444" flood-opacity="0.75"></feFlood>';
    output += '<feComposite in2="shadowDiff" operator="in"></feComposite>';
    output += '<feComposite in2="firstfilter" operator="over"></feComposite>';
    output += '</filter>';

    var shadowcolor = "#2f4f4f ";

    output += '<rect x=' + (width / 2 - (u / 2)) + ' y=' + (u) + ' width=' + (u) + ' height=' + (max + u) + ' fill="' + shadowcolor + '" transform = "rotate(225 ' + (width / 2) + ' ' + (height / 2) + ')" filter="url(#f3)"/>';
    output += '<circle cx="' + (width - 2 * u) + '" cy="' + (u) + '" r="' + (u * 3 / 4) + '"  fill="' + shadowcolor + '" stroke-width="' + (u / 4) + '" filter="url(#f3)"/>';

    output += '<rect x=' + (width / 2 - (u / 2)) + ' y=' + (u) + ' width=' + (u) + ' height=' + (max + u) + ' fill="#AB4530" transform = "rotate(225 ' + (width / 2) + ' ' + (height / 2) + ')"/>';
    output += '<circle cx="' + (width - 2 * u) + '" cy="' + (u) + '" r="' + (u * 3 / 4) + '" stroke="#AB4530" fill="#C4564A" stroke-width="' + (u / 4) + '" />';
    output += '<circle cx="' + (width - 2 * u) + '" cy="' + (u) + '" r="' + (u * 3 / 4) + '" stroke="none" fill="#C4564A" filter="url(#innershadow)"/>';
    $(canvas).html(output);
}

function drawSpinner(canvas) {
    var output = '';
    var margin = .1;
    var width = $(canvas).width();
    var height = $(canvas).height();
    var max = (width > height) ? height - (height * margin) : width - (width * margin);
    var u = max / 12;

    output += '<defs>';

    output += '<filter id="f2" x="-1" y="-1" width="300%" height="300%">';
    output += '<feOffset result="offOut" in="SourceGraphic" dx="-2" dy="-2" />';
    output += '<feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="15" />';
    output += '<feBlend in="SourceGraphic" in2="blurOut" mode="normal" />';
    output += '</filter>';

    output += '<filter id="f3" x="-1" y="-1" width="300%" height="300%">';
    output += '<feOffset result="offOut" in="SourceGraphic" dx="-5" dy="5" />';
    output += '<feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="10" />';
    output += '<feBlend in="SourceGraphic" in2="blurOut" mode="normal" />';
    output += '</filter>';

    output += '<filter id="innershadow" x0="-50%" y0="-50%" width="200%" height="200%">';
    output += '<feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur"></feGaussianBlur>';
    output += '<feOffset dy="2" dx="3"></feOffset>';
    output += '<feComposite in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="shadowDiff"></feComposite>';

    output += '<feFlood flood-color="#444444" flood-opacity="0.75"></feFlood>';
    output += '<feComposite in2="shadowDiff" operator="in"></feComposite>';
    output += '<feComposite in2="SourceGraphic" operator="over" result="firstfilter"></feComposite>';


    output += '<feGaussianBlur in="firstfilter" stdDeviation="7" result="blur2"></feGaussianBlur>';
    output += '<feOffset dy="-2" dx="-3"></feOffset>';
    output += '<feComposite in2="firstfilter" operator="arithmetic" k2="-1" k3="1" result="shadowDiff"></feComposite>';

    output += '<feFlood flood-color="#444444" flood-opacity="0.75"></feFlood>';
    output += '<feComposite in2="shadowDiff" operator="in"></feComposite>';
    output += '<feComposite in2="firstfilter" operator="over"></feComposite>';
    output += '</filter>';

    output += '</defs>';

    var shadowcolor = "#2f4f4f ";

    output += '<circle cx="' + width / 2 + '" cy="' + height / 2 + '" r="' + max / 2 + '" stroke="none" stroke-width="' + (max * margin / 5) + '" fill="' + shadowcolor + '" filter="url(#f3)"/>' //Drop Shadow
    output += '<path d="';
    output += 'M ' + (margin * max * 2) + ' ' + (height - (margin * max / 2)) + ' ';
    output += 'A ' + ((max - margin * max * 2) / 2) + ' ' + ((max - margin * max * 2) / 2) + ' 0 1 1 ' + (width - (margin * max * 2)) + ' ' + (height - (margin * max / 2)) + ' ';
    output += 'L ' + (width - (margin * max * 3)) + ' ' + (height - (margin * max / 2)) + ' ';
    output += 'A ' + ((max - margin * max * 2) * 2 / 3) + ' ' + ((max - margin * max * 2) * 2 / 3) + ' 0 0 0 ' + ((margin * max * 3)) + ' ' + (height - (margin * max / 2)) + ' '
    output += 'Z "'
    output += 'fill="' + shadowcolor + '" stroke="none" stroke-width="' + (max * margin / 10) + '" filter="url(#f3)"/>';
    output += '<path d="';
    output += 'M ' + (2 * u) + ' ' + (6 * u) + ' ';
    output += 'L ' + (1.75 * u) + ' ' + (3 * u) + ' ';
    output += 'A ' + (2 * u) + ' ' + (u) + ' -45 0 1 ' + (4 * u) + ' ' + (.65 * u) + ' ';
    output += 'L ' + (7 * u) + ' ' + (.85 * u) + ' ';
    output += 'L ' + (6 * u) + ' ' + (2 * u) + ' ';
    output += 'A ' + (2 * u) + ' ' + (1.85 * u) + ' -45 1 0 ' + (3 * u) + ' ' + (4.75 * u) + ' ';
    output += 'z "'
    output += 'fill="' + shadowcolor + '" stroke="none" stroke-width="' + (max * margin / 10) + '" filter="url(#f3)"/>';

    output += '<path d="';
    output += 'M ' + (margin * max * 2) + ' ' + (height - (margin * max / 2)) + ' ';
    output += 'A ' + ((max - margin * max * 2) / 2) + ' ' + ((max - margin * max * 2) / 2) + ' 0 1 1 ' + (width - (margin * max * 2)) + ' ' + (height - (margin * max / 2)) + ' ';
    output += 'L ' + (width - (margin * max * 3)) + ' ' + (height - (margin * max / 2)) + ' ';
    output += 'A ' + ((max - margin * max * 2) * 2 / 3) + ' ' + ((max - margin * max * 2) * 2 / 3) + ' 0 0 0 ' + ((margin * max * 3)) + ' ' + (height - (margin * max / 2)) + ' '
    output += 'Z "'
    output += 'fill="#db6f0a" stroke="#be6009" stroke-width="' + (max * margin / 10) + '" "/>';
    // Legs

    output += '<path d="';
    output += 'M ' + (2 * u) + ' ' + (6 * u) + ' ';
    output += 'L ' + (1.75 * u) + ' ' + (3 * u) + ' ';
    output += 'A ' + (2 * u) + ' ' + (u) + ' -45 0 1 ' + (4 * u) + ' ' + (.65 * u) + ' ';
    output += 'L ' + (7 * u) + ' ' + (.85 * u) + ' ';
    output += 'L ' + (6 * u) + ' ' + (2 * u) + ' ';
    output += 'A ' + (2 * u) + ' ' + (1.85 * u) + ' -45 1 0 ' + (3 * u) + ' ' + (4.75 * u) + ' ';
    output += 'z "'
    output += 'fill="#db6f0a" stroke="#be6009" stroke-width="' + (max * margin / 10) + '" />';

    output += '<circle cx="' + width / 2 + '" cy="' + height / 2 + '" r="' + max / 2 + '" stroke="none" stroke-width="' + (max * margin / 5) + '" fill="#383838" filter="url(#f3)"/> ';
    output += '<circle cx="' + width / 2 + '" cy="' + height / 2 + '" r="' + max / 2 + '" stroke="#f47c0d" stroke-width="' + (max * margin / 5) + '" fill="#f6973e"/> '; //Orange Circle
    output += '<circle cx="' + width / 2 + '" cy="' + height / 2 + '" r="' + max * 7 / 15 + '" stroke="#dd700a" stroke-width="' + (max * margin / 5) + '" fill="#DCFAF7" />'; //White Circle
    output += '<circle cx="' + width / 2 + '" cy="' + height / 2 + '" r="' + max * 7 / 15 + '" stroke="none" fill="#DCFAF7"  filter="url(#innershadow)"/>';

    //INSERT ANSWER AREAS HERE
    output += drawSec(choices.length)
        //



    //Spinner Area

    //
    $(canvas).html(output);
}

function drawSec(n) {
    var canvas = "#plate";
    var d = Math.PI / 180;
    var margin = .1;
    var width = $(canvas).width();
    var height = $(canvas).height();
    var max = (width > height) ? height - (height * margin) : width - (width * margin);
    var mx = width / 2;
    var my = height / 2;
    var cu = colors.length / n;
    var output = "";
    output += '<defs>';
    output += '<mask id="Mask">';
    output += '<circle cx="' + width / 2 + '" cy="' + height / 2 + '" r="' + max * 13 / 30 + '" fill="white" />'; //White Circle
    output += '</mask>';
    output += '<path id="top" d="M' + (mx + (max * 1 / 30)) + ' ' + (max * 7 / 30) + ' A ' + (max * 8 / 30) + ' ' + (max * 8 / 30) + ' 0 0 1 ' + (mx) + ' ' + (max * 26 / 30) + ' Z" fill="green"/>';
    output += '<path id="btm" d="M' + (mx + (max * 1 / 30)) + ' ' + (max * 4 / 30) + ' A ' + (max * 12 / 30) + ' ' + (max * 12 / 30) + ' 0 1 0 ' + (mx) + ' ' + (max * 29 / 30) + ' Z" fill="green"/>';
    output += '<filter id="glow">';
    output += '<feGaussianBlur stdDeviation="15" result="coloredBlur"/>';
    output += '<feMerge>';
    output += '<feMergeNode in="coloredBlur"/>';
    output += '<feMergeNode in="SourceGraphic"/>';
    output += '</feMerge>';
    output += '</filter>';
    output += '</defs>';

    if (n === 0) {
        output += '<text font-family="' + fontVar + '" font-size = "' + (max * .1) + '" >';
        output += '<textPath xlink:href = "#top" startOffset="-1%">';
        output += 'Please Add Your';
        output += '</textPath>';
        output += '</text>';
        output += '<text font-family="' + fontVar + '" font-size = "' + (max * .1) + '" letter-spacing="4" >';
        output += '<textPath xlink:href = "#btm" startOffset="6%">';
        output += 'Answer Choices';
        output += '</textPath>';
        output += '</text>';
    }

    if (n == 1) {
        output += '<rect height="' + height + '" width="' + width + '" fill="' + colors[0] + '" mask="url(#Mask)"/>';
    }
    if (n == 2) {
        $('#plate').css({
            "transform": "rotate(180deg)",
        });
        output += '<rect height="' + height + '" width="' + width + '" fill="' + colors[0] + '" mask="url(#Mask)"/>';
        output += '<rect x="' + width / 2 + '" height="' + height + '" width="' + width + '" stroke="#DCFAF7" stroke-width="5" fill="' + colors[Math.floor(cu)] + '" mask="url(#Mask)"/>';
    }
    else {
        var unit = (360 / n) * (Math.PI / 180);
        $('#plate').css({
            "transform": "rotate(-90deg)",
        });
        for (var i = 0; i < n; i++) {
            output += '<polygon points="' + (mx) + ',' + (my) + ' ' + (Math.cos(i * unit) * max + mx) + ',' + (Math.sin(i * unit) * max + my) + ' ' + (Math.cos((i + 1) * unit) * max + mx) + ',' + (Math.sin((i + 1) * unit) * max + my) + '" fill="' + colors[Math.floor(i * cu)] + '" stroke="#DCFAF7" stroke-width="5" mask="url(#Mask)"/>';
        }
    }
    output += '<circle cx="' + width / 2 + '" cy="' + height / 2 + '" r="' + max * 17 / 64 + '" stroke="none" fill="#fdfd96" filter="url(#glow)"/>';
    $(canvas).html(output);

}

function drawArrowFace(canvas) {
    var margin = .1;
    var width = $(canvas).width();
    var height = $(canvas).height();
    var max = (width > height) ? height - (height * margin) : width - (width * margin);
    var output = '';
    output += '<defs>';
    output += '<filter id="innershadow" x0="-50%" y0="-50%" width="200%" height="200%">';
    output += '<feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur"></feGaussianBlur>';
    output += '<feOffset dy="2" dx="3"></feOffset>';
    output += '<feComposite in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="shadowDiff"></feComposite>';

    output += '<feFlood flood-color="#444444" flood-opacity="0.75"></feFlood>';
    output += '<feComposite in2="shadowDiff" operator="in"></feComposite>';
    output += '<feComposite in2="SourceGraphic" operator="over" result="firstfilter"></feComposite>';


    output += '<feGaussianBlur in="firstfilter" stdDeviation="1" result="blur2"></feGaussianBlur>';
    output += '<feOffset dy="-2" dx="-3"></feOffset>';
    output += '<feComposite in2="firstfilter" operator="arithmetic" k2="-1" k3="1" result="shadowDiff"></feComposite>';

    output += '<feFlood flood-color="#444444" flood-opacity="0.75"></feFlood>';
    output += '<feComposite in2="shadowDiff" operator="in"></feComposite>';
    output += '<feComposite in2="firstfilter" operator="over"></feComposite>';
    output += '</filter>';
    output += '</defs>';
    output += '<circle cx="' + width / 2 + '" cy="' + height / 2 + '" r="' + max * 4 / 15 + '" stroke="#DCFAF7" stroke-width="' + (max * margin / 5) + '" fill="#AB4530" />'; //White Rim

    output += '<circle cx="' + width / 2 + '" cy="' + height / 2 + '" r="' + max * 17 / 64 + '" stroke="#C4564A" stroke-width="' + (max * margin / 5) + '" fill="#AB4530" />'; //Red Circle
    output += '<circle cx="' + width / 2 + '" cy="' + height / 2 + '" r="' + max * 17 / 64 + '" stroke="none" fill="#AB4530" filter="url(#innershadow)"/>';
    $(canvas).html(output);

}

function drawArrow(canvas) {
    var output = '';
    var margin = .1;
    var width = $(canvas).width();
    var height = $(canvas).height();
    var mx = width / 2;
    var my = height / 2;
    var max = (width > height) ? height - (height * margin) : width - (width * margin);
    var r = (max * 2 / 8) * 13 / 14;
    var u = r / 14;

    output += '<def>';
    output += '<filter id="innershadow" x0="-50%" y0="-50%" width="200%" height="200%">';
    output += '<feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur"></feGaussianBlur>';
    output += '<feOffset dy="2" dx="3"></feOffset>';
    output += '<feComposite in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="shadowDiff"></feComposite>';

    output += '<feFlood flood-color="#444444" flood-opacity="0.75"></feFlood>';
    output += '<feComposite in2="shadowDiff" operator="in"></feComposite>';
    output += '<feComposite in2="SourceGraphic" operator="over" result="firstfilter"></feComposite>';


    output += '<feGaussianBlur in="firstfilter" stdDeviation="7" result="blur2"></feGaussianBlur>';
    output += '<feOffset dy="-2" dx="-3"></feOffset>';
    output += '<feComposite in2="firstfilter" operator="arithmetic" k2="-1" k3="1" result="shadowDiff"></feComposite>';

    output += '<feFlood flood-color="#444444" flood-opacity="0.75"></feFlood>';
    output += '<feComposite in2="shadowDiff" operator="in"></feComposite>';
    output += '<feComposite in2="firstfilter" operator="over"></feComposite>';
    output += '</filter>';

    output += '<filter id="glow">';
    output += '<feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>';
    output += '</filter>';

    output += '</def>';

    output += '<path d="M' + mx + ' ' + (my - r) + ' ';
    output += 'L' + (mx + (2 * r / 3)) + ' ' + (my - (2 * r / 5)) + ' ';
    output += 'L' + (mx + (r / 4)) + ' ' + (my - (2 * r / 5)) + ' ';
    output += 'C ' + (mx + (r / 4)) + ',' + (my - u) + ' ' + (mx + 8 * u) + ',' + (my) + ' ' + (mx + 8 * u) + ',' + (my + 3 * u) + ' ';
    output += 'A ' + (8 * u) + ' ' + (8 * u) + ' 0 1 1 ' + (mx - 8 * u) + ' ' + (my + 3 * u) + ' ';
    output += 'C ' + (mx - 8 * u) + ',' + (my) + ' ' + (mx - (r / 4)) + ',' + (my - u) + ' ' + (mx - (r / 4)) + ',' + (my - (2 * r / 5)) + ' ';
    output += 'L' + (mx - (2 * r / 3)) + ' ' + (my - (2 * r / 5)) + ' ';

    output += 'Z "';
    output += 'fill="#4f2f2f" stroke="none" filter="url(#glow)" />';

    output += '<path d="M' + mx + ' ' + (my - r) + ' ';
    output += 'L' + (mx + (2 * r / 3)) + ' ' + (my - (2 * r / 5)) + ' ';
    output += 'L' + (mx + (r / 4)) + ' ' + (my - (2 * r / 5)) + ' ';
    output += 'C ' + (mx + (r / 4)) + ',' + (my - u) + ' ' + (mx + 8 * u) + ',' + (my) + ' ' + (mx + 8 * u) + ',' + (my + 3 * u) + ' ';
    output += 'A ' + (8 * u) + ' ' + (8 * u) + ' 0 1 1 ' + (mx - 8 * u) + ' ' + (my + 3 * u) + ' ';
    output += 'C ' + (mx - 8 * u) + ',' + (my) + ' ' + (mx - (r / 4)) + ',' + (my - u) + ' ' + (mx - (r / 4)) + ',' + (my - (2 * r / 5)) + ' ';
    output += 'L' + (mx - (2 * r / 3)) + ' ' + (my - (2 * r / 5)) + ' ';

    output += 'Z "';
    output += 'fill="#F6883E" stroke="#DCFAF7" stroke-width="' + (max * margin / 7) + '" />';
    output += '<path d="M' + mx + ' ' + (my - r) + ' ';
    output += 'L' + (mx + (2 * r / 3)) + ' ' + (my - (2 * r / 5)) + ' ';
    output += 'L' + (mx + (r / 4)) + ' ' + (my - (2 * r / 5)) + ' ';
    output += 'C ' + (mx + (r / 4)) + ',' + (my - u) + ' ' + (mx + 8 * u) + ',' + (my) + ' ' + (mx + 8 * u) + ',' + (my + 3 * u) + ' ';
    output += 'A ' + (8 * u) + ' ' + (8 * u) + ' 0 1 1 ' + (mx - 8 * u) + ' ' + (my + 3 * u) + ' ';
    output += 'C ' + (mx - 8 * u) + ',' + (my) + ' ' + (mx - (r / 4)) + ',' + (my - u) + ' ' + (mx - (r / 4)) + ',' + (my - (2 * r / 5)) + ' ';
    output += 'L' + (mx - (2 * r / 3)) + ' ' + (my - (2 * r / 5)) + ' ';

    output += 'Z "';
    output += 'fill="#F6883E" stroke="none" filter="url(#innershadow)"/>';
    output += '<text x="' + (mx - 3.5 * u) + '" y="' + (my + 5 * u) + '" font-family="' + fontVar + '" font-size="' + (16 * u) + 'px" transform="rotate(180 ' + mx + ',' + my + ')" fill="#C4564A" filter="url(#innershadow)">?</text>';
    $(canvas).html(output);

}