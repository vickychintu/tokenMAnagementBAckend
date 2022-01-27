/* 
    This function is used to verify wether a data exists in the database
*/
var docName; //string to store value of the document
var selectionParameters; //object containing the parameters with their respective values

var deleteDb = (documentName, parameters) => {
  /*
        1)check if a collection with specified parameters exist in the specified document
        2)handel errors if any
        3)if exist && no error
            -return true and count of collection that match th eabove mentioned filterations.
        4)else if does not exist
            -return false
        5)else if error 
            -return error status
    */
};

module.exports = deleteDb;
