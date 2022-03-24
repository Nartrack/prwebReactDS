/**
    ------------------------------------------
    myScript.js
    
    javascript functions for practical work
    
    JY Martin, JM Normand
    Ecole Centrale Nantes
    ------------------------------------------
*/

/**
    returnBorrow
    user returns a book
    @param buttonRef
    @param borrowId
*/

function returnBorrow(buttonRef, borrowId) {
    if (borrowId > 0) {
        // Collect data - empty
        
        // Ajax call
        $.ajax({
            url:"returnBorrow.do",
            method:"POST",
            data:{
                "id": borrowId,
            },
            success: function (theResult) {
                if (buttonRef !== null) {
                    var refTD = buttonRef.parentElement;
                    if (refTD !== null) {
                        // Remove button
                        refTD.removeChild(buttonRef);
                        // Set return date
                        var currentDate = new Date(((Date)(theResult.returnedValue)));
                        var currentDateStr = currentDate.toLocaleDateString();
                        var text = document.createTextNode(currentDateStr);
                        refTD.appendChild(text);
                    }
                }
            },
            error: function(theResult, theStatus, theError) {
                console.log("Error : " + theStatus + " - " + theResult);
            }
        });
    }
}


