export default class BufferAttribute{
   constructor({name,data,componentNum}){
       this.name = name;
       this.data = data;//TypeArray
       this.componentNum = componentNum;
       this.needsUpdate = true;
       this.attributesSubData = [];
   }
   addSubData(attributeSubData){
       this.attributesSubData.push(attributeSubData);
   }

   clearSubData(){
       this.subData = null;
   }
   update(){
       this.needsUpdate = false;
   }
}
