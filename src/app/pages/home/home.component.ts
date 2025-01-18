import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private gravityEffectActive = false;  // Variable para controlar si el efecto está activo
  private moveInterval: any;            // Para almacenar el intervalo y poder detenerlo
  private flickerInterval: any;

  constructor() { }

  ngOnInit(): void {
    this.addEffects();
  }

  addEffects() {
    const exploreBtn = document.querySelector('.explore-btn') as HTMLElement;

    // Añadir evento de click al botón de "Explore"
    if (exploreBtn) {
      exploreBtn.addEventListener('click', () => {
        if (this.gravityEffectActive) {
          this.stopEffects();
        } else {
          this.startEffects();

        }
      });
    }
  }


startEffects() {
  // Si ya está activo el efecto, no reiniciar
  if (this.gravityEffectActive) {
    return;
  }

  this.gravityEffectActive = true;
  document.querySelector('.camel')?.classList.add('active');

  // Reproducir el sonido al activar el efecto
  const gravitySound = document.getElementById('gravitySound') as HTMLAudioElement;
  gravitySound.play();

  // Crear algunos elementos para el efecto de gravedad (si lo deseas)
  for (let i = 0; i < 5; i++) {
    const element = document.createElement('div');
    element.classList.add('element');
    document.querySelector('.camel')?.appendChild(element);

    // Posicionar los elementos aleatoriamente dentro de la pantalla
    element.style.top = `${Math.random() * 80 + 10}%`;
    element.style.left = `${Math.random() * 80 + 10}%`;
  }

  // Mover los elementos cada 800ms
  if (!this.moveInterval) {  // Asegúrate de que no haya un intervalo activo previamente
    this.moveInterval = setInterval(() => {
      const elements = document.querySelectorAll('.camel h1, .camel h2, .camel p, .camel .element, .camel .explore-btn');

      elements.forEach((element) => {
        const randomX = Math.random() * (window.innerWidth - 100); // Movimiento aleatorio en el eje X
        const randomY = Math.random() * (window.innerHeight - 100); // Movimiento aleatorio en el eje Y

        const speed = 0.2;
        (element as HTMLElement).style.transition = 'transform 2s ease-out';
        (element as HTMLElement).style.transform = `translate(${randomX * speed}px, ${randomY * speed}px)`;
      });
    }, 800);
  }

  const container = document.querySelector('.camel');
  if (!container) {
    console.error('Contenedor .camel no encontrado');
    return;
  }

  // Limpiar los círculos existentes antes de crear nuevos
  const existingCircles = document.querySelectorAll('.circle');
  existingCircles.forEach(circle => circle.remove());

  // Crear círculos nuevos
  for (let i = 0; i < 50; i++) {
    const circle = document.createElement('div');
    circle.classList.add('circle');
    container.appendChild(circle);

    // Posición aleatoria dentro de la pantalla
    const topPos = Math.random() * 100;
    const leftPos = Math.random() * 100;

    // Tamaño aleatorio entre 50px y 150px
    const size = Math.random() * (150 - 50) + 50;
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;

    circle.style.top = `${topPos}%`;
    circle.style.left = `${leftPos}%`;

    circle.style.position = 'absolute';
    circle.style.zIndex = '1000';  // Asegura que se vean sobre otros elementos

    circle.style.border = '1px solid white';
    circle.style.zIndex = '1000';
  }

  // Intervalo para encender y apagar los círculos
  if (!this.flickerInterval) {  // Asegúrate de que no haya un intervalo activo previamente
    this.flickerInterval = setInterval(() => {
      const circles = document.querySelectorAll('.circle');
      circles.forEach((circle) => {
        const isVisible = Math.random() > 0.5;
        (circle as HTMLElement).style.opacity = isVisible ? '1' : '0';
      });
    }, 500); // Cambia la visibilidad cada 500ms
  }
}

stopEffects() {
  this.gravityEffectActive = false;
  document.querySelector('.camel')?.classList.remove('active');

  // Detener el movimiento eliminando el intervalo
  if (this.moveInterval) {
    clearInterval(this.moveInterval);
    this.moveInterval = null; // Limpiar el intervalo
  }

  // Detener el parpadeo eliminando el intervalo
  if (this.flickerInterval) {
    clearInterval(this.flickerInterval);
    this.flickerInterval = null; // Limpiar el intervalo
  }

  // Detener el sonido si está sonando
  const gravitySound = document.getElementById('gravitySound') as HTMLAudioElement;
  gravitySound.pause();

  // Eliminar los elementos creados
  document.querySelectorAll('.element').forEach((element) => {
    element.remove();
  });

  document.querySelectorAll('.circle').forEach((circle) => {
    circle.remove();
  });
}


}
