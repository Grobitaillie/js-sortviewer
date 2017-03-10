
function sort(arr, index = 0) {


  //if array is empty
  if (arr.length === 0) {
    return [];
  }

  var left = [];
  var right = [];
  var pivot = arr[0];
  //go through each element in array
  for (var i = 1; i < arr.length; i++) {
    let isSubToPivot = iterator.compareInferiorTo(index + i, pivot);
    if (isSubToPivot) {
      iterator.arrayValue(index + i)
      left.push(arr[i]);
    } else {
      iterator.arrayValue(index + i)
      right.push(arr[i]);
    }

    iterator.endIteration();
  }

  left.forEach((item, i) => {
    iterator.arrayAffect(index + i, item);
  });

  iterator.arrayAffect(index + left.length, pivot);

  right.forEach((item, i) => {
    iterator.arrayAffect(index + left.length + 1 + i, item);
  })

  let result = sort(left, index).concat(pivot, sort(right, index + 1 + left.length));

  return result;
}

iterator.mustRetainAndRedraw();
sort(a);




