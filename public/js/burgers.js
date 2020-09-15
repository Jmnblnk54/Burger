// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  $(".change-devour").on("click", function(event) {
    let id = $(this).data("id");
    let newDevour = $(this).data("devour");

    let newlyDevoured = {
      devoured: newDevour
    };

    // Send the PUT request.
    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: newlyDevoured
    }).then(
      function() {
        console.log("changed devoured to ", newDevour);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $(".create-form").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    let newBurger = {
      burger_name: $("#bu").val().trim(),
    };

    // Send the POST request.
    $.ajax("/api/bugers", {
      type: "POST",
      data: newBurger
    }).then(
      function() {
        console.log("created new burger!");
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });
});
