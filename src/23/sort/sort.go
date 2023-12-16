package sort

func swap[T any](arr *[]T, x int, y int) {
	temp := (*arr)[x]
	(*arr)[x] = (*arr)[y]
	(*arr)[y] = temp
}

func partition[T any](arr []T, lower int, higher int, compare func(T, T) int) int {
	var pivot, last int
	var pivotVal T

	pivot = (lower + higher) / 2
	pivotVal = arr[pivot]

	last = lower

	// pivot goes to the right
	swap(&arr, pivot, higher)

	for i := lower; i < higher; i++ {
		c := compare(arr[i], pivotVal)

		// arr[i] <= pivotVal
		if c == -1 || c == 0 {
			swap(&arr, i, last)
			last++
		}
	}

	// swap pivot back in place to where everything to the left is smaller and everything to the right is higher
	swap(&arr, last, higher)

	return last
}

// Parameters:
//
//	 arr: The array to be sorted.
//	 lower: The starting index.
//	 higher: The ending index (inclusive).
//	 compare: A function that compares two elements of type T.
//	          It should return 1 if the first element is greater than the second,
//	0 if they are equal, and -1 if the first is less than the second.
func Quicksort[T any](arr []T, lower int, higher int, compare func(T, T) int) {
	if lower >= higher {
		return
	}

	partitionIndex := partition(arr, lower, higher, compare)
	Quicksort(arr, lower, partitionIndex-1, compare)
	Quicksort(arr, partitionIndex+1, higher, compare)
}
