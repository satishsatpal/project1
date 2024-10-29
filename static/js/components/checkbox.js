/**
 * appends custom checkboxes onto the chat screen
 * @param {Array} quickRepliesData json array
 */
function showcheckboxes(checkboxdata) {
    let checkboxes = "";
    for (let i = 0; i < checkboxdata.length; i += 1) {
        const checkbox = `<label class="checkbox-container">${checkboxdata[i].title}
                            <input type="checkbox" class="customCheckbox" data-payload='${checkboxdata[i].payload}'>
                            <span class="checkmark"></span>
                          </label>`;
        checkboxes += checkbox;
    }

    const checkboxes = `<div class="checkboxes">${checkboxes}</div>`;
    $(checkboxes).appendTo(".chats").fadeIn();
    scrollToBottomOfResults();

    // Handle checkbox change
   $(".customCheckbox").on("change", function () {
        if ($(this).prop("checked")) {
            const payload = $(this).attr("data-payload");
            // Append payload to the chat screen
            appendPayloadToChat(payload);
        }
    });
}

// Function to append payload to the chat screen
function appendPayloadToChat(payload) {
    // You can customize this function to append the payload to the chat screen
    // For example, you might want to display it in a message bubble or perform some other action
    console.log("Checkbox payload: ", payload);
    // Implement the logic to append the payload to the chat screen here
    
    $(document).on("click", ".checkboxes .checkbox", function () {
    const text = this.innerText;
    const payload = this.getAttribute("data-payload");
    console.log("chip payload: ", this.getAttribute("data-payload"));
    setUserResponse(text);
    send(payload);
    $(this).prop('disabled', true);

    // delete the quickreplies
    $(".checkboxes").remove();
    //$(".chips").remove();
}

