// Añade clase a body cuando se hace scroll
window.addEventListener("scroll", function() {
    if (window.scrollY > 180) {
        document.body.classList.add("scrolled");
    } else {
        document.body.classList.remove("scrolled");
    }
});

// Añade botones de scroll a la izquierda y derecha
// y oculta el scrolling-footer-container si hay menos de 5 hijos

document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll(".is-style-group-horizontal-scroll-btns").forEach((content) => {
        if (content.children.length > 1) {
            // Crear botones
            const rightBtn = document.createElement("button");
            rightBtn.classList.add("scrolling-button", "scrolling-button--right");
            rightBtn.innerHTML = "→";
            rightBtn.disabled = false;

            const leftBtn = document.createElement("button");
            leftBtn.classList.add("scrolling-button", "scrolling-button--left");
            leftBtn.innerHTML = "←";
            leftBtn.disabled = true;

            // Contenedor de botones
            const btnsContainer = document.createElement("div");
            btnsContainer.classList.add("scrolling-btns-container");
            btnsContainer.appendChild(leftBtn);
            btnsContainer.appendChild(rightBtn);
            
            // Barra de scroll
            const scrollBar = document.createElement("div");
            scrollBar.classList.add("scroll-bar");
            scrollBar.innerHTML = "<div class=\"scroll-progress\"></div>";

            // Contenedor principal
            const footerContainer = document.createElement("div");
            footerContainer.classList.add("scrolling-footer-container", "has-global-padding");
            footerContainer.appendChild(btnsContainer);
            footerContainer.appendChild(scrollBar);

            // Si hay menos de 5 hijos, añade clase para ocultar
            if (content.children.length < 5) {
                footerContainer.classList.add('scrolling-footer-container--hidden');
            }

            // Insertar después del contenido
            content.parentNode.insertBefore(footerContainer, content.nextSibling);
            
            // Insertar antes del contenido
            //content.parentNode.insertBefore(footerContainer, content);

            // Depuración
            console.log("Botones de scroll añadidos a:", content);

            // Lógica de scroll (igual que antes)
            function getScrollStep() {
                return window.innerWidth < 768 ? 400 : 288;
            }

            rightBtn.addEventListener("click", () => {
                const scrollContent = content;
                const scrollStep = getScrollStep();
                scrollContent.scrollLeft += scrollStep;
                leftBtn.disabled = false;
                if (scrollContent.scrollWidth - scrollContent.scrollLeft - scrollContent.clientWidth <= 0) {
                    rightBtn.disabled = true;
                }
                console.log("Scroll a la derecha:", scrollContent.scrollLeft);
            });

            leftBtn.addEventListener("click", () => {
                const scrollContent = content;
                const scrollStep = getScrollStep();
                scrollContent.scrollLeft -= scrollStep;
                rightBtn.disabled = false;
                if (scrollContent.scrollLeft <= 0) {
                    leftBtn.disabled = true;
                }
                console.log("Scroll a la izquierda:", scrollContent.scrollLeft);
            });

            const progress = footerContainer.querySelector('.scroll-progress');
            function updateProgress() {
                const maxScroll = content.scrollWidth - content.clientWidth;
                const percent = (content.scrollLeft / maxScroll) * 100;
                progress.style.width = `${percent}%`;
            }
            content.addEventListener('scroll', updateProgress);
        }
    });
});

// Añade drag para los elementos con scroll horizontal
document.addEventListener('DOMContentLoaded', (event) => {
    const sliders = document.querySelectorAll('.is-style-group-horizontal-scroll');
    let isDown = false;
    let startX;
    let scrollLeft;
  
    // Añade el evento a cada slider
    sliders.forEach(slider => {
        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.classList.add('active');
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });
        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.classList.remove('active');
        });
        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.classList.remove('active');
        });
        slider.addEventListener('mousemove', (e) => {
            if(!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 3; //scroll-fast
            slider.scrollLeft = scrollLeft - walk;
            console.log(walk);
        });
    });
  
  });

//Rank Math FAQ Dropdown
document.addEventListener('DOMContentLoaded', (event) => {
    const faqs = document.querySelectorAll('.rank-math-list-item');
    faqs.forEach(faq => {
        const question = faq.querySelector('.rank-math-question');
        question.addEventListener('click', () => {
            faq.classList.toggle('active');
        });
    });
});

// Sticky nav: añade la clase is-stuck a #services-nav-sticky cuando está pegado al top

document.addEventListener('scroll', function() {
  const sticky = document.getElementById('services-nav-sticky');
  if (!sticky) return;
  const rect = sticky.getBoundingClientRect();
  // Si usas top: 0 en CSS, esto es correcto:
  if (Math.abs(rect.top) <= 1) {
    sticky.classList.add('is-stuck');
  } else {
    sticky.classList.remove('is-stuck');
  }
});

// Toggle filtro: al hacer click en el botón dentro de .toggle-filter, alterna la clase filter-active en .btns-filter

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.toggle-filter').forEach(function(btn) {
    btn.addEventListener('click', function() {
      const filterBtns = document.querySelector('.btns-filter');
      if (filterBtns) {
        filterBtns.classList.toggle('filter-active');
      }
    });
  });
});
