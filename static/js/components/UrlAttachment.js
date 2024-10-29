/**
 * renders pdf attachment on to the chat screen
 * @param {Object} pdf_data json object
 */
function renderUrlAttachment(url_data) {
  const { url: link_url } = url_data.custom;
  const { title: link_title } = url_data.custom;
  const url_attachment = `<div class="url_attachment"><div class="row"><div class="col s3 url_icon">
<i class="fa fa-link" aria-hidden="true"></i></div><div class="col s9 url_link"><a href="${link_url}" target="_blank">
${link_title} </a></div></div></div>`;

  $(".chats").append(url_attachment);
  scrollToBottomOfResults();
}

