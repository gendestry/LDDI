package main

import (
	"encoding/json"
	"fmt"
	"led-animator/structs"
	"os"
	"strings"
	// "syscall/js"
)

var leds []structs.Led

var nodes []structs.NodeHandler
var starters []*structs.CreatorNode

const MAX_CREATOR_NODES int64 = 100
const MAX_NODES int32 = 200
const NLEDS int32 = 144

func main() {
	/* done := make(chan struct{}, 0)
	js.Global().Set("wasmHash", js.FuncOf(hash))
	js.Global().Set("wasmWave", js.FuncOf(wave))
	fmt.Println("wasm done")
	<-done */
	/* var jsonStr string = `
	[
		{
			"tip": 0,
			"node": "{
				"tip": 0,
				"scalar" : 2,
				"nextNode" : 66
			}"
		},
		{
			"tip": 0,
			"node": "{
				"tip": 0,
				"scalar" : 2,
				"nextNode" : 66
			}"
		},
		{
			"tip": 0,
			"node": "{
				"tip": 0,
				"scalar" : 2,
				"nextNode" : 66
			}"
		}
	]` */

	compute()

}

func init() {
	starters = make([]*structs.CreatorNode, MAX_CREATOR_NODES)
	nodes = make([]structs.NodeHandler, MAX_NODES)
	leds = make([]structs.Led, NLEDS)
}

func compute() interface{} {
	dat, _ := os.ReadFile("./input.json")
	fmt.Println(string(dat))

	// init nodes
	var err error
	nodes, err = init_nodes(string(dat), nodes)
	if err != nil { // block this iteration on error (it might not be computable)
		return leds
	}
	fmt.Println(nodes)

	for i := 0; i < len(nodes); i++ {
		fmt.Println(nodes[i])
	}

	return leds
}

/* func compute(this js.Value, args []js.Value) interface{} {

	return js.Null()
} */

func init_nodes(fullJson string, nodes []structs.NodeHandler) ([]structs.NodeHandler, error) {

	// partial json parse (top json layer)
	var jsons []structs.JSONNode

	//fullJson = strings.ReplaceAll(fullJson, "\n", "")
	fullJson = strings.Join(strings.Fields(fullJson), " ")

	fmt.Println(fullJson)
	json.Unmarshal([]byte(fullJson), &jsons)

	fmt.Println("jnsons len: ", len(jsons))
	// save nodes to \"actual\" data

	fmt.Println("Entered")

	for i := 0; i < len(jsons); i++ {
		fmt.Println("i: ", i)
		fmt.Println("with json node str: ", jsons[i].Node)

		temp, err := set_get_node(jsons[i].Node, jsons[i].Tip)

		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		// if node has changed completely (type change)
		if temp.GetType() != nodes[i].GetType() {
			temp.InitCnter()
			nodes[i] = temp
		} else {
			nodes[i].InitCnter()
			nodes[i].
		}

		nodes[i].SetAgainst(temp)
	}

	//fmt.Println(nodes)

	return nodes, nil
}

func set_get_node(json_string string, tip int16) (structs.NodeHandler, error) {
	fmt.Printf("DEBUG:	created..")
	var node_h structs.NodeHandler
	switch tip {
	case 0:
		node := new(structs.ScalarCreatorNode)
		fmt.Println("of_json_str: ", json_string)
		json.Unmarshal([]byte(json_string), node)
		fmt.Println("DEBUG:	scalar_node:", node.Tip, " ", node.Scalar, " nn", node.Nextnode)
		node_h = node
	case 1:
		node := new(structs.ColorApplyerNode)
		json.Unmarshal([]byte(json_string), node)
		fmt.Println("DEBUG:	color_applyer_node: ", node.Color, " ", node.Color.R, " nn", node.Nextnode)
		node_h = node
	case 2:
		node := new(structs.ColorCreatorNode)
		json.Unmarshal([]byte(json_string), node)
		fmt.Println("DEBUG:	color_creator_node: ", node.Tip, " (", node.R, ",", node.G, ",", node.B, ")", " nn", node.Nextnode)
		node_h = node
	default:
		return nil, fmt.Errorf("Enga tipa, ki predstaula nek node, nimas u switchu v set_get_node... brt")
	}
	return node_h, nil
}
