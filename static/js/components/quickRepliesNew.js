/**
 * appends horizontally placed buttons carousel
 * on to the chat screen
 * @param {Array} quickRepliesData json array
 */

 

function showQuickRepliesNew(quickRepliesNewData) {
    let chips = "";
    const folderPath = "/media/atdesk-64/D/satish/RASA/PAMB/PAMB_Agency/static/js/components/icons"
    
    for (let i = 0; i < quickRepliesNewData.length; i += 1) {
        const imagePath = `${folderPath}/${i}.png` //`${folderPath}/${i}.png`
        const chip = `<div class="chip" data-payload='${quickRepliesNewData[i].payload}'>
        <img src='${imagePath}' alt='Button Image' class='button-image'>
        ${quickRepliesNewData[i].title}</div>`;
        
        chips += chip;
    }
    

    const quickRepliesNew = `<div class="quickRepliesNew">${chips}</div><div class="clearfix"></div>`;
    $(quickRepliesNew).appendTo(".chats").fadeIn();
    scrollToBottomOfResults();
    const slider = document.querySelector(".quickRepliesData");
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


$(document).on("click", ".quickRepliesNew .chip", function () {
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
        if (selectedChips.length < 3) {
            // If less than two selected, add this chip to the selected ones
            selectedChips.push(payload);
            $(this).addClass("selected");
        }
    }

    // If three chips are selected, perform your desired action
    if (selectedChips.length === 3) {
        // Do something with the selected chips, e.g., send to Rasa
        console.log("chip payload: ", this.getAttribute("data-payload"));

        // Using forEach loop
        // let outputString = '';
        // selectedChips.forEach((i, index) => {
        // outputString += `${index + 1}. ${i}\n\n`;
        // });
        let outputString = 'My top three priorities are: </br></br>';

        for (let i = 0; i < selectedChips.length; i++) {
        outputString += `${i + 1}. ${selectedChips[i]} </br>`;
        }
        
        console.log(outputString);

        etext.push(selectedChips);
        const combinedText = selectedChips.join(' ');
        setUserResponse(outputString);

        epayload.push(selectedChips);
        //const combinedPayload1 = epayload.join(' ');
        //console.log("Combined payload1: ", combinedPayload1);
        const combinedPayload = selectedChips.join(',');
        //setUserResponse(combinedPayload);
        send(combinedPayload);
        console.log("Combined payload: ", combinedPayload);
        //$(this).prop('disabled', true);

        console.log("Selected chips: ", selectedChips);
        // Reset the selected chips array
        selectedChips.length = 0;
        // Optionally, remove the quick replies from the screen
    	$(".quickRepliesNew").remove();

        
    }
});




