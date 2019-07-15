export default class BufferAttribute{
   constructor({name,data,componentNum}){
       this.name = name;
       this.data = data;//TypeArray
       this.componentNum = componentNum;
       this.needsUpdate = true;
   }
   update(){
       this.needsUpdate = false;
   }
}
