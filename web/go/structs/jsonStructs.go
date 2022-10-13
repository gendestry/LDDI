package structs

type JSONNode struct {
	Tip   int16
	Index int64
	Node  string
}

type JSONSliceCreator struct {
	Tip int16

	Slice    Slice
	OutSlice int64
}

type JSONColorCreator struct {
	Tip int16

	Color    Color
	OutSlice int64
}

type JSONScalarCreator struct {
	Tip int16

	Scalar    int64
	OutScalar int64
}

type JSONColorApplyer struct {
	Tip int16

	InColor int64
	InSlice int64

	OutSlice int64
}
