class ValorID {
    static valor = null;
    static setValorID(valorInput) {
      ValorID.valor = +valorInput;
    }
    static getValorID() {
      return ValorID.valor;
    }
  }
  
  $(function () {
    $("#buscar_id_input").on("input", function (evento) {
      const caracterIngresado = evento.originalEvent.data;
      const dataIngresada = $(this).val();
  
      if (/^\d+$/g.test(caracterIngresado)) {
        $(this).val(dataIngresada.slice(0, -1) + caracterIngresado);
        this.setCustomValidity("");
        $(".mensaje_input_buscar_id").removeClass(
          "mensaje_input_buscar_id-invalido"
        );
      } else if (dataIngresada.length == 0) {
        this.setCustomValidity("Campo Vacio");
        $(".mensaje_input_buscar_id").addClass(
          "mensaje_input_buscar_id-invalido"
        );
      } else {
        if (caracterIngresado) {
          $(this).val(dataIngresada.slice(0, -1) + "");
        }
      }
      form.classList.add("was-validated");
    });
  
    $("#buscar_id_input").on("focus", function () {
      const dataIngresada = $(this).val();
      if (dataIngresada.length == 0) {
        this.setCustomValidity("Campo Vacio");
        $(".mensaje_input_buscar_id").addClass(
          "mensaje_input_buscar_id-invalido"
        );
      }
      form.classList.add("was-validated");
    });
    $("#buscar_id_input").on("blur", function (evento) {
      const dataIngresada = $(this).val();
      if (dataIngresada.length == 0) {
        this.setCustomValidity("Campo Vacio");
        $(".mensaje_input_buscar_id").addClass(
          "mensaje_input_buscar_id-invalido"
        );
      }
      form.classList.add("was-validated");
    });
  });
 
  
  const form = document.querySelector(".needs-validation");
  
  form.addEventListener(
    "submit",
    function (event) {
      event.preventDefault();
  
      event.stopPropagation();
      if (!form.checkValidity()) {
        $(".mensaje_input_buscar_id").addClass(
          "mensaje_input_buscar_id-invalido"
        );
        $(".show_superhero").slideUp(1000);
      } else {
        ValorID.setValorID($("#buscar_id_input").val());
        consultarID(ValorID.getValorID());
      }
  
      form.classList.add("was-validated");
    },
    false
  );
 
  function consultarID(valorID) {
    const url = "https://www.superheroapi.com/api.php/407786381624197/";
    $.ajax({
      type: "GET",
      url: `${url}${valorID}`,
      dataType: "json",
      success: function (response) {
        if (response.response == "success") {
          seteoInfoSuperHeroe(response);
          crearCanvas(response);
          $(".show_superhero").slideDown(1000, () =>
            $("#seccion_datos")[0].scrollIntoView({ behavior: "smooth" })
          );
        } else {
          Swal.fire({
            icon: "error",
            title: "ERROR",
            text: "No Encontrado",
          });
        }
      },
      error: function (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Ha ocurrido un Error al consultar la URL",
        });
      },
    });
  }
  
  function seteoInfoSuperHeroe(dataResponse) {
    const imagenURL = dataResponse.image?.url;
    const nombre = dataResponse.name;
    const conexiones = dataResponse.connections["group-affiliation"];
    const publicado = dataResponse.biography?.publisher;
    const ocupacion = dataResponse.work?.occupation;
    const primeraAparicion = dataResponse.biography["first-appearance"];
    const altura = dataResponse.appearance.height.join("-");
    const peso = dataResponse.appearance.weight.join("-");
    const alianzas = dataResponse.biography.aliases.join(", ");
    $(".contenedor_image_card--img").attr("src", imagenURL);
    $(".contenedor_image_card--nombre").html(nombre);
    $(".contenedor_image_card--conexiones").html(conexiones);
    $(".contenedor_image_card--publicado").html(publicado);
    $(".contenedor_image_card--ocupacion").html(ocupacion);
    $(".contenedor_image_card--aparicion").html(primeraAparicion);
    $(".contenedor_image_card--altura").html(altura);
    $(".contenedor_image_card--peso").html(peso);
    $(".contenedor_image_card--alianzas").html(alianzas);
  }
  
 
  function crearCanvas(dataResponse) {
    const { intelligence, strength, speed, durability, power, combat } =
      dataResponse.powerstats;
  
    if (
      intelligence === "null" ||
      strength === "null" ||
      speed === "null" ||
      durability === "null" ||
      power === "null" ||
      combat === "null"
    ) {
      $(".contenedor_canvas").html(
        "No existe suficiente data de Estadisticas de Poderes"
      );
      $(".contenedor_canvas").height("auto");
    } else {
      const options = {
        title: {
          text: `Estadisticas de Poder para ${dataResponse.name}`,
        },
        animationEnabled: true,
        data: [
          {
            type: "pie",
            startAngle: 40,
            toolTipContent: "<b>{label}</b>: {y}%",
            showInLegend: "true",
            legendText: "{label}",
            indexLabelFontSize: 16,
            indexLabel: "{label} - {y}%",
            dataPoints: [
              { y: +intelligence, label: "Intelligence" },
              { y: +strength, label: "Strength" },
              { y: +speed, label: "Speed" },
              { y: +durability, label: "Durability" },
              { y: +power, label: "Power" },
              { y: +combat, label: "Combat" },
            ],
          },
        ],
      };
      $(".contenedor_canvas").height("400px");
      $(".contenedor_canvas").CanvasJSChart(options);
    }
  }
  