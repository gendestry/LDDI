package structs

type Node struct {
	Tip int16
}

type ScalarCreatorNode struct {
	Node

	OutScalar int64
}

func (n ScalarCreatorNode) GetType() int16 {
	return n.Tip
}

type ColorApplyerNode struct {
	Node

	InSlice int64
	InColor int64

	OutSlice int64
}

func (n ColorApplyerNode) GetType() int16 {
	return n.Tip
}

type ColorCreatorNode struct {
	Node

	OutColor *GateHandler
}

func (n ColorCreatorNode) GetType() int16 {
	return n.Tip
}

type SliceCreatorNode struct {
	Node
	OutSlice *GateHandler
}

func (n SliceCreatorNode) GetType() int16 {
	return n.Tip
}

// HELPER FUNCTIONS

func hasher(ints []int64) int64 {
	var primes []int64 = []int64{2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229}

	var hash int64
	hash = 0

	if len(ints) > len(primes) {
		panic("Not Enough Primes. Perhaps add 233")
	}

	for i := 0; i < len(ints); i++ {
		hash += ints[i] * primes[i]
	}

	return hash
}
