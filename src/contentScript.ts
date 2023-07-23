import { RatesPair } from './models/crypto';
import { Currency } from './services/currency';

(async function getPriceFromElement(): Promise<void> {
    const currency = new Currency();

    async function getRatesAndCurrency(rateCode: RatesPair): Promise<number> {
        const rates = await currency.getRates();
        const result = currency.getCurrency(rates, rateCode);
        return parseFloat(result.ask);
    }

    function createModal(productPriceInUSDT: string) {
        var modal = document.createElement('div');
        modal.id = 'myCustomModal';
        modal.innerHTML = `
        <div style="background-color: #26a17b; color: #FFF; z-index: 99999; border-radius: 6px; display: flex; flex-direction: column; position: fixed; top: 10%; left: 50%; transform: translate(-50%, -50%); padding: 15px;">
            <button style="background-color: #FFF; border-radius: 50%; align-self: end; margin: 5px; width: 20px; height: 20px;" class="close andes-modal__close-button" aria-label="Cerrar" href=""><svg width="20" height="20" viewBox="0 0 20 20" ><path d="M4.35156 5.19496L9.15406 9.99746L4.35156 14.8L5.20009 15.6485L10.0026 10.846L14.7963 15.6397L15.6449 14.7912L10.8511 9.99746L15.6449 5.20371L14.7963 4.35518L10.0026 9.14894L5.20009 4.34644L4.35156 5.19496Z"></path></svg></button>
            <h2 class="modal-title" style="padding: 5px; margin-bottom: 0.8rem;">Precio aproximado en USDT:</h2>
            <h3 style="margin-bottom: 0.8rem; font-size: 2rem; text-align: center;">$${productPriceInUSDT}</h3>
          </div>
        `;

        // Attach event listener to handle closing the modal
        var closeButton = modal.querySelector('.close');
        closeButton?.addEventListener('click', function () {
            modal.style.display = 'none';
        });

        // Append the modal to the document body
        document.body.appendChild(modal);
    }

    const element = document.querySelector(
        'span.andes-money-amount.andes-money-amount--compact'
    ) as HTMLElement;
    if (element) {
        const metaPriceElement = element.querySelector(
            'meta[itemprop="price"]'
        ) as HTMLMetaElement;
        console.log(metaPriceElement);

        const productPrice =
            metaPriceElement.content && parseFloat(metaPriceElement.content);
        if (productPrice) {
            const USDTPriceInARS = await getRatesAndCurrency(
                RatesPair.USDT_ARS
            );
            const productPriceInUSDT = currency.convertPrice(
                productPrice,
                USDTPriceInARS
            );

            createModal(productPriceInUSDT);
        } else {
            console.log(
                "meta[itemprop='price'] not found in the specified element."
            );
        }
    } else {
        console.log(
            '.andes-money-amount.andes-money-amount--compact element not found.'
        );
    }
})();
