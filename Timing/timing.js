
function changeAfterOneSecond() {
    let value = false;
    const id = setTimeout(() => value = true, 1000);

    return {
        get value() { return value; },
        cancel() { clearTimeout(id); },
    };
}

function changeEverySecond() {
    let value = 0;
    const id = setInterval(() => value++, 1000);

    return {
        get value() { return value; },
        cancel() { clearInterval(id); },
    };
}

module.exports = {
    changeAfterOneSecond,
    changeEverySecond,
};
