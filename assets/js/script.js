/* Venado Partners | landing page behaviour
   No dependencies. Everything degrades to a readable static page. */

(function () {
    'use strict';

    var reduceMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
    ).matches;

    /* ------------------------------------------- header, progress, parallax */
    var header = document.getElementById('siteHeader');
    var progressBar = document.getElementById('progressBar');
    var parallaxTargets = [
        { img: document.getElementById('heroImg'), depth: 0.07 },
    ].filter(function (t) {
        return t.img;
    });

    function moveParallax() {
        if (reduceMotion || window.innerWidth < 720) return;
        parallaxTargets.forEach(function (t) {
            var host = t.img.parentElement;
            var rect = host.getBoundingClientRect();
            if (rect.bottom < -200 || rect.top > window.innerHeight + 200)
                return;
            var centre = rect.top + rect.height / 2 - window.innerHeight / 2;
            var shift = Math.max(-70, Math.min(70, centre * -t.depth));
            t.img.style.transform =
                'translate3d(0,' + shift.toFixed(1) + 'px,0)';
        });
    }

    function onScroll() {
        if (header) header.classList.toggle('is-stuck', window.scrollY > 12);

        if (window.scrollY < 200) {
            var cur = document.querySelectorAll('.nav__link.is-current');
            Array.prototype.forEach.call(cur, function (l) {
                l.classList.remove('is-current');
                l.removeAttribute('aria-current');
            });
        }

        if (progressBar) {
            var max =
                document.documentElement.scrollHeight - window.innerHeight;
            progressBar.style.width =
                (max > 0
                    ? Math.min(100, (window.scrollY / max) * 100)
                    : 0
                ).toFixed(2) + '%';
        }

        moveParallax();
    }

    var ticking = false;
    window.addEventListener(
        'scroll',
        function () {
            if (ticking) return;
            ticking = true;
            window.requestAnimationFrame(function () {
                onScroll();
                ticking = false;
            });
        },
        { passive: true },
    );
    window.addEventListener('resize', onScroll);
    onScroll();

    /* ------------------------------------------------------------ mobile nav */
    var nav = document.getElementById('nav');
    var navToggle = document.getElementById('navToggle');

    function closeNav() {
        if (!nav || !navToggle) return;
        nav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('nav-open');
    }

    if (nav && navToggle) {
        navToggle.addEventListener('click', function () {
            var open = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', String(!open));
            nav.classList.toggle('is-open', !open);
            document.body.classList.toggle('nav-open', !open);
        });

        /* Any link closes the menu, not just the ones inside it. The brandmark and the
       skip link sit above the overlay and stay clickable while it is open. */
        document.addEventListener('click', function (e) {
            if (navToggle.getAttribute('aria-expanded') !== 'true') return;
            if (e.target && e.target.closest && e.target.closest('a[href]'))
                closeNav();
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') closeNav();
        });
        window.addEventListener('resize', function () {
            if (window.innerWidth > 900) closeNav();
        });
    }

    /* ------------------------------------------------ hash landing on arrival */
    /* Loading or refreshing straight onto /#companies makes the browser jump before
     the webfonts have settled, so the section can end up tens of pixels under the
     header. Re-apply the landing once things stop moving, and only while the
     visitor has not already taken the scroll over themselves. */
    (function () {
        var hash = window.location.hash;
        if (!hash || hash === '#top' || hash === '#main') return;

        var target = document.getElementById(hash.slice(1));
        if (!target || !target.scrollIntoView) return;

        var userTookOver = false;
        ['wheel', 'touchstart', 'keydown', 'mousedown'].forEach(function (evt) {
            window.addEventListener(
                evt,
                function () {
                    userTookOver = true;
                },
                { passive: true, once: true },
            );
        });

        function settle() {
            if (userTookOver) return;
            var root = document.documentElement;
            var previous = root.style.scrollBehavior;
            root.style.scrollBehavior = 'auto'; // correct it, do not animate it
            target.scrollIntoView({ block: 'start' });
            root.style.scrollBehavior = previous;
        }

        window.addEventListener('load', settle);
        if (document.fonts && document.fonts.ready)
            document.fonts.ready.then(settle);
        window.setTimeout(settle, 700);
    })();

    /* -------------------------------------------------------- scroll reveals */
    var revealables = document.querySelectorAll('.reveal');

    if (reduceMotion || !('IntersectionObserver' in window)) {
        Array.prototype.forEach.call(revealables, function (el) {
            el.classList.add('is-in');
        });
    } else {
        var revealObserver = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (!entry.isIntersecting) return;
                    entry.target.classList.add('is-in');
                    revealObserver.unobserve(entry.target);
                });
            },
            { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
        );

        Array.prototype.forEach.call(revealables, function (el) {
            revealObserver.observe(el);
        });
    }

    /* -------------------------------------------------------------- scrollspy */
    var spyLinks = Array.prototype.slice.call(
        document.querySelectorAll('.nav__link[href^="#"]'),
    );

    if (spyLinks.length && 'IntersectionObserver' in window) {
        var sections = spyLinks
            .map(function (link) {
                return document.querySelector(link.getAttribute('href'));
            })
            .filter(Boolean);

        var spyObserver = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (!entry.isIntersecting) return;
                    var link = spyLinks.filter(function (l) {
                        return l.getAttribute('href') === '#' + entry.target.id;
                    })[0];
                    if (!link) return;
                    spyLinks.forEach(function (l) {
                        l.classList.remove('is-current');
                        l.removeAttribute('aria-current');
                    });
                    link.classList.add('is-current');
                    link.setAttribute('aria-current', 'true');
                });
            },
            { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
        );

        sections.forEach(function (s) {
            spyObserver.observe(s);
        });
    }

    /* ------------------------------------------------------------------ year */
    var year = document.getElementById('year');
    if (year) year.textContent = String(new Date().getFullYear());
})();
