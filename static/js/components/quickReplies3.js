/**
 * appends horizontally placed buttons carousel
 * on to the chat screen
 * @param {Array} quickRepliesData json array
 */
function showQuickReplies(quickRepliesData) {
    let chips = "";
    for (let i = 0; i < quickRepliesData.length; i += 1) {
        const chip = `<div class="chip" data-payload='${quickRepliesData[i].payload}'>${quickRepliesData[i].title}</div>`;
        chips += chip;
    }

    const quickReplies = `<div class="quickReplies">${chips}</div><div class="clearfix"></div>`;
    $(quickReplies).appendTo(".chats").fadeIn();
    scrollToBottomOfResults();
    const slider = document.querySelector(".quickReplies");
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener("mousedown", (e) => {
        isDown = true;
        slider.classList.add("active");
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });
    slider.addEventListener("mouseleave", () => {
        isDown = false;
        slider.classList.remove("active");
    });
    slider.addEventListener("mouseup", () => {
        isDown = false;
        slider.classList.remove("active");
    });
    slider.addEventListener("mousemove", (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 3; // scroll-fast
        slider.scrollLeft = scrollLeft - walk;
    });
}

// on click of quickreplies, get the payload value and send it to rasa

const etext = [];
const epayload = [];
const selectedChips = []; // Array to store selected chips


$(document).on("click", ".quickReplies .chip", function () {
    const text = this.innerText;
    const payload = this.getAttribute("data-payload");

    // Check if the chip is already selected
    if (selectedChips.includes(payload)) {
        // If selected, unselect it
        const index = selectedChips.indexOf(payload);
        selectedChips.splice(index, 1);
        $(this).removeClass("selected");
    } else {
        // If not selected, check if there are already two selected chips
        if (selectedChips.length < 2) {
            // If less than two selected, add this chip to the selected ones
            selectedChips.push(payload);
            $(this).addClass("selected");
        }
    }

    // If two chips are selected, perform your desired action
    if (selectedChips.length === 2) {
        // Do something with the selected chips, e.g., send to Rasa
        console.log("chip payload: ", this.getAttribute("data-payload"));
        etext.push(selectedChips);
        const combinedText = selectedChips.join(' ');
        setUserResponse(combinedText);
        epayload.push(selectedChips);
        const combinedPayload = epayload.join(' ');
        //setUserResponse(combinedPayload);
        send(combinedPayload);
        $(".quickReplies").remove();
        //$(this).prop('disabled', true);

        console.log("Selected chips: ", selectedChips);
        // Reset the selected chips array
        selectedChips.length = 0;
        // Optionally, remove the quick replies from the screen
    
        $(this).prop('disabled', true);
    }
});
// $(document).slice(0, 2).$("#clickButton").on("click", ".quickReplies .chip", function () {
//     const text = this.innerText;
//     etext.push(text);
//     const payload = this.getAttribute("data-payload");
//     epayload.push(payload);
//     console.log("chip payload: ", this.getAttribute("data-payload"));
//     const combinedText = etext.join(' ');
//     setUserResponse(combinedText);
//     const combinedPayload = epayload.join(' ');
//     //setUserResponse(combinedPayload);
//     send(combinedPayload);
//     //$(this).prop('disabled', true);

//     // delete the quickreplies
//     $(".quickReplies").remove();
//     //$(".chips").remove();
// });


