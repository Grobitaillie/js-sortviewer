
function buildHeap(input) {
    arrayLength = input.length;

    for (var i = Math.floor(arrayLength / 2); i >= 0; i -= 1) {
        heapify(input, i);
    }
}

function heapify(input, i) {
    var left = 2 * i + 1;
    var right = 2 * i + 2;
    var largest = i;

    if (left < arrayLength && iterator.compareSuperior(left, largest)) {
        largest = left;
    }

    if (right < arrayLength && iterator.compareSuperior(right, largest)) {
        largest = right;
    }

    if (largest != i) {
        swap(input, i, largest);
        heapify(input, largest);
    }
}

function swap(input, index_A, index_B) {
    var temp = input[index_A];

    iterator.arrayAffect(index_A, iterator.arrayValue(index_B));
    iterator.arrayAffect(index_B, temp);
}

async function heapSort(input) {
    buildHeap(input);

    for (var i = input.length - 1; i > 0; i--) {
        swap(input, 0, i);
        arrayLength--;
        heapify(input, 0);

        await iterator.endIteration();
    }
}

heapSort(a);
