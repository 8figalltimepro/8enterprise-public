document.addEventListener('DOMContentLoaded', function () {
    const repoUrl = 'https://github.com/8figalltimepro/8enterprise-public';
    const popupHideKey = 'repo-popup-hide';

    document.body.addEventListener('mousemove', e => {
        window.requestAnimationFrame(() => {
            document.documentElement.style.setProperty('--cursor-x', e.clientX + 'px');
            document.documentElement.style.setProperty('--cursor-y', e.clientY + 'px');
        });
    });

    const menu = document.querySelector('.cascading-menu');

    if (menu) {
        menu.addEventListener('click', function (e) {
            const toggle = e.target.closest('a.toggle');
            if (!toggle) {
                return;
            }

            e.preventDefault();

            const listItem = toggle.parentElement;
            const submenuContainer = listItem.querySelector('.submenu-container');

            const parentList = listItem.parentElement;
            if (parentList) {
                const siblingToggles = parentList.querySelectorAll(':scope > li > a.toggle');
                siblingToggles.forEach(siblingToggle => {
                    if (siblingToggle !== toggle) {
                        siblingToggle.classList.remove('active');
                        const siblingSubmenu = siblingToggle.parentElement.querySelector('.submenu-container');
                        if (siblingSubmenu) {
                            siblingSubmenu.classList.remove('open');
                        }
                    }
                });
            }

            toggle.classList.toggle('active');
            if (submenuContainer) {
                submenuContainer.classList.toggle('open');
            }
        });
    }

    function copyPassword(el) {
        navigator.clipboard.writeText(el.textContent);
        el.classList.add('copied');
        setTimeout(() => el.classList.remove("copied"), 1000);
    }

    const passwordEl = document.querySelector('.password-notice .password');
    if (passwordEl) {
        passwordEl.addEventListener('click', function () {
            copyPassword(passwordEl);
        });
    }

    function removePopup(box) {
        document.body.classList.remove('popup-open');
        box.remove();
    }

    function makePopup() {
        if (localStorage.getItem(popupHideKey) === 'yes') {
            return;
        }

        const box = document.createElement('div');
        box.className = 'repo-popup-overlay';
        box.innerHTML = `
            <div class="repo-popup" role="dialog" aria-modal="true" aria-labelledby="repo-popup-title">
                <button class="repo-popup-close" type="button" aria-label="Close popup">×</button>
                <div class="repo-popup-tag"><span class="repo-popup-tag-dot"></span>Support 8enterprise</div>
                <h2 id="repo-popup-title">Found this useful?</h2>
                <p>
                    If this site saved you some time or made things easier, 
                    consider giving the project a ⭐ on GitHub. It really means a lot.
                </p>
                <div class="repo-popup-actions">
                    <a class="repo-popup-star" href="${repoUrl}" target="_blank" rel="noreferrer">Star the repo</a>
                    <button class="repo-popup-later" type="button">Maybe later</button>
                </div>
                <button class="repo-popup-never" type="button">Never show me again</button>
            </div>
        `;

        const closeBtn = box.querySelector('.repo-popup-close');
        const laterBtn = box.querySelector('.repo-popup-later');
        const neverBtn = box.querySelector('.repo-popup-never');

        closeBtn.addEventListener('click', function () {
            removePopup(box);
        });

        laterBtn.addEventListener('click', function () {
            removePopup(box);
        });

        neverBtn.addEventListener('click', function () {
            localStorage.setItem(popupHideKey, 'yes');
            removePopup(box);
        });

        document.body.appendChild(box);
        document.body.classList.add('popup-open');
    }

    setTimeout(makePopup, 700);
});
