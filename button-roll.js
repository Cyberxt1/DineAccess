(function () {
    var selector = '.btn, button, .quick-action, .logout-btn, .nav-back, .header-chip, .leaderboard-item, .back-link a';
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    function isModifiedClick(event) {
        return event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0;
    }

    function playRoll(target) {
        target.classList.remove('is-rolling');
        window.requestAnimationFrame(function () {
            target.classList.add('is-rolling');
        });

        target.addEventListener('animationend', function () {
            target.classList.remove('is-rolling');
        }, { once: true });
    }

    document.addEventListener('click', function (event) {
        var target = event.target.closest(selector);
        if (!target || prefersReducedMotion.matches) {
            return;
        }

        playRoll(target);

        if (
            target.tagName === 'A' &&
            target.href &&
            !target.target &&
            !target.hasAttribute('download') &&
            !event.defaultPrevented &&
            !isModifiedClick(event)
        ) {
            event.preventDefault();
            window.setTimeout(function () {
                window.location.href = target.href;
            }, 450);
        }
    });
}());
