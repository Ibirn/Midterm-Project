$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for (const user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });

});
