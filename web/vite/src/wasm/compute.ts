const go = new Go();

// | Go                     | JavaScript             |
// | ---------------------- | ---------------------- |
// | js.Value               | [its value]            |
// | js.TypedArray          | typed array            |
// | js.Func                | function               |
// | nil                    | null                   |
// | bool                   | boolean                |
// | integers and floats    | number                 |
// | string                 | string                 |
// | []interface{}          | new array              |
// | map[string]interface{} | new object             |

interface LED {
  r: number;
  g: number;
  b: number;
}

export class wasmCompute {
  instance: WebAssembly.WebAssemblyInstantiatedSource | null = null;

  constructor() {}

  async init(): Promise<void> {
    return WebAssembly.instantiateStreaming(
      fetch("wasm/main.wasm"),
      go.importObject
    ).then((result) => {
      go.run(result.instance);
      this.instance = result;
      // @ts-ignore
      // alert(wasmHash("a"));
    });
  }

  hash(a: string): string {
    // @ts-ignore
    if (this.instance != null && wasmHash) {
      // @ts-ignore
      return wasmHash(a);
    }
    return "!! not initialized !!";
  }

  wave(i: number, leds: number): Uint8Array {
    // @ts-ignore
    if (this.instance != null && wasmHash) {
      // @ts-ignore
      return wasmWave(i, leds);
    }
    return new Uint8Array(0);
  }

  noise1D(start: number, scale: number, size: number): Uint8Array {
    // @ts-ignore
    if (this.instance != null && wasmHash) {
      // @ts-ignore
      return wasmNoise(start, scale, size);
    }
    return new Uint8Array(0);
  }
}
