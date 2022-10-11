package main

import (
	"crypto"
	_ "crypto/sha512"
	"encoding/hex"
	"fmt"
	"led-animator/pkg/nodes"
	"syscall/js"
)

func main() {
	done := make(chan struct{}, 0)
	js.Global().Set("wasmHash", js.FuncOf(hash))
	js.Global().Set("wasmWave", js.FuncOf(wave))
	js.Global().Set("wasmNoise", js.FuncOf(nodes.Noise1Dw))
	fmt.Println("wasm done")
	<-done
}

func hash(this js.Value, args []js.Value) interface{} {
	h := crypto.SHA512.New()
	h.Write([]byte(args[0].String()))

	return hex.EncodeToString(h.Sum(nil))
}

//   wave(i: number, leds: number, waveSize: number, steps: number): LED[][]
func wave(this js.Value, args []js.Value) interface{} {
	i := args[0].Int()
	numleds := args[1].Int()

	fmt.Println("wave", i, numleds)

	// byte aray of 4 * leds * steps
	// 4 bytes per LED
	// 1 byte per color
	// 1 byte per step
	out := make([]interface{}, numleds*4)

	// fill array with random data
	for j := 0; j < len(out); j += 4 {
		index := numleds*4*i + j

		// if j%4 == 0 {
		// 	out[j] = byte(index % 10)
		// } else {
		// 	out[j] = byte((index) % 255)
		// }
		// out[j-4] = index % numleds
		// out[j-3] = 0
		// out[j-2] = 0 //byte(index % 255)
		// out[j-1] = 0 // byte(index * 17)

		out[j] = index % 4
		const r, g, b = rgb2

		out[j+1] = index % 255
		out[j+2] = index % 255
		out[j+3] = index % 255
	}

	// a := fmt.Sprintf("%g", out[:])
	// a = strings.ReplaceAll(a, " ", "")
	// // a = strings.ReplaceAll(a, "]", "")
	// // fmt.Println("goout", a)
	return out
	// return string("012ÿ")
}
