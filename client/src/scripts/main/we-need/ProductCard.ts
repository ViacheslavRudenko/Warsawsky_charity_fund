export default class ProductCard {
  createProductCard = (
    imgUrl: string,
    name: string,
    collected: number,
    purchased: number,
    remains: number
  ): string => {
    return `<div class="card">
        <div class="card__img"><img src="${imgUrl}" alt="${name}" /></div>
        <div class="card__progress">
            <div class="card__progress--success" style="width:${
              (purchased / collected) * 100
            }%"></div>
        </div>
        <h6 class="card__title">${name}</h6>
        <div class="card__item">
            <p>Зібрано: ${collected} шт.</p>
            <p>Придбано: ${purchased} шт.</p>
            <p>Залишилося:${remains} шт.</p>
        </div>
        <button class="card__btn btn">Звіт</button>
    </div>`;
  };
}
