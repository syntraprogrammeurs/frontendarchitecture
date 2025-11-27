// =========================
// features/lowStock/index.js
// =========================

import { CoreEventBus } from '../../core/eventBus.js';
import { ProductService } from '../products/productService.js';

export const LowStockFeature = (function () {
    let counts = {}; // productId: aantal

    function init() {
        CoreEventBus.subscribe('CART_ADD', payload => {
            const id = payload.product.id;
            counts[id] = (counts[id] || 0) + 1;

            render();
        });

        render();
    }

    function render() {
        const ul = document.querySelector('#feat_lowstock_list');
        if (!ul) return;

        const warnings = Object.entries(counts)
            .filter(([id, count]) => count >= 3)
            .map(([id, count]) => {
                const p = ProductService.findById(Number(id));
                if (!p) return '';
                return `<li class="list-group-item">${p.name}: vaak toegevoegd (${count}×)</li>`;
            })
            .join('');

        ul.innerHTML =
            warnings || "<li class='list-group-item'>Geen waarschuwingen</li>";
    }

    return {
        init
    };
})();
