var keyboard = [
    // -1 used as bass notes_i
    'c-1', 'c#-1', 'd-1', 'd#-1', 'e-1', 'f-1', 'f#-1', 'g-1', 'g#-1', 'a-1', 'a#-1', 'b-1',
    'c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#', 'a', 'a#', 'b',
    'c2', 'c#2', 'd2', 'd#2', 'e2', 'f2', 'f#2', 'g2', 'g#2', 'a2', 'a#2', 'b2'
];


function parse(input) {
    var elements = document.getElementById("keyboard").children;

    if (!input) {
        Array.from(elements).forEach(e => {
            e.classList.remove("hlight");
        });

        return;
    }

    input = input.toLowerCase();

    var regex = /^([cdefgab]#?){1}(maj|min|m|dim|aug|sus|sus2|sus4)?(6?|7?|9?|11?|13?)?(sus|sus2|sus4)?(flat5)?\/?([cdefgab]#?)?$/g;
    var match = regex.exec(input);

    if (!match) {
        return;
    } else {
        Array.from(elements).forEach(e => {
            e.classList.remove("hlight");
        });
    }

    var notation = match[0];
    var r = match[1]; // root
    var type = match[2]; // triad type
    var num = match[3]; // seventh, ninth, etc
    var sus = match[4]; // suspensions
    var halfDim = match[5]; // half diminished sevenths
    var inversion = match[6]; // chord inversions
    var dominant = false;

    if (["g", "g#", "a", "a#", "b"].includes(r)) {
        r = r + "-1";
    }

    var notes_i = buildMajor(r);

    if (type) {
        // maj, min, m, dim, sus
        if (["min", "m"].includes(type)) {
            notes_i = buildMinor(r);
        } else if (type == "dim") {
            notes_i = buildDim(r);
        } else if (type == "aug") {
            notes_i = buildAug(r);
        } else if (type == "sus2") {
            notes_i[1] = notes_i[1] - 2;
        } else if (type == "sus4" || type == "sus") {
            notes_i[1] = notes_i[1] + 1;
        }
    }

    if (num) {
        // 6, 7, 9, 11, 13
        if (["6", "7", "9", "11", "13"].includes(num)) {

            if (num == "6") {
                notes_i[3] = notes_i[2] + 2;
            } else if (type == "maj") {
                var scale = buildMajorScale(r);
                addExtended(num, notes_i, scale, type);
            } else if (["m", "min"].includes(type)) {
                var scale = buildMinorScale(r);
                addExtended(num, notes_i, scale, type);
            } else if (type == "dim") {
                var scale = buildMajorScale(r);
                if (num == "7") notes_i.push(scale[6] - 2);
            } else if (type == "aug") {
                var scale = buildMajorScale(r);
                if (num == "7") notes_i.push(scale[6] - 1);
            } else if (!type) {
                dominant = true;
                var scale = buildMajorScale(r);
                addExtended(num, notes_i, scale, type);
                notes_i[3] = notes_i[3] - 1;
            }
        }

    }

    if (sus && (type == "maj" || dominant)) {
        if (sus == "sus2") {
            notes_i[1] = notes_i[1] - 2;
        } else if (sus == "sus4" || sus == "sus") {
            notes_i[1] = notes_i[1] + 1;
        }
    }

    if (halfDim == "flat5") {
        notes_i[2] = notes_i[2] - 1;
    }

    var notes = [];
    notes_i.forEach(n => {
        var note = document.getElementById(keyboard[n]);
        notes.push(keyboard[n]);

        note.classList.add("hlight");
    });

    return notes;
}

function addExtended(num, notes_i, scale, type) {
    if (num == "7") {
        notes_i.push(scale[6]);
    } else if (num == "9") {
        notes_i.push(scale[6]);
        notes_i.push(scale[8]);
    } else if (num == "11") {
        notes_i.push(scale[6]);
        notes_i.push(scale[8]);
        notes_i.push(scale[10]);
    } else if (num == "13") {
        notes_i.push(scale[6]);
        notes_i.push(scale[8]);

        // 13th extended chords go outside the scale
        if (!type || type == "maj") {
            notes_i.push(scale[12]);
        } else if (["m", "min"].includes(type)) {
            notes_i.push(scale[8] + 7);
        }
    }
}

function buildMajor(input) {
    var r = keyboard.findIndex(key => {
        return key == input;
    });

    return [r, r + 4, r + 4 + 3];
}

function buildMinor(input) {
    var r = keyboard.findIndex(key => {
        return key == input;
    });

    return [r, r + 3, r + 3 + 4];
}

function buildMajorScale(root) {
    // Whole - Whole - Half - Whole - Whole - Whole - Half
    var r = keyboard.findIndex(key => {
        return key == root;
    });

    var scale = [r, 2, 2, 1, 2, 2, 2, 1, 2, 2, 1, 2, 2, 2, 1];
    return scale.map((elem, i) => scale.slice(0, i + 1).reduce((a, b) => a + b));
}

function buildMinorScale(root) {
    // Whole - Half - Whole - Whole - Half - Whole - Whole
    var r = keyboard.findIndex(key => {
        return key == root;
    });

    var scale = [r, 2, 1, 2, 2, 1, 2, 2, 2, 1, 2, 2, 1, 2, 2];
    return scale.map((elem, i) => scale.slice(0, i + 1).reduce((a, b) => a + b));
}

function buildAug(input) {
    var r = keyboard.findIndex(key => {
        return key == input;
    });

    return [r, r + 4, r + 4 + 4];
}

function buildDim(input) {
    var r = keyboard.findIndex(key => {
        return key == input;
    });

    return [r, r + 3, r + 3 + 3];
}

document.addEventListener("DOMContentLoaded", function(event) {
    var i = document.getElementById('chord-input');
    i.addEventListener('input', function() {
        parse(i.value);
    }, false);
});

if (typeof module !== 'undefined') {
    module.exports = parse;
}