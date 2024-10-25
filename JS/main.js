const input = document.getElementById("input");
const upload = document.getElementById('upload');
const div_upload = document.getElementById('div_upload');
const select_size = document.getElementById("select_size");
const custom_div = document.getElementById("custom_div");
const custom_width = document.getElementById("custom_width");
const custom_height = document.getElementById("custom_height");
const solid = document.getElementById("solid");
const solid_radio = document.getElementById("solid_radio");
const gradient = document.getElementById("gradient");
const gradient_radio = document.getElementById("gradient_radio")
const gradient_slider = document.getElementById("gradient_slider")
const select_font = document.getElementById("select_font");
const custom_font = document.getElementById("custom_font");
const font_size = document.getElementById("font_size");
const font_color = document.getElementById("font_color");
const italic = document.getElementById("italic");
const font_outline = document.getElementById("font_outline");
const font_outline_color = document.getElementById("font_outline_color");
const font_underline = document.getElementById("font_underline");
const font_weight = document.getElementById("font_weight");
const letter_spacing = document.getElementById("letter_spacing");
const shadow = document.getElementById("shadow");
const shadow_div = document.getElementById("shadow_div");
const shadow_blur = document.getElementById("shadow_blur");
const shadow_color = document.getElementById("shadow_color");
const shadow_X = document.getElementById("shadow_X");
const shadow_Y = document.getElementById("shadow_Y");
const align_left = document.getElementById("align_left");
const align_center = document.getElementById("align_center");
const align_right = document.getElementById("align_right");
const align_top = document.getElementById("align_top");
const align_middle = document.getElementById("align_middle");
const align_bottom = document.getElementById("align_bottom");
const grid = document.getElementById("grid");
const display_text = document.getElementById("display_text");
const text_X = document.getElementById("text_X");
const text_Y = document.getElementById("text_Y");
const framerate = document.getElementById("framerate");
const download = document.getElementById("download");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const pickr = Pickr.create({
    el: solid,
    theme: 'monolith',
    default: '#000000',
    swatches: [
        'rgba(0, 0, 0, 1)',
        'rgba(255, 0, 0, 1)',
        'rgba(0, 255, 0, 1)',
        'rgba(0, 0, 255, 1)',
        'rgba(255, 255, 0, 1)',
        'rgba(0, 255, 255, 1)',
        'rgba(255, 0, 255, 1)',
        'rgba(255, 255, 255, 1)',
    ],
    components: {
        preview: true,
        opacity: true,
        hue: true,
        interaction: {
            hex: true,
            rgba: true,
            hsla: true,
            input: true,
            save: true
        }
    }
});
const pickr2 = Pickr.create({
    el: font_outline_color,
    theme: 'monolith',
    default: '#000000',
    swatches: [
        'rgba(0, 0, 0, 1)',
        'rgba(255, 0, 0, 1)',
        'rgba(0, 255, 0, 1)',
        'rgba(0, 0, 255, 1)',
        'rgba(255, 255, 0, 1)',
        'rgba(0, 255, 255, 1)',
        'rgba(255, 0, 255, 1)',
        'rgba(255, 255, 255, 1)',
    ],
    components: {
        preview: true,
        opacity: true,
        hue: true,
        interaction: {
            hex: true,
            rgba: true,
            hsla: true,
            input: true,
            save: true
        }
    }
});
const pickr3 = Pickr.create({
    el: shadow_color,
    theme: 'monolith',
    default: '#000000',
    swatches: [
        'rgba(0, 0, 0, 1)',
        'rgba(255, 0, 0, 1)',
        'rgba(0, 255, 0, 1)',
        'rgba(0, 0, 255, 1)',
        'rgba(255, 255, 0, 1)',
        'rgba(0, 255, 255, 1)',
        'rgba(255, 0, 255, 1)',
        'rgba(255, 255, 255, 1)',
    ],
    components: {
        preview: true,
        opacity: true,
        hue: true,
        interaction: {
            hex: true,
            rgba: true,
            hsla: true,
            input: true,
            save: true
        }
    }
});
const pickr4 = Pickr.create({
    el: gradient,
    theme: 'monolith',
    default: '#000000',
    swatches: [
        'rgba(0, 0, 0, 1)',
        'rgba(255, 0, 0, 1)',
        'rgba(0, 255, 0, 1)',
        'rgba(0, 0, 255, 1)',
        'rgba(255, 255, 0, 1)',
        'rgba(0, 255, 255, 1)',
        'rgba(255, 0, 255, 1)',
        'rgba(255, 255, 255, 1)',
    ],
    components: {
        preview: true,
        opacity: true,
        hue: true,
        interaction: {
            hex: true,
            rgba: true,
            hsla: true,
            input: true,
            save: true
        }
    }
});

let canvas_text = display_text.value;
let textX = 0;
let textY = 0;
let isDragging = false;
let project = {};
let factor = 1;
let p0 = 0;
let p1 = 1;
let font_list = ["Arial", "custom font...", "Baskerville Old Face", "Bodoni MT", "Book Antiqua", "Calibri", "Cambria", "Candara", "Consolas", "Constantia", "Courier New", "Fixedsys", "Franklin Gothic Medium", "Garamond", "Georgia", "Gill Sans MT", "Goudy Old Style", "Impact", "Lucida Console", "Lucida Sans Unicode", "Palatino Linotype", "Segoe UI", "Tahoma", "Times New Roman", "Trebuchet MS", "Verdana"];
if (detectOS() == "macOS") font_list = ["Arial", "custom font...", "Baskerville", "Big Caslon", "Courier", "Courier New", "DejaVu Sans", "Didot", "Futura", "Garamond", "Geneva", "Georgia", "Gill Sans", "Helvetica", "Helvetica Neue", "Hoefler Text", "Impact", "Lucida Bright", "Lucida Grande", "Menlo", "Monaco", "Optima", "Palatino", "San Francisco", "Times", "Times New Roman", "Trebuchet MS", "Verdana"];
if (detectOS() == "Linux") font_list = ["Arial", "custom font...", "Baskerville Old Face", "Bitstream Charter", "Bitstream Vera Sans", "Bitstream Vera Serif", "Cantarell", "Century Schoolbook L", "Code New Roman", "Consolas", "DejaVu Mono", "DejaVu Sans", "DejaVu Sans Mono", "DejaVu Serif", "Droid Sans Mono", "Fira Code", "Fira Sans", "FreeMono", "FreeSans", "Geneva", "Garamond", "Georgia", "Helvetica", "Helvetica Neue", "Hoefler Text", "Inconsolata", "Liberation Mono", "Liberation Sans", "Liberation Serif", "Lucida Bright", "Nimbus Mono L", "Nimbus Roman No 9 L", "Nimbus Sans L", "Noto Sans", "Open Sans", "Palatino", "Palatino Linotype", "Roboto", "Roboto Mono", "Segoe UI", "Source Code Pro", "Tahoma", "Times", "Times New Roman", "Trebuchet MS", "URW Palladio L", "Verdana"];
for (const font of font_list) {
    const opt = document.createElement('option');
    opt.text = font;
    select_font.appendChild(opt);
}


custom_div.style.opacity = select_size.value === "custom" ? "1" : "0";
if (shadow.checked) shadow_div.style.borderColor = "#f18476";
if (!shadow.checked) {
    shadow_div.disabled = 1;
    pickr3._root.button.style.opacity = "0.1";
    pickr3._root.button.disabled = true;

}
if (solid_radio.checked) {
    pickr4._root.button.style.opacity = "0.1";
    pickr4._root.button.disabled = true;
    gradient_slider.disabled = true;
}
if (input.value == false) download.style.display = "none";


canvas.width = window.innerWidth * 0.5;
canvas.height = canvas.width / (16 / 9);

const listeners = [font_size, select_font, solid, solid_radio, italic, font_outline, font_outline_color, font_underline, font_weight, letter_spacing, shadow, shadow_blur, shadow_color, shadow_X, shadow_Y, grid, display_text, gradient, gradient_radio, gradient_slider];
listeners.forEach((id) => {
    id.addEventListener("change", render);
});


select_font.addEventListener('change', () => {
    if (select_font.value === "custom font...") {
        custom_font.style.display = "block";
    } else {
        custom_font.style.display = "none";
    }
});
custom_font.addEventListener('change', () => {
    const opt = document.createElement('option');
    opt.text = custom_font.value;
    select_font.appendChild(opt);
    select_font.value = custom_font.value;
    render();
});
input.addEventListener('change', () => {
    if (input.value == false) {
        download.style.display = "none";
    } else {
        download.style.display = "block";
    }
});
div_upload.addEventListener('mouseleave', () => {
    if (input.value == false) {
        download.style.display = "none";
    } else {
        download.style.display = "block";
    }
});


shadow.addEventListener('click', () => {
    if (shadow.checked) {
        shadow_div.disabled = 0;
        shadow_div.style.borderColor = "#f18476";
        pickr3._root.button.style.opacity = "1";
        pickr3._root.button.disabled = false;
    } else {
        shadow_div.disabled = 1;
        shadow_div.style.borderColor = "#84b9f5";
        pickr3._root.button.style.opacity = "0.1";
        pickr3._root.button.disabled = true;
    }
});
solid_radio.addEventListener('click', () => {

    pickr4._root.button.style.opacity = "0.1";
    pickr4._root.button.disabled = true;
    gradient_slider.disabled = true

});
gradient_radio.addEventListener('click', () => {

    pickr4._root.button.style.opacity = "1";
    pickr4._root.button.disabled = false;
    gradient_slider.disabled = false

});
let file_name = "Kdensubs";
download.addEventListener('click', () => {
    download_subtitles();
});

window.addEventListener('dragover', (event) => {
    event.preventDefault();
    div_upload.classList.add('hover');
    document.body.style.filter = "brightness(70%)";
});

window.addEventListener('dragleave', () => {
    div_upload.classList.remove('hover');
    document.body.style.filter = "brightness(100%)";
});

window.addEventListener('drop', (event) => {
    event.preventDefault();
    div_upload.classList.remove('hover');
    document.body.style.filter = "brightness(100%)";


    const file = event.dataTransfer.files[0];
    file_name = file.name.split(".", 1)[0];
    const reader = new FileReader();

    reader.onload = () => {
        input.value = reader.result;
        const blocks = reader.result.split(/\n\n/);
        const text = blocks.map(block => block.slice(block.indexOf("\n") + 31));
        display_text.value = text.reduce((a, b) => a.length > b.length ? a : b);
        render();
    };

    reader.onerror = () => {
        console.error('Error reading file');
    };

    reader.readAsText(file);




});

div_upload.addEventListener('click', () => {
    upload.click();
});

upload.addEventListener('change', (event) => {
    const file = event.target.files[0];
    file_name = file.name.split(".", 1)[0];
    const reader = new FileReader();

    reader.onload = () => {
        input.value = reader.result;
        const blocks = reader.result.split(/\n\n/);
        const text = blocks.map(block => block.slice(block.indexOf("\n") + 31));
        display_text.value = text.reduce((a, b) => a.length > b.length ? a : b);
        render();
    };

    reader.onerror = () => {
        console.error('Error reading file');
    };

    reader.readAsText(file);
});
window.addEventListener("resize", () => {
    resize_canvas();
});
align_left.addEventListener('click', () => {
    const measure = ctx.measureText(canvas_text);
    const textWidth = measure.width;
    textX = 0;
    render();
});
align_center.addEventListener('click', () => {
    const measure = ctx.measureText(canvas_text);
    const textWidth = measure.width;
    textX = (canvas.width - textWidth) / 2 / factor;
    render();
});
align_right.addEventListener('click', () => {
    const measure = ctx.measureText(canvas_text);
    const textWidth = measure.width;
    textX = (canvas.width - textWidth) / factor;
    render();
});
align_top.addEventListener('click', () => {
    const measure = ctx.measureText(canvas_text);
    const textHeight = measure.actualBoundingBoxDescent;
    textY = 0;
    render();
});
align_middle.addEventListener('click', () => {
    const measure = ctx.measureText(canvas_text);
    const textHeight = measure.actualBoundingBoxDescent;
    textY = (canvas.height - textHeight) / 2 / factor;
    render();
});
align_bottom.addEventListener('click', () => {
    const measure = ctx.measureText(canvas_text);
    const textHeight = measure.actualBoundingBoxDescent;
    textY = (canvas.height - textHeight) / factor;
    render();
});
select_size.addEventListener('change', () => {
    custom_div.style.opacity = select_size.value === "custom" ? "1" : "0";
    resize_canvas();
});
custom_height.addEventListener('change', () => {
    resize_canvas();
});
custom_width.addEventListener('change', () => {
    resize_canvas();
});
text_X.addEventListener('change', () => {
    textX = Number(text_X.value);
    render();
});
text_Y.addEventListener('change', () => {
    textY = Number(text_Y.value);
    render();
});
canvas.addEventListener('mousedown', (e) => {
    if (isMouseOnText(e)) {
        isDragging = true;
    }
});
canvas.addEventListener('mousemove', (e) => {
    if (isDragging) {
        textX += (e.offsetX - oldX) / factor;
        textY += (e.offsetY - oldY) / factor;
        render();
    }
    oldX = e.offsetX;
    oldY = e.offsetY;
});
canvas.addEventListener('mouseup', () => {
    isDragging = false;
});
pickr.on('save', (color, instance) => {
    instance.hide();
    render()
});
pickr2.on('save', (color, instance) => {
    instance.hide();
    render()
});
pickr3.on('save', (color, instance) => {
    instance.hide();
    render()
});
pickr4.on('save', (color, instance) => {
    instance.hide();
    render()
});

function isMouseOnText(event) {
    const measure = ctx.measureText(canvas_text);
    const textWidth = measure.width;
    const textHeight = measure.actualBoundingBoxDescent;

    return event.offsetX >= textX * factor && event.offsetX <= textX * factor + textWidth && event.offsetY >= textY * factor && event.offsetY <= textY * factor + textHeight;
}

function detectOS() {
    const userAgent = navigator.userAgent.toLowerCase();

    if (userAgent.includes('windows nt')) {
        return 'Windows';
    } else if (userAgent.includes('mac os x')) {
        return 'macOS';
    } else if (userAgent.includes('linux')) {
        return 'Linux';
    } else {
        return 'Unknown';
    }
}

function underline() {
    const measure = ctx.measureText(canvas_text);
    const textWidth = measure.width;
    const textHeight = measure.actualBoundingBoxDescent;
    if (font_outline.value > 0) ctx.strokeRect(textX * factor, textY * factor + textHeight, textWidth, font_size.value * factor * 0.05);
    ctx.fillRect(textX * factor, textY * factor + textHeight, textWidth, font_size.value * factor * 0.05);
}

function draw_shadow() {
    if (shadow.checked) {
        ctx.shadowBlur = shadow_blur.value;
        ctx.shadowColor = pickr3.getSelectedColor().toRGBA().toString();
        ctx.shadowOffsetX = shadow_X.value * factor;
        ctx.shadowOffsetY = shadow_Y.value * factor;
    } else {
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
    }
}

function draw_grid() {
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.lineWidth = 1;
    ctx.strokeStyle = "black";
    ctx.setLineDash([1, 3]);

    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(canvas.width / 4, 0);
    ctx.lineTo(canvas.width / 4, canvas.height);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(canvas.width * 3 / 4, 0);
    ctx.lineTo(canvas.width * 3 / 4, canvas.height);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 4);
    ctx.lineTo(canvas.width, canvas.height / 4);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, canvas.height * 3 / 4);
    ctx.lineTo(canvas.width, canvas.height * 3 / 4);
    ctx.stroke();

    ctx.setLineDash([]);

}

function draw_gradient() {
    const measure = ctx.measureText(canvas_text);
    const textHeight = measure.actualBoundingBoxDescent;

    if (gradient_slider.value <= 1) {
        p0 = 0;
        p1 = gradient_slider.value
    }
    if (gradient_slider.value > 1) {
        p0 = (gradient_slider.value - 1).toFixed(2);
        p1 = 1
    }
    const grad = ctx.createLinearGradient(0, textY * factor, 0, textY * factor + textHeight);
    grad.addColorStop(p0, pickr.getSelectedColor().toRGBA().toString());
    grad.addColorStop(p1, pickr4.getSelectedColor().toRGBA().toString());
    ctx.fillStyle = grad;
}

function resize_canvas() {
    if (select_size.value === "custom") {
        project = {
            width: custom_width.value,
            height: custom_height.value
        };
    } else {
        project = {
            width: select_size.value.split("x")[0],
            height: select_size.value.split("x")[1]
        };
    }

    factor = Math.min(window.innerWidth * 0.5 / project.width, window.innerWidth * 0.5 / (16 / 9) / project.height);
    canvas.width = project.width * factor;
    canvas.height = project.height * factor;
    ctx.textBaseline = "top";
    render()
}

function render() {
    canvas_text = display_text.value

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (grid.checked) draw_grid();
    ctx.font = `${font_weight.value} ${font_size.value * factor}px ${select_font.value}`;
    if (italic.checked) ctx.font = `italic ${font_weight.value} ${font_size.value * factor}px ${select_font.value}`;
    ctx.fillStyle = pickr.getSelectedColor().toRGBA().toString();
    ctx.lineWidth = font_outline.value * factor;
    ctx.strokeStyle = pickr2.getSelectedColor().toRGBA().toString();
    ctx.letterSpacing = letter_spacing.value * factor + "px";

    draw_shadow();
    if (font_outline.value > 0) ctx.strokeText(canvas_text, textX * factor, textY * factor);
    if (gradient_radio.checked) draw_gradient();
    if (font_underline.checked) underline();

    ctx.fillText(canvas_text, textX * factor, textY * factor);

    text_X.value = Math.round(textX);
    text_Y.value = Math.round(textY);
}

function download_subtitles() {
    if (gradient_radio.checked) {
        if (pickr.getSelectedColor().toHEXA().toString().length === 7) color1 = "#ff" + pickr.getSelectedColor().toHEXA().toString().slice(1).toLowerCase();
        if (pickr.getSelectedColor().toHEXA().toString().length === 9) color1 = "#" + pickr.getSelectedColor().toHEXA().toString().slice(-2).toLowerCase() + pickr.getSelectedColor().toHEXA().toString().slice(1, -2).toLowerCase();

        if (pickr4.getSelectedColor().toHEXA().toString().length === 7) color2 = "#ff" + pickr4.getSelectedColor().toHEXA().toString().slice(1).toLowerCase();
        if (pickr4.getSelectedColor().toHEXA().toString().length === 9) color2 = "#" + pickr4.getSelectedColor().toHEXA().toString().slice(-2).toLowerCase() + pickr4.getSelectedColor().toHEXA().toString().slice(1, -2).toLowerCase();

        subtitle_gradient = `gradient="${color1};${color2};${p0*100};${p1*100};90" `;
        subtitle_color = "0,0,0,255";

    } else {
        subtitle_gradient = "";
        subtitle_color = `${Math.round(pickr.getSelectedColor().toRGBA()[0])},${Math.round(pickr.getSelectedColor().toRGBA()[1])},${Math.round(pickr.getSelectedColor().toRGBA()[2])},${Math.round(pickr.getSelectedColor().toRGBA()[3]*255)}`;
    }

    if (pickr3.getSelectedColor().toHEXA().toString().length === 7) subtitle_shadow = "#ff" + pickr3.getSelectedColor().toHEXA().toString().slice(1).toLowerCase();
    if (pickr3.getSelectedColor().toHEXA().toString().length === 9) subtitle_shadow = "#" + pickr3.getSelectedColor().toHEXA().toString().slice(-2).toLowerCase() + pickr3.getSelectedColor().toHEXA().toString().slice(1, -2).toLowerCase();




    const blocks = input.value.split(/\n\n/);
    while (blocks[blocks.length - 1] == 0) {
        blocks.pop();
    }



    const start = blocks.map(block => block.slice(block.indexOf("\n") + 1, block.indexOf("\n") + 13)).map(line => line.replace(/,/g, ".")).map(time => new Date('1970-01-01T' + time)).map(date => (date - new Date("1970-01-01T00:00:00.000")) / 1000).map(n => Math.round(n * framerate.value));
    const end = blocks.map(block => block.slice(block.indexOf("\n") + 18, block.indexOf("\n") + 30)).map(line => line.replace(/,/g, ".")).map(time => new Date('1970-01-01T' + time)).map(date => (date - new Date("1970-01-01T00:00:00.000")) / 1000).map(n => Math.round(n * framerate.value));
    const text = blocks.map(block => block.slice(block.indexOf("\n") + 31));

    const blank = [];
    let pre_end = 0;
    for (let i = 0; i < blocks.length; i++) {
        blank[i] = start[i] - pre_end;
        pre_end = end[i];
    }

    const duration = [];
    for (let i = 0; i < blocks.length; i++) {
        duration[i] = end[i] - start[i];
    }

    const content = [];
    let n = 0;
    ctx.font = `${font_weight.value} ${font_size.value}px ${select_font.value}`;
    for (let i = 0; i < blocks.length; i++) {
        if (blank[i] > 0) {
            content[n] = `<kdenlivetitle LC_NUMERIC="C" duration="${blank[i]}" height="${project.height}" out="${blank[i]}" width="${project.width}">
 <startviewport rect="0,0,${project.width},${project.height}"/>
 <endviewport rect="0,0,${project.width},${project.height}"/>
 <background color="0,0,0,0"/>
</kdenlivetitle>
`;
            n += 1;
        }
        content[n] = `<kdenlivetitle LC_NUMERIC="C" duration="${duration[i]}" height="${project.height}" out="${duration[i]}" width="${project.width}">
 <item type="QGraphicsTextItem" z-index="0">
  <position x="${Math.round((textX + ctx.measureText(canvas_text).width/2) - ctx.measureText(text[i]).width/2)}" y="${Math.round(textY)}">
   <transform>1,0,0,0,1,0,0,0,1</transform>
  </position>
  <content alignment="4" box-height="${Math.round(ctx.measureText(text[i]).fontBoundingBoxAscent + ctx.measureText(text[i]).fontBoundingBoxDescent)}" box-width="${ctx.measureText(text[i]).width.toFixed(3)}" font="${select_font.value}" font-color="${subtitle_color}" font-italic="${Number(italic.checked)}" font-outline="${font_outline.value}" font-outline-color="${Math.round(pickr2.getSelectedColor().toRGBA()[0])},${Math.round(pickr2.getSelectedColor().toRGBA()[1])},${Math.round(pickr2.getSelectedColor().toRGBA()[2])},${Math.round(pickr2.getSelectedColor().toRGBA()[3]*255)}" font-pixel-size="${font_size.value }" font-underline="${Number(font_underline.checked)}" font-weight="${font_weight.value}" ${subtitle_gradient}letter-spacing="${letter_spacing.value}" line-spacing="${line_spacing.value}" shadow="${Number(shadow.checked)};${subtitle_shadow};${shadow_blur.value};${shadow_X.value};${shadow_Y.value}" typewriter="0;2;1;0;0">${text[i]}</content>
 </item>
 <startviewport rect="0,0,${project.width},${project.height}"/>
 <endviewport rect="0,0,${project.width},${project.height}"/>
 <background color="0,0,0,0"/>
</kdenlivetitle>
`;
        n += 1;
    }
    const zip = new JSZip();
    const pad = content.length.toString().length
    const currDate = new Date();
    const dateWithOffset = new Date(currDate.getTime() - currDate.getTimezoneOffset() * 60000);
    const dateWithOffset_blank = new Date(currDate.getTime() - currDate.getTimezoneOffset() * 60000 - 60000);
    content.forEach((content, i) => {
        if (content.length < 300) {
            zip.file("titles/" + String(i + 1).padStart(pad, '0') + "_.kdenlivetitle", content, {
                date: dateWithOffset_blank
            });
        } else {
            zip.file("titles/" + String(i + 1).padStart(pad, '0') + ".kdenlivetitle", content, {
                date: dateWithOffset
            });
        }
    });
    zip.generateAsync({
        type: "blob"
    }).then(function(blob) {
        saveAs(blob, file_name + ".zip");
    });
}

resize_canvas();