const url_search =
  "https://www.superheroapi.com/api.php/407786381624197/search/";

$(function () {
  $(".buscar_superhero_wrapper_input_group").on("submit", function (evento) {
    evento.preventDefault();
    const valor_input = $("#input_nombre_superhero").val();
    if (valor_input.length == 0) {
      Swal.fire({
        icon: "warning",
        title: "ADVERTENCIA",
        text: "Debes Ingresar algún nombre",
      });
    } else {
      $.ajax({
        type: "GET",
        url: `${url_search}${valor_input}`,
        dataType: "json",
        success: function (response) {
          if (response.response == "success") {
            let dataIds = "";
            response.results.forEach((obj) => {
              dataIds += "<li> id:" + obj.id + "</li>";
            });
            $(".id_resultado").html(dataIds);
          } else {
            Swal.fire({
              icon: "error",
              title: "ERROR",
              text: "Caracter con el nombre dado no ha sido encontrado",
            });
            $(".id_resultado").html("ID");
            $("#input_nombre_superhero").val("");
          }
        },
        error: function (error) {
          alert("No existe data para el Super Heroe ingresado");
        },
      });
    }
  });
});
