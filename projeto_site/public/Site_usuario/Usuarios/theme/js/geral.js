function aguardar() {
  swal({
    title: "Aguarde!",
    text: "   ",
    icon: "info",
    buttons: false,
    timer: 3000,
  });
}

function aguardar_consulta(texto) {
  swal({
    title: texto,
    text: "   ",
    icon: "info",
    buttons: false,
    timer: 4000,
    closeOnClickOutside: false,
  });
}