//====================================== datepicker ==================================================
//render the dropdown messageand handle user selection
function renderDatePicker() {
  inputs = function getInputValue(){
           var date = document.getElementById("datepicker").value;
           setUserResponse(date);
           send(date);

           $(".dropDownMsg").remove();
           }
  buttons = '<button id="butt" name="submit" type="submit" onclick="getInputValue();">submit</button>'
  var select = '<div class="dropDownMsg">' +
               '<input id="datepicker" type="date">' + buttons +
               '<script>' +
                inputs
               '</script>' +
               '</div>'
  $(".chats").append(select);
  scrollToBottomOfResults();
}