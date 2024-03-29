function edit_post_ajax()
{
    if (document.getElementById('edit_post_field').value.trim() && document.getElementById('edit_post_field').value.trim().length <= 200)
    {
      $.ajax({
          method: 'post',
          url: $("#edit_post_form").attr('action'),
          dataType: 'json',
          data: $('#edit_post_form').serialize(),
          success: function(response) {
            $('p').filter(function() {
                return this.id.match(response.post_id + "post_body");
              }).remove();
            $('a').filter(function() {
                return this.id.match(response.post_id + "edit_post_a");
              }).remove();
             

            html = `  <p class="message__text" id="${response.post_id}post_body">
                        ${response.post_body} <!--Сообщение пользователя-->
                      </p>`;
            div = document.getElementById(response.post_id + 'base_to_answer');
            if (div)
            {
              div.insertAdjacentHTML('afterend', html);
            }
            else
            {
              div = document.getElementById(response.post_id + 'msg_write_id');
              div.insertAdjacentHTML('afterbegin', html);
            }
            div_ = document.getElementById(response.post_id + 'answer_on');
            html = `<a class="message__admin-btn" id="${response.post_id}edit_post_a" data-url="/${response.username}/edit_post/${response.topic_id}/${response.post_id}" data-body="${response.post_body}">Редактировать</a>`;
            div_.insertAdjacentHTML('afterend', html)
            document.getElementById("edit_post_field").value = "";
            document.getElementById("edit_post_sec").style.display = "none";
          },
          error: function(jqXHR, exception) {
              if (exception === 'parsererror')
              {
                  window.location.href = '/auth/login';
              }
              else
              {
                  console.log(exception);
              }
          }
      });
    }
    else if (document.getElementById('edit_post_field').value.trim().length > 200)
    {
      alert('Слишком длинный пост');
    }
    else
    {
      alert('Заполните поле');
      document.getElementById('edit_post_field').value = '';
    }
}

$(function() {
  $('#edit_post_form').submit(function(event) {
      edit_post_ajax();
      event.preventDefault();
  });

  $('#disc_posts_container').on('click', function(event) {
    let target = event.target;
    if (target.tagName === 'A' && target.id.includes('edit_post_a'))
    {
      let url_path = target.dataset?.url;
      let post_body = target.dataset?.body;
      document.getElementById("edit_post_sec").style.display = "block";
      document.getElementById("edit_post_field").value = post_body;
      form = document.getElementById("edit_post_form");
      form.setAttribute("action", url_path);
    }
  });

  $('#close_edit_post_form').click(function(event) {
    document.getElementById("edit_post_field").value = "";
    document.getElementById("edit_post_sec").style.display = "none";
  });
});



