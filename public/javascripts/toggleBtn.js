    // Toggle Switch
    let body = document.querySelector('body')
    let switchBtn = document.querySelector('.container__toggle-btn')

    // Web Storage
    if (!localStorage.getItem('theme')) {
        populateStorage()
    } else {
        setStyle()
    }

    // Change the stat of the button and the theme of the page
    switchBtn.addEventListener('click', switchTheme)

    function switchTheme() {
        body.classList.toggle('light')
        body.classList.toggle('dark')
        populateStorage()
    }

    function populateStorage() {
        localStorage.setItem('theme', body.classList.value)

        setStyle()
    }

    function setStyle() {
        let currentTheme = localStorage.getItem('theme')
        body.classList.value = currentTheme
        if (body.classList.value === 'light')
            switchBtn.classList.add('active')
        else
            switchBtn.classList.remove('active')
    }