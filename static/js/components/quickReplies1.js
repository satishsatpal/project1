function showQuickReplies(quickRepliesData) {
    let chips = "";
    for (let i = 0; i < quickRepliesData.length; i += 1) {
        const chip = `<div class="chip" data-payload='${quickRepliesData[i].payload}'>${quickRepliesData[i].title}</div>`;
        chips += chip;
    }

    const quickReplies = `<div class="quickReplies">${chips}</div><button class="submitQuickReplies">Submit</button><div class="clearfix"></div>`;
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

// Handle click on quick replies and submit button
$(document).on("click", ".quickReplies .chip", function () {
    $(this).toggleClass("selected");
});

$(document).on("click", ".submitQuickReplies", function () {
    const selectedChips = $(".quickReplies .chip.selected");
    const selectedPayloads = [];

    selectedChips.each(function () {
        const text = $(this).text();
        const payload = $(this).attr("data-payload");
        setUserResponse(text);
        selectedPayloads.push(payload);
    });

    // send all selected payloads
    send(selectedPayloads);

    // delete the quick replies
    $(".quickReplies").remove();
});

