package structs

import "math"

type Color struct {
	R uint8
	G uint8
	B uint8
}

type Slice struct {
	Start uint32
	End   uint32
}

type Led struct {
	Index int32
	R     uint8
	G     uint8
	B     uint8
}

type Scalar struct {
	val float64
}

func (sc Scalar) addSc(v RGBVector) RGBVector {
	return v.addSc(sc)
}

func (sc Scalar) addVec(v RGBVector) RGBVector {
	return (v).addVec(v)
}

func (sc Scalar) mulSc(v RGBVector) RGBVector {
	return v.mulSc(sc)
}

func (sc Scalar) mulVec(v RGBVector) RGBVector {
	return v.mulVec(v)
}

type RGBVector struct {
	R uint8
	G uint8
	B uint8
}

func (v0 RGBVector) addSc(s Scalar) RGBVector {
	var R int = (int(v0.R) + int(s.val))
	var G int = (int(v0.G) + int(s.val))
	var B int = (int(v0.B) + int(s.val))

	if R > 255 {
		v0.R = uint8(255)
	} else {
		v0.R = uint8(R)
	}

	if G > 255 {
		v0.G = uint8(255)
	} else {
		v0.G = uint8(G)
	}

	if B > 255 {
		v0.B = uint8(255)
	} else {
		v0.B = uint8(B)
	}

	return v0
}

func (v0 RGBVector) addVec(v1 RGBVector) RGBVector {
	var R int = int(v0.R + v1.R)
	var G int = int(v0.G + v1.G)
	var B int = int(v0.B + v1.B)

	if R > 255 {
		v0.R = uint8(255)
	} else {
		v0.R = uint8(R)
	}

	if G > 255 {
		v0.G = uint8(255)
	} else {
		v0.G = uint8(G)
	}

	if B > 255 {
		v0.B = uint8(255)
	} else {
		v0.B = uint8(B)
	}

	return v0
}

func (v0 RGBVector) mulSc(s Scalar) RGBVector {
	v0.R = uint8(math.Min(float64(255), float64(v0.R)*s.val))
	v0.G = uint8(math.Min(float64(255), float64(v0.G)*s.val))
	v0.B = uint8(math.Min(float64(255), float64(v0.B)*s.val))

	return v0
}

func (v0 RGBVector) mulVec(v1 RGBVector) RGBVector {
	R := v0.R * v1.R
	G := v0.G * v1.G
	B := v0.B * v1.B

	if R > 255 {
		v0.R = uint8(255)
	} else {
		v0.R = uint8(R)
	}

	if G > 255 {
		v0.G = uint8(255)
	} else {
		v0.G = uint8(G)
	}

	if B > 255 {
		v0.B = uint8(255)
	} else {
		v0.B = uint8(B)
	}

	v0.R = R
	v0.G = G
	v0.B = B

	return v0
}

type SingleData interface {
	mulSc(sc Scalar) RGBVector
	mulVec(v1 RGBVector) RGBVector
	addSc(sc Scalar) RGBVector
	addVec(v1 RGBVector) RGBVector
}
