import CacheStateMediator from "../../mediator/CacheStateMediator";

export default class GeometryGL{
    constructor() {
        this.attributes = {};
        this.indices =null;
        this.VAO = null;
        this.needsUpdateVAO = null;
        this.drawSize = 0;
    }

    parse(state,cache,geometry, materialType) {

        //uuid should have geometry and vs shader to decide

        let uuid = geometry.UUID + materialType
            ,bufferAttributes = geometry.attributes
            ,indexAttributes = geometry.indices;

        this.needsUpdateVAO = !Boolean(cache.getVAO(uuid));
        this.VAO = CacheStateMediator.loadVAOFromCache({state,cache,uuid});
        this.drawSize = indexAttributes.data.length;

        if(this.needsUpdateVAO||geometry.needsUpdate){
            geometry.needsUpdate = false;

            this.attributes = {};
            for(let attributeName in bufferAttributes){
                let bufferAttribute = bufferAttributes[attributeName];
                let name ="a_" + bufferAttribute.name;
                this.attributes[name] = CacheStateMediator.loadAttributeFromCache({
                    state
                    ,cache
                    ,uuid:uuid + name
                    ,bufferAttribute
                    ,isIndices:false
                });
            }
            this.indices = CacheStateMediator.loadAttributeFromCache({
                state
                ,cache
                ,uuid:uuid + "indices",data:indexAttributes.data
                ,bufferAttribute:indexAttributes
                ,isIndices:true
            });
        }

    }
}
