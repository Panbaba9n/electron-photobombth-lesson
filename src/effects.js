const effects = {
    vanilla: (seriously, src, target) => {
        target.source = src;
        seriously.go();
    },
    ascii: (seriously, src, target) => {
        const ascii = seriously.effect('ascii');
        ascii.source = src;
        target.source = ascii;
        seriously.go();
    }
}

const effectNames = Object.keys(effects);
let currentIndex = 0;

exports.choose = (seriously, src, target, effectName = 'vanilla') => {
    effects[effectName](seriously, src, target);
    setIndexToEffectIndex(effectName);
};

exports.cycle = (seriously, src, target) => {
    setNextIndex();
    effects[effectNames[currentIndex]](seriously, src, target);
};

function setIndexToEffectIndex(effectName) {
    currentIndex = effectNames.indexOf(effectName);
    return currentIndex;
}

function setNextIndex() {
    const nextIndex = currentIndex +1 < effectNames.length ? currentIndex + 1 : 0;
    currentIndex = nextIndex;
    return currentIndex;
}