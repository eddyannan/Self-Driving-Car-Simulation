class Level{
    constructor(inputCount,outputCount){
        this.inputs=new Array(inputCount);
        this.outputs=new Array(outputCount);
        this.biases=new Array(outputCount);

        this.weights=[];
        for(let i=0;i<inputCount;i++){
            this.weights[i]=new Array(outputCount);
        }
        Level.#randomize(this);
    }
    static #randomize(level){
        for(let i=0;i<level.inputs.length;i++){
            for(let j=0;)
        }
    }
}
