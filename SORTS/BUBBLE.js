
async function sort(a) {

    var len = a.length;
    for (var i = 0; i < len; i++) {
        for (var j = 0; j < len - i - 1; j++) {
            if (iterator.compareSuperior(j, j + 1)) {
                var temp = iterator.arrayValue(j);
                iterator.arrayAffect(j, iterator.arrayValue(j + 1));
                iterator.arrayAffect(j + 1, temp);
            }

            await iterator.endIteration();
        }
    }
}

sort(a);




