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

    //var regex = /^([cdefgab]#?){1}(maj?|min?|m?|dim?|aug?|sus?|sus2?|sus4?)?(7?|9?|11?|13?)?(sus?|sus2?|sus4?)?\/?([cdefgab]#?)?$/g;
    var regex = /^([cdefgab]#?){1}(maj|min|m|dim|aug|sus|sus2|sus4)?(7?|9?|11?|13?)?(sus|sus2|sus4)?(flat5)?\/?([cdefgab]#?)?$/g;
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

    if (["a", "a#", "b"].includes(r)) {
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
        // this can probably get greatly simplified?
        // 7, 9, 11, 13
        if (type == "maj") {
            if (num == "7") {
                notes_i.push(notes_i[0] + 11);
            } else if (num == "9") {
                notes_i.push(notes_i[0] + 11);
                notes_i.push(notes_i[0] + 14);
            } else if (num == "11") {
                notes_i.push(notes_i[0] + 11);
                notes_i.push(notes_i[0] + 14);
                notes_i.push(notes_i[0] + 17);
            } else if (num == "13") {
                notes_i.push(notes_i[0] + 11);
                notes_i.push(notes_i[0] + 14);
                notes_i.push(notes_i[0] + 21);
            }
        } else if (type == "dim") {
            if (num == "7") {
                notes_i.push(notes_i[0] + 9);
            } else if (num == "9") {
                notes_i.push(notes_i[0] + 9);
                notes_i.push(notes_i[0] + 12);
            } else if (num == "11") {
                notes_i.push(notes_i[0] + 9);
                notes_i.push(notes_i[0] + 12);
                notes_i.push(notes_i[0] + 15);
            } else if (num == "13") {
                notes_i.push(notes_i[0] + 9);
                notes_i.push(notes_i[0] + 12);
                notes_i.push(notes_i[0] + 18);
            }
        } else if (["m", "min"].includes(type)) {
            if (num == "7") {
                notes_i.push(notes_i[0] + 10);
            } else if (num == "9") {
                notes_i.push(notes_i[0] + 10);
                notes_i.push(notes_i[0] + 13);
            } else if (num == "11") {
                notes_i.push(notes_i[0] + 10);
                notes_i.push(notes_i[0] + 14);
                notes_i.push(notes_i[0] + 17);
            } else if (num == "13") {
                notes_i.push(notes_i[0] + 10);
                notes_i.push(notes_i[0] + 14);
                notes_i.push(notes_i[0] + 19);
            }
        } else {
            dominant = true;
             if (num == "7") {
                notes_i.push(notes_i[0] + 10);
            } else if (num == "9") {
                notes_i.push(notes_i[0] + 10);
                notes_i.push(notes_i[0] + 13);
            } else if (num == "11") {
                notes_i.push(notes_i[0] + 10);
                notes_i.push(notes_i[0] + 14);
                notes_i.push(notes_i[0] + 17);
            } else if (num == "13") {
                notes_i.push(notes_i[0] + 10);
                notes_i.push(notes_i[0] + 14);
                notes_i.push(notes_i[0] + 19);
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

    if (halfDim == "flat5" && ["min", "m"].includes(type)) {
        notes_i[2] = notes_i[2] - 1;
    }

    // need to find closest bass note
    // work in progress for inversions, v complex? 
    // if(inversion && notation.includes("/")) {
    // 	notes_i.unshift(keyboard.findIndex(key => {
    // 		return key == inversion + "-1";
    // 	}));
    // }


    var notes = [];
    notes_i.forEach(n => {
        var note = document.getElementById(keyboard[n]);
        notes.push(keyboard[n]);

        note.classList.add("hlight");
    });

    return notes;
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
