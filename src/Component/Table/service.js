
export const renewColumn = ({ schemaColumn, module, userId }) => {

    //reorder column
    let key = `tables__${module}__${userId}`
    let schema = []
    let oldSchema = localStorage.getItem(key)
    if (oldSchema !== null && oldSchema !== undefined) {
        let schemaOrder = JSON.parse(oldSchema)
        schemaColumn.map((data, idx) => {
            let schemaOrderIndex = schemaOrder.indexOf(data.accessor);
            schema[schemaOrderIndex] = data
        })
    } else {
        schema = schemaColumn
    }

    return schema;
};

export const setDraggableColumn = ({ schemaColumn }) => {
    let listHeader = schemaColumn.map((data, idx) => {
        return data.accessor
    });
    return listHeader
};

export const saveSchemaToLocal = ({
    userId,
    schemaColumn,
    draggedColumn,
    targetColumn,
    oldIndex,
    newIndex,
    module
}) => {
    //get old schema from local storage data , if null then set schemaColumn as oldSchema 
    let key = `tables__${module}__${userId}`
    let newSchemaOrder = []
    let oldSchema = localStorage.getItem(key)
    if (oldSchema === null || oldSchema === undefined) {
        oldSchema = schemaColumn.map((data, index) => {
            return data.accessor
        })
    } else {
        let tmp = oldSchema
        oldSchema = JSON.parse(oldSchema)
    }
    let length = oldSchema.length

    //move item from old schema to newschema
    newSchemaOrder[newIndex] = oldSchema[oldIndex]
    oldSchema.splice(oldIndex, 1)

    //reorder     
    let i = 0
    while (i < length) {
        if (i < newIndex) {
            //index before new index, position will same
            newSchemaOrder[i] = oldSchema[i]
        } else if (i == newIndex) {
            //index == newindex, abaikan
            i++;
            continue;
        } else {
            //index after newindex, index-1
            newSchemaOrder[i] = oldSchema[i - 1]
        }
        i++;
    }

    //set to local storage
    localStorage.removeItem(key)
    localStorage.setItem(key, JSON.stringify(newSchemaOrder))

}; 