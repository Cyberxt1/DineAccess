(function () {
    var selector = '.btn, button, .quick-action, .logout-btn, .nav-back, .header-chip, .leaderboard-item, .back-link a';
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    var loadingClass = 'is-loading';
    var labelClass = 'btn-roll-label';
    var spinnerClass = 'btn-roll-spinner';
    var activeTimers = new WeakMap();

    function isModifiedClick(event) {
        return event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0;
    }

    function ensureStructure(target) {
        var label = target.querySelector('.' + labelClass);
        var spinner = target.querySelector('.' + spinnerClass);

        if (!label) {
            label = document.createElement('span');
            label.className = labelClass;

            while (target.firstChild) {
                label.appendChild(target.firstChild);
            }

            target.appendChild(label);
        }

        if (!spinner) {
            spinner = document.createElement('span');
            spinner.className = spinnerClass;
            spinner.setAttribute('aria-hidden', 'true');
            target.appendChild(spinner);
        }
    }

    function clearTimer(target) {
        var timerId = activeTimers.get(target);
        if (timerId) {
            window.clearTimeout(timerId);
            activeTimers.delete(target);
        }
    }

    function startLoading(target, duration) {
        if (!target || prefersReducedMotion.matches) {
            return;
        }

        ensureStructure(target);
        clearTimer(target);
        target.classList.add(loadingClass);

        if (duration) {
            activeTimers.set(target, window.setTimeout(function () {
                stopLoading(target);
            }, duration));
        }
    }

    function stopLoading(target) {
        if (!target) {
            return;
        }

        clearTimer(target);
        target.classList.remove(loadingClass);
    }

    function getSubmitTarget(event) {
        if (event.submitter && event.submitter.matches(selector)) {
            return event.submitter;
        }

        var form = event.target;
        if (!form || !form.querySelector) {
            return null;
        }

        return form.querySelector('button[type="submit"], input[type="submit"], .btn[type="submit"]');
    }

    document.addEventListener('click', function (event) {
        var target = event.target.closest(selector);
        if (!target || prefersReducedMotion.matches) {
            return;
        }

        if (target.matches('button[type="submit"], input[type="submit"]')) {
            return;
        }

        if (
            target.tagName === 'A' &&
            target.href &&
            !target.target &&
            !target.hasAttribute('download') &&
            !event.defaultPrevented &&
            !isModifiedClick(event)
        ) {
            event.preventDefault();
            startLoading(target, 450);
            window.setTimeout(function () {
                window.location.href = target.href;
            }, 450);
            return;
        }

        startLoading(target, 450);
    });

    document.addEventListener('submit', function (event) {
        var target = getSubmitTarget(event);
        if (!target || event.defaultPrevented) {
            return;
        }

        startLoading(target, 8000);
    }, true);

    window.ButtonRoll = {
        start: startLoading,
        stop: stopLoading
    };
}());
