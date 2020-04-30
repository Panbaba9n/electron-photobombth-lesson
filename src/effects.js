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

exports.choose = (seriously, src, target, effectName = 'vanilla') => {
    effects[effectName](seriously, src, target);
};