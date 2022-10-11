package nodes_test

import (
	"fmt"
	"led-animator/pkg/nodes"
	"testing"
)

func TestNekaj(t *testing.T) {
	for i := 0; i < 50; i++ {
		fmt.Println(nodes.Noise1D(float64(i), 0.05, 5))
	}
}
