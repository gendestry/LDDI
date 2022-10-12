package structs

type ScalarCreatorNode struct {
	Tip int16

	Scalar int

	Nextnode int
}

type ColorApplyerNode struct {
	Tip int16

	Color Color
	Slice Slice

	Nextnode int16
}

type ColorCreatorNode struct {
	Tip int16

	R uint8
	G uint8
	B uint8

	Nextnode int
}
