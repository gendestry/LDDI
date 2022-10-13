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

type GateHandler interface {
	GetValue() interface{}
}
