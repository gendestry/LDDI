package nodes

import (
	"syscall/js"

	"github.com/ojrac/opensimplex-go"
	//"math/rand"
)

func Noise1D(start float64, scale float64, size int) []float64 {
	noise := opensimplex.NewNormalized(5)

	heightmap := make([]float64, size)
	for x := 0; x < size; x++ {
		xFloat := float64(start+float64(x)) * scale
		heightmap[x] = noise.Eval2(xFloat, 0)
	}
	return heightmap
}

func Noise1Dw(this js.Value, args []js.Value) interface{} {
	start := float64(args[0].Int())
	scale := float64(args[1].Int())
	size := args[2].Int()
	out := make([]interface{}, size*4)

	for i := 0; i < size; i++ {
		a := Noise1D(i, scale, 1)
	}

	return out
}
