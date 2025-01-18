document.querySelector('.explore-btn').addEventListener('click', () => {
  document.querySelector('.camel').classList.add('active');

  // Crear algunos elementos para el efecto de gravedad
  for (let i = 0; i < 5; i++) {
    const element = document.createElement('div');
    element.classList.add('element');
    document.querySelector('.camel').appendChild(element);

    // Posicionar los elementos aleatoriamente
    element.style.top = `${Math.random() * 80 + 10}%`;
    element.style.left = `${Math.random() * 80 + 10}%`;
  }

  // Agregar movimiento
  document.addEventListener('mousemove', (event) => {
    let x = event.clientX;
    let y = event.clientY;

    let elements = document.querySelectorAll('.element');
    elements.forEach((element, index) => {
      let speed = (index + 1) * 0.05;
      let offsetX = (x - window.innerWidth / 2) * speed;
      let offsetY = (y - window.innerHeight / 2) * speed;

      element.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    });
  });
});
