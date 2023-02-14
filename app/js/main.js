
window.addEventListener('DOMContentLoaded', () => {

  // Tabs

  const tabs = document.querySelectorAll('.tabs-header__item'),
    tabsContent = document.querySelectorAll('.tabs-content'),
    tabsParent = document.querySelector('.tabs-header__list');

  function hideTabContent() {
    tabsContent.forEach(item => {
      item.classList.add('hide');
      item.classList.remove('show', 'fade');
    });

    tabs.forEach(item => {
      item.classList.remove('tabs-header__item--active')
    })
  }

  function showTabContent(i = 0) {
    tabsContent[i].classList.add('show', 'fade');
    tabsContent[i].classList.remove('hide');
    tabs[i].classList.add('tabs-header__item--active');
  }

  hideTabContent();
  showTabContent();

  tabsParent.addEventListener('click', (e) => {
    const target = e.target;

    if (target && target.classList.contains('tabs-header__item')) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });

  // Swiper

  const swiper = new Swiper('.swiper', {
    loop: true,
    speed: 500,
    spaceBetween: 100,
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
    },
    keyboard: {
      enabled: true,
      onlyInViewport: false,
    },
    autoplay: {
      delay: 5000,
    }
  });

  // Menu cards

  class MenuCard {
    constructor(
      src = 'img/lorem/test.jpg',
      alt = 'test',
      title = 'Lorem ipsum',
      descr = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat illo voluptatum corporis obcaecati magni repellendus.',
      price = 10,
      parentSelector = '.menu .menu__inner',
      ...classes
    ) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price; // цена указывается в долларах
      this.parent = document.querySelector(parentSelector);
      this.classes = classes;
      this.transfer = 60;
    }

    render() {
      const element = document.createElement('div');

      if (this.classes.length === 0) {
        this.element = 'menu__item';
        element.classList.add(this.element);
      } else {
        this.classes.forEach(className => element.classList.add(className));
      }

      element.innerHTML = `
        <img src="${this.src}" alt="${this.alt}">
        <h3 class="menu__item-title">${this.title}</h3>
        <div class="menu__item-text">${this.descr}</div>
        <div class="menu__item-price">
          <div class="menu__item-cost">
            Cost:
          </div>
          <a class="menu__item-total" href="#">
            <span>${this.price}</span> USD/day
          </a>
        </div>
      `;
      this.parent.append(element);
    }
  }

  new MenuCard(
    'images/menu/1.jpg',
    'item',
    'Menu "Fitness"',
    'Menu "Fitness" is a new approach to cooking: more fresh vegetables and fruits. Product of active and healthy people. This is a brand new product with the best price and high quality!',
    20
  ).render();

  new MenuCard(
    'images/menu/2.jpg',
    'item',
    'Menu "Lenten"',
    'The "Lenten" menu is a careful selection of ingredients: the complete absence of animal products, milk from almonds, oats, coconut or buckwheat, the right amount of protein from tofu and imported vegetarian steaks.',
    20
  ).render();

  new MenuCard(
    'images/menu/3.jpg',
    'item',
    'Menu "Premium"',
    'In the "Premium" menu, we use not only beautiful packaging design, but also high-quality execution of dishes. Red fish, seafood, fruits - a restaurant menu without going to a restaurant!',
    20
  ).render();

  new MenuCard(
    'images/menu/1.jpg',
    'item',
    'Menu "Fitness"',
    'Menu "Fitness" is a new approach to cooking: more fresh vegetables and fruits. Product of active and healthy people. This is a brand new product with the best price and high quality!',
    20
  ).render();



  // Modal Window

  const modalWindow = document.querySelector('.modal'),
    modalButton = document.querySelector('[data-modal]');

  function closeModal() {
    modalWindow.classList.remove('show-modal');
    modalWindow.classList.add('hide');
    document.body.style.overflow = '';
  }

  function openModal() {
    modalWindow.classList.remove('hide');
    modalWindow.classList.add('show-modal');
    modalWindow.classList.add('been-opened'); // добавляет класс, символизирующий, что модальное окно уже было открыто 1 раз
    document.body.style.overflow = 'hidden';
    clearInterval(modalTimerId); // удаляется setTimeOut у появления модального окна
  }

  function openModalWithTimeOut(time) {
    setTimeout(openModal, time);
  }

  function showModalByScroll() {
    if ((window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) && !(modalWindow.classList.contains('been-opened'))) {
      openModalWithTimeOut(0);
      window.removeEventListener('scroll', showModalByScroll);
    }
  }

  modalButton.addEventListener('click', openModal);

  modalWindow.addEventListener('click', (e) => {
    if (e.target === modalWindow || e.target.getAttribute('data-modal-close') === '') {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && modalWindow.classList.contains('show-modal')) {
      closeModal();
    }
  });

  const modalTimerId = setTimeout(openModal, 10_000); // открывает модальное окно по истечению 10 секунд (10.000 миллисекунд)

  window.addEventListener('scroll', showModalByScroll);



  // Timer

  const deadline = '2023-05-20';

  function getTimeRemaining(endtime) {
    let days, hours, minutes, seconds;
    const t = Date.parse(endtime) - Date.parse(new Date());

    // Если время закончилось, таймер удаляется и появляется надпись "Акция завершена!"
    if (t <= 0) {
      document.querySelectorAll('.timer__block').forEach(item => {
        item.remove();
      });
      const timeIsOverText = 'Акция завершена!';
      document.querySelector('.timer').classList.add('timeisover');
      document.querySelector('.timer').append(timeIsOverText);
    } else {
      days = Math.floor(t / (1000 * 60 * 60 * 24));
      hours = Math.floor((t / (1000 * 60 * 60)) % 24);
      minutes = Math.floor((t / (1000 * 60)) % 60);
      seconds = Math.floor((t / 1000) % 60);
    }

    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    }
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector('#days'),
      hours = timer.querySelector('#hours'),
      minutes = timer.querySelector('#minutes'),
      seconds = timer.querySelector('#seconds'),
      timeInterval = setInterval(updateClock, 1000);
    updateClock();

    function updateClock() {
      const t = getTimeRemaining(endtime);

      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }

  }

  setClock('.timer', deadline);


  // Form sending

  const forms = document.querySelectorAll('form');

  const message = {
    loading: 'images/form/spin-onload.svg',
    success: 'Thanks! <br> We will contact you soon',
    failure: 'Error'
  }

  forms.forEach(item => {
    postData(item);
  })

  function postData (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const statusMessage = document.createElement('img');
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
        display: block;
        margin: 15px auto 0;
      `;
      document.querySelector('.modal__content').style.paddingBottom = '20px';
      form.insertAdjacentElement('afterend', statusMessage);

      const request = new XMLHttpRequest();
      request.open('POST', 'server.php');

      request.setRequestHeader('Content-type', 'application/json');
      const formData = new FormData(form);

      const object = {};
      formData.forEach(function(value, key) {
        object[key] = value;
      })

      const json = JSON.stringify(object);

      request.send(json);

      request.addEventListener('load', () => {
        if (request.status === 200) {
          console.log(request.response);
          showThanksModal(message.success);
          form.reset();
          statusMessage.remove();
        } else {
          showThanksModal(message.failure);
        }
      });

    });
  }

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog');
    prevModalDialog.classList.add('hide');
    openModal();

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
      <div class="modal__content">
        <div class="modal__close" data-modal-close>×</div>
        <div class="modal__title">${message}</div>
      </div>
    `;

    document.querySelector('.modal').append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add('show-modal');
      prevModalDialog.classList.remove('hide');
      closeModal();
      document.querySelector('.modal__content').style.paddingBottom = '40px';
    }, 4000)
  }



});
