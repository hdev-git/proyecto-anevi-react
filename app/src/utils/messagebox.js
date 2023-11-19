import Swal from "sweetalert2";

const Simple = (text = "", type = "", time = 2000) => {
  /* Type o tipos de mensaje
    warning: Indica una alerta
    success: Indica que se realizo el proceso satisfactoriamente
    error: Indica que ha ocurrido un error
    info: Indica información
  */

  let colorBackground = "";
  let colorLetter = "";
  switch (type) {
    case "warning":
      colorBackground = "#EDE04D"; //  #ffeb3b
      colorLetter = "black";
      break;
    case "success":
      colorBackground = "#15CD72"; // #4CAF50
      colorLetter = "white";
      break;
    case "error":
      colorBackground = "#ED4F32"; // #f44336
      colorLetter = "white";
      break;
    case "info":
      colorBackground = "#288feb"; //#2196F3
      colorLetter = "white";
      break;
    default:
      //Declaraciones ejecutadas cuando ninguno de los valores coincide con el valor de la expresión
      break;
  }

  Swal.fire({
    position: "top-end",
    /* icon: type, */
    /* title, */
    showConfirmButton: false,
    padding: "1em",
    timer: time,
    background: colorBackground,
    /* text:"<p>prueba</p>", */
    html: `<p style='color:${colorLetter}'>${text}</p>`,
    showClass: {
      popup: "animate__animated animate__fadeInDown",
    },
    hideClass: {
      popup: "animate__animated animate__fadeOutUp",
    },
  });
};

const Confirm = (text = "", type = "warning", title = "¿Esta seguro?") => {
  /* -------------- Mensaje de confirmacion al cambio del estado -------------- */
  return Swal.fire({
    title: title,
    text: text,
    icon: type,
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Aceptar",
    cancelButtonText: "Cancelar",
    reverseButtons: true,
  });
};

const Message = (text = "", title = "Atención", type = "warning") => {
  /* -------------- Mensaje de confirmacion al cambio del estado -------------- */
  return Swal.fire({
    title: title,
    text: text,
    icon: type,
  });
};

const messagebox = {
  Simple,
  Confirm,
  Message,
};
export default messagebox;
