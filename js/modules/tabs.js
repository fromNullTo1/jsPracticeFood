function tabs(tabContainerSelector, tabsContentSelector, tabHeaderBoxSelector, tabsSelector, activeClass) {
    
    //tabs

    const tabContainer = document.querySelector(tabContainerSelector);
    const tabsContent = tabContainer.querySelectorAll(tabsContentSelector);
    const tabHeadersBox = tabContainer.querySelector(tabHeaderBoxSelector);
    const tabHeaders = tabContainer.querySelectorAll(tabsSelector);

    const hide = function () {
        tabsContent.forEach(tab => {
            tab.classList.add('hide');
            tab.classList.remove('show', 'fade');
        });
        tabHeaders.forEach(tab => {
            tab.classList.remove(activeClass);
        })
    }

    const show = function (i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabHeaders[i].classList.add(activeClass);
    }

    tabHeadersBox.addEventListener('click', e => {
        if (e.target && e.target.matches(tabsSelector)) {
            tabHeaders.forEach((el, i) => {
                if (e.target == el) {
                    hide();
                    show(i);
                }
            })
        }
    })


    hide();
    show();

}

export default tabs;