const pageOrder = [...document.querySelectorAll('.site-nav a')].map((link) => {
    return new URL(link.href, window.location.href).pathname.split('/').pop() || 'home.html';
});
const currentPage = window.location.pathname.split('/').pop() || 'home.html';
const entryDirection = sessionStorage.getItem('pageTransitionDirection');

if (entryDirection) {
    document.body.classList.add(`page-enter-${entryDirection}`);
    sessionStorage.removeItem('pageTransitionDirection');
}

document.querySelectorAll('a[href]').forEach((link) => {
    link.addEventListener('click', (event) => {
        const targetUrl = new URL(link.href, window.location.href);
        const isModifiedClick = event.ctrlKey || event.metaKey || event.shiftKey || event.altKey;
        const isExternalLink = targetUrl.origin !== window.location.origin;
        const isSamePage = targetUrl.pathname === window.location.pathname && targetUrl.hash;

        if (isModifiedClick || isExternalLink || isSamePage || link.target === '_blank') {
            return;
        }

        const targetPage = targetUrl.pathname.split('/').pop() || 'home.html';
        const currentIndex = pageOrder.indexOf(currentPage);
        const targetIndex = pageOrder.indexOf(targetPage);
        const direction = targetIndex >= currentIndex ? 'forward' : 'backward';

        event.preventDefault();
        sessionStorage.setItem('pageTransitionDirection', direction);
        document.body.classList.add(`page-leaving-${direction}`);

        window.setTimeout(() => {
            window.location.href = link.href;
        }, 420);
    });
});
