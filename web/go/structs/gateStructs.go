package structs

type Gate struct {
	parent int64
	clean  bool
}

type ScalarGate struct {
	Gate
	Scalar int64
}

type ColorGate struct {
	Gate
	Color Color
}

type SliceGate struct {
	Gate
	Slice Slice
}

type GateHandler interface {
	GetVdalue() interface{}
}
