package main

import (
	"encoding/json"
	"fmt"
	"led-animator/structs"
	"os"
	"strings"
	// "syscall/js"
)

// jsonStructs FILE! :)

// dataStructs FILE! :)

// nodeStructs FILE! :)))

// this FILE! :)

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

	//var tJsonStr string = `[{"tip":0,"node":{"tip":0,"scalar":2,"nextnode":66}}]`

	dat, _ := os.ReadFile("./input.json")
	fmt.Println(string(dat))

	node_factory(string(dat))

}

/* func compute(this js.Value, args []js.Value) interface{} {

	return js.Null()
} */

func node_factory(fullJson string) ([]interface{}, error) {

	// partial json parse (top json layer)
	var jsons []structs.JSONNode

	//fullJson = strings.ReplaceAll(fullJson, "\n", "")
	fullJson = strings.Join(strings.Fields(fullJson), " ")

	fmt.Println(fullJson)
	json.Unmarshal([]byte(fullJson), &jsons)

	fmt.Println("jnsons len: ", len(jsons))
	// save nodes to \"actual\" data

	// holds pointers to nodes: *struct.SomethingNode node[N]
	nodes := make([]interface{}, len(jsons))

	fmt.Println("Entered")

	for i := 0; i < len(jsons); i++ {
		fmt.Println("i: ", i)
		fmt.Println("with json node str: ", jsons[i].Node)
		var err error
		nodes[i], err = set_get_node(jsons[i].Node, jsons[i].Tip)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}
	}

	return nodes, nil
}

func set_get_node(json_string string, tip int16) (interface{}, error) {
	fmt.Printf("DEBUG:	created..")
	switch tip {
	case 0:
		node := new(structs.ScalarCreatorNode)
		fmt.Println("of_json_str: ", json_string)
		json.Unmarshal([]byte(json_string), node)
		fmt.Println("DEBUG:	scalar_node:", node.Tip, " ", node.Scalar, " nn", node.Nextnode)
		return node, nil
	case 1:
		node := new(structs.ColorApplyerNode)
		json.Unmarshal([]byte(json_string), node)
		fmt.Println("DEBUG:	color_applyer_node: ", node.Color, " ", node.Color.R, " nn", node.Nextnode)
		return node, nil
	case 2:
		node := new(structs.ColorCreatorNode)
		json.Unmarshal([]byte(json_string), node)
		fmt.Println("DEBUG:	color_creator_node: ", node.Tip, " (", node.R, ",", node.G, ",", node.B, ")", " nn", node.Nextnode)
		return node, nil
	default:
		return nil, fmt.Errorf("Enga tipa, ki predstaula nek node, nimas u switchu v set_get_node... brt")
	}
}
