document.addEventListener("DOMContentLoaded", () => {
    const getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const numberWithSpaces = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    };

    const tabs = document.querySelectorAll(".tabs__tab");
    const contents = document.querySelectorAll(".tabs__content");
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].addEventListener("click", (event) => {
            let tabsChildren = event.target.parentElement.children;
            for (let k = 0; k < tabsChildren.length; k++) {
                tabsChildren[k].classList.remove("tabs__tabActive");
            }
            tabs[i].classList.add("tabs__tabActive");
            let tabContentChildren = event.target.parentElement.nextElementSibling.children;
            for (let j = 0; j < tabContentChildren.length; j++) {
                tabContentChildren[j].classList.remove("tabs__contentActive");
            }
            contents[i].classList.add("tabs__contentActive");
        });
    }

    const mainImg = document.querySelector('.mainImgBox__img');
    const images = ['uploads/kengurumi_img1.jpg', 'uploads/img3.jpg', 'uploads/img2.jpg']
    for (let i = 0; i < images.length; i++) {
        let radio = 'radio' + (i + 1);
        radio = document.getElementById(radio).onchange = () => {
            mainImg.setAttribute('src', images[i]);
        };
    }

    const oldPriceElem = document.querySelector('.price__old');
    const currentPriceElem = document.querySelector('.price__current');
    const priceSavingElem = document.querySelector('.price__saving');
    const discountEleme = document.querySelector('.price__discount');
    const oldPrice = parseInt(oldPriceElem.innerText.split(' ').join(''));
    const currentPrice = parseInt(currentPriceElem.innerText.split(' ').join(''));
    const saving = oldPrice - currentPrice;
    const discount = (saving / oldPrice) * 100;

    priceSavingElem.innerHTML = numberWithSpaces(saving) + ' &#8381 <span>экономии</span>';
    discountEleme.innerText = '-' + parseInt(discount) + '%';
    const codeArtc = document.querySelector('.price__itemCodeArtc');
    codeArtc.value = getRandomInt(10000, 99999);
    codeArtc.addEventListener('click', () => {
        codeArtc.select();
        navigator.clipboard.writeText(codeArtc.value)
        alert("Артикл скопирован: " + codeArtc.value);
    });

    const region = document.querySelector('.deliv__region');
    const regions = region.options;
    const selectedRegion = localStorage.getItem('region');
    for (let i = 0; i < regions.length; i++) {
        if (selectedRegion === regions[i].value) {
            regions[i].setAttribute('selected', 'selected');
            regions[i].selected = true;
        }
        region.onchange = () => {
            localStorage.setItem('region', region.value);
        }
    }

    const countEl = document.querySelector('.basket__count');
    let count = 1;
    document.querySelector('.basket__btn-plus').addEventListener('click', () => {
        if (parseInt(countEl.innerText) < 6) {
            count++;
            countEl.innerText = count;
        }
    });
    document.querySelector('.basket__btn-minus').addEventListener('click', () => {
        if (parseInt(countEl.innerText) !== 1) {
            count--;
            countEl.innerText = count;
        }
    });

    const rangeHeight = document.querySelector('.size__rangeHeight');
    const rangeWeight = document.querySelector('.size__rangeWeight');
    const height = document.querySelector('.size__optiHeight');
    const weight = document.querySelector('.size__optiWeight');
    const optiSize = document.querySelector('.size__optiInfo');
    height.innerHTML = rangeHeight.value;
    weight.innerHTML = rangeWeight.value;

    rangeHeight.oninput = () => {
        height.innerHTML = rangeHeight.value;
        if (parseInt(height.innerHTML) <= 155 && parseInt(weight.innerHTML) <= 55) {
            optiSize.innerHTML = 'S';
        } else if (parseInt(height.innerHTML) <= 165 && parseInt(weight.innerHTML) <= 65) {
            optiSize.innerHTML = 'M';
        } else if (parseInt(height.innerHTML) <= 175 && parseInt(weight.innerHTML) <= 75) {
            optiSize.innerHTML = 'L';
        } else if (parseInt(height.innerHTML) <= 185 && parseInt(weight.innerHTML) <= 95) {
            optiSize.innerHTML = 'XL';
        } else if (parseInt(height.innerHTML) <= 195 && parseInt(weight.innerHTML) <= 120) {
            optiSize.innerHTML = 'XXL';
        }
    };
    rangeWeight.oninput = () => {
        weight.innerHTML = rangeWeight.value;
        if (parseInt(height.innerHTML) <= 155 && parseInt(weight.innerHTML) <= 55) {
            optiSize.innerHTML = 'S';
        } else if (parseInt(height.innerHTML) <= 165 && parseInt(weight.innerHTML) <= 65) {
            optiSize.innerHTML = 'M';
        } else if (parseInt(height.innerHTML) <= 175 && parseInt(weight.innerHTML) <= 75) {
            optiSize.innerHTML = 'L';
        } else if (parseInt(height.innerHTML) <= 185 && parseInt(weight.innerHTML) <= 95) {
            optiSize.innerHTML = 'XL';
        } else if (parseInt(height.innerHTML) <= 195 && parseInt(weight.innerHTML) <= 120) {
            optiSize.innerHTML = 'XXL';
        }
    };

    const optiBox = document.querySelector('.size__opti');
    const optiBackdrop = document.querySelector('.size__backdrop');
    document.querySelector('.size__btnClose').addEventListener('click', () => {
        optiBox.style.display = 'none';
        optiBackdrop.style.display = 'none';
    });

    document.querySelector('.size__btnChooseSize').addEventListener('click', () => {
        optiBox.style.display = 'block';
        optiBackdrop.style.display = 'block';
    });

    const roundedBtn = document.querySelectorAll('.roundedBtn');
    roundedBtn.forEach(btn => {
        if (btn.classList.value !== "roundedBtn roundedBtn-disable") {
            btn.addEventListener('click', () => {
                const activeRoundBtn = document.querySelector('.roundedBtn-active');
                activeRoundBtn.classList = "roundedBtn";
                btn.classList = "roundedBtn roundedBtn-active"
            })
        }
    });

    document.querySelector('.size__btn').addEventListener('click', () => {
        if (optiSize.innerText === 'S' || optiSize.innerText === 'M' || optiSize.innerText === 'L') {
            const activeBtn = document.querySelector('.roundedBtn-active');
            activeBtn.classList = "roundedBtn";
            const btnId = 'btn-' + (optiSize.innerText).toLowerCase();
            const btn = document.getElementById(btnId);
            btn.classList = "roundedBtn roundedBtn-active";
        } else {
            alert('К сожалению этого размера нет в данный момент.')
        }
        optiBox.style.display = 'none';
        optiBackdrop.style.display = 'none';
    });

    $(function () {
        $("#phone").mask("+7 (999) 999-99-99");
    });

    const basketBtn = document.getElementById('basketBtn');
    const serverPost = {};
    basketBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const selectedSize = document.querySelector('.roundedBtn-active');
        serverPost.article = codeArtc.value;
        serverPost.size = selectedSize.innerText;
        serverPost.amount = countEl.innerText;
        console.log(JSON.stringify(serverPost));
    });
});