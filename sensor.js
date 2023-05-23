class Sensor{
    constructor(car){
        this.car=car;
        this.rayCount=5;
        this.rayLength=150;
        this.raySpread=Math.PI/2;

        this.rays=[];
        this.readings=[];

    }

    draw(ctx){
        for(let i=0;i<this.rayCount;i++){
            let end=this.rays[i][1];
            if(this.readings[i]){
                end=this.readings[i];
            }
            ctx.beginPath();
            ctx.lineWidth=2;
            ctx.strokeStyle="yellow";
            ctx.moveTo(
                this.rays[i][0].x,
                this.rays[i][0].y

            );
            ctx.lineTo(
             //   this.rays[i][1].x,
             //   this.rays[i][1].y
                end.x,
                end.y
            );
            ctx.stroke();
// copied from ctx.beginpath() to end.y and pasted them in here since we want to know where the ray casting line would have continued
            ctx.beginPath();
            ctx.lineWidth=2;
            ctx.strokeStyle="black";
            ctx.moveTo(
                this.rays[i][1].x,
                this.rays[i][1].y

            );
            ctx.lineTo(
             //   this.rays[i][1].x,
             //   this.rays[i][1].y
                end.x,
                end.y
            );    

        }
    }
    

    update(roadBorders,traffic){
        this.#castRays();
        this.readings=[];
        for(let i=0;i<this.rays.length;i++){
            this.readings.push(
                this.#getReading(this.rays[i],roadBorders,traffic)
            );
        }
    }
    #getReading(ray,roadBorders,traffic){
        let touches=[];

        for(let i=0;i<roadBorders.length;i++){
            const touch=getIntersection(
                ray[0],
                ray[1],
                roadBorders[i][0],
                roadBorders[i][1]
            );
            if(touch){
                touches.push(touch);        //if there is a touch, this adds to the touches
            }
        }

        for(let i=0;i<traffic.length;i++){
            const poly=traffic[i].polygon;
            for(let j=0; j<poly.length;j++){
                const value=getIntersection(ray[0],ray[1],poly[j],poly[(j+1)%poly.length]);
                if(value){
                    touches.push(value);
                }
            }
        }

        if(touches.length==0){
            return null;
        }else{
            const offsets=touches.map(e=>e.offset);
            const minOffset=Math.min(...offsets);
            return touches.find(e=>e.offset==minOffset);

        }
    }
    
    
    #castRays(){
        this.rays=[];
        for(let i=0;i<this.rayCount;i++){
            const rayAngle=lerp(            //using the lerp-- linear interpolation function
                this.raySpread/2,           // line represents "A" from lerp function, refer in utils.js
                -this.raySpread/2,          // line represents "B" from lerp function, refer in utils.js
            //  i/(this.rayCount-1)         // line represents "t" from lerp function, refer in utils.js  REPLACED WITH BELOW
                this.rayCount==1?0.5:i/(this.rayCount-1)

            )+this.car.angle;

            const start={x:this.car.x, y:this.car.y};
            const end={
                x:this.car.x-
                    Math.sin(rayAngle)*this.rayLength,
                y:this.car.y-
                    Math.cos(rayAngle)*this.rayLength    

            };
            this.rays.push([start,end]);
        }
        

       
    }

 
}
