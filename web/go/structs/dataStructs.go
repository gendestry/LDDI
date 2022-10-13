package structs

type Color struct {
	R uint8
	G uint8
	B uint8
}

type Slice struct {
	Start int
	End   int
}

type Led struct {
	Index int8
	R     int8
	G     int8
	B     int8
}
