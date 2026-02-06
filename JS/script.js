// 1. Lógica da Navbar (Aparecer ao rolar)
        const navbar = document.querySelector('.navbar');
        const heroSection = document.querySelector('.hero');
        
        if (navbar && heroSection) { // Verificação de segurança
            window.addEventListener('scroll', () => {
                const heroHeight = heroSection.offsetHeight - 100;
                if (window.scrollY > heroHeight) {
                    navbar.classList.add('visible');
                } else {
                    navbar.classList.remove('visible');
                }
            });
        }

        // 2. Menu Mobile Full Screen com Trava de Scroll
        const hamburger = document.querySelector(".hamburger");
        const navMenu = document.querySelector(".nav-menu");
        const navLinks = document.querySelectorAll(".nav-link");
        const body = document.querySelector("body");

        if (hamburger) {
            hamburger.addEventListener("click", () => {
                hamburger.classList.toggle("active");
                navMenu.classList.toggle("active");
                body.classList.toggle("no-scroll");
            });

            navLinks.forEach(n => n.addEventListener("click", () => {
                hamburger.classList.remove("active");
                navMenu.classList.remove("active");
                body.classList.remove("no-scroll");
            }));
        }

        // 3. Scroll Reveal Animation
        const revealElements = document.querySelectorAll('.reveal');
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.15 });

        revealElements.forEach(el => revealObserver.observe(el));

        // 4. (CORREÇÃO REFORÇADA) Reset total de URL e Scroll
        
        // A. Desliga a memória de scroll do navegador imediatamente
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }

        // B. Garante que ao sair da página (antes do refresh completar), ele já suba
        window.onbeforeunload = function () {
            window.scrollTo(0, 0);
        }

        // C. Ao carregar, força o topo novamente e limpa a URL
        window.addEventListener('load', () => {
            // Limpa o Hash da URL (ex: #contato) sem recarregar
            if (window.location.hash) {
                history.replaceState(null, null, window.location.pathname);
            }

            // O setTimeout é o segredo: espera o navegador tentar restaurar a posição
            // e força o topo logo em seguida (10ms é imperceptível para o olho humano)
            setTimeout(() => {
                window.scrollTo(0, 0);
            }, 10);
        });