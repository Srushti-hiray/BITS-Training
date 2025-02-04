document.addEventListener('DOMContentLoaded', () => {
    const list = document.getElementById('sortable-list');

    list.querySelectorAll('.list-group-item').forEach(item => {
        item.draggable = true;

        item.addEventListener('dragstart', () => item.classList.add('dragging'));
        item.addEventListener('dragend', () => item.classList.remove('dragging'));
    });

    list.addEventListener('dragover', e => {
        e.preventDefault();
        const afterElement = [...list.children].find(el => 
            el !== document.querySelector('.dragging') && e.clientY < el.getBoundingClientRect().top + el.offsetHeight / 2
        );
        list.insertBefore(document.querySelector('.dragging'), afterElement || null);
    });
});
