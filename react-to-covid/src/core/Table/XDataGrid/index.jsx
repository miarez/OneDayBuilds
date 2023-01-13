
const filterByColumnMapping = (dataFrame, columnMapping) => {

    for (var i = 0; i < dataFrame.length; i++) { 
      let row = dataFrame[i];
      dataFrame[i] = Object.keys(row)
      .filter(key => columnMapping[key])
      .reduce((obj, key) => {
        obj[columnMapping[key]] = row[key];
        return obj;
      }, {});

     }
     return dataFrame;    
}


const generateColumnConfiguration = (dataFrame) => {
    const columns = [];
    Object.values(Object.keys(dataFrame[0])).forEach(val => {
        columns.push(
            {
                field:val,
                headerName: val,
                flex: 1
            }
        )
    });
    return columns
}

export { filterByColumnMapping, generateColumnConfiguration }




