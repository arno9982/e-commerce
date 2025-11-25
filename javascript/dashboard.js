// Statistiques
document.getElementById("rev").textContent = "245 450 FCFA";
document.getElementById("clients").textContent = 684;
document.getElementById("repeat").textContent = "75.12 %";
document.getElementById("panier").textContent = "2 412 FCFA";

// --- STOCKS PRODUITS --- //
const stockProducts = [
    { id: 1, name: "Chemise", stock: 128, img: "../images/products/5.jpg" },
    { id: 2, name: "Pull-over", stock: 401, img: "../images/products/6.jpg" },
    { id: 3, name: "Bonnet", stock: 102, img: "../images/products/7.jpg" }
];

const stockList = document.getElementById("stock-products");

// Fonction d'affichage du stock
function renderStock() {
    stockList.innerHTML = "";

    stockProducts.forEach(p => {
        const li = document.createElement("li");
        li.classList.add("stock-item");

        li.innerHTML = `
            <img src="${p.img}" alt="${p.name}" class="product-img">
            <span>${p.name} — <strong>${p.stock}</strong> en stock</span>
            <button class="btn-add" data-id="${p.id}">Ajouter</button>
        `;

        stockList.appendChild(li);
    });

    attachAddEvents();
}

renderStock();

// Gestion du bouton "Ajouter"
function attachAddEvents() {
    const buttons = document.querySelectorAll(".btn-add");

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            const id = btn.getAttribute("data-id");
            const product = stockProducts.find(p => p.id == id);

            const qty = prompt(`Ajouter combien à "${product.name}" ?`);

            if (qty !== null && !isNaN(qty) && qty > 0) {
                product.stock += parseInt(qty);
                renderStock();
            } else {
                alert("Quantité invalide !");
            }
        });
    });
}



// --- BEST PRODUCTS (Correction d’erreur : ajout du tableau) --- //
const bestProducts = [
    { name: "Chemise", sales: 128, img: "../images/products/5.jpg" },
    { name: "Pull-over", sales: 401, img: "../images/products/6.jpg" },
    { name: "Bonnet", sales: 102, img: "../images/products/7.jpg" }
];

const bestList = document.getElementById("best-products");
if (bestList) {
    bestProducts.forEach(p => {
        bestList.innerHTML += `
            <li>
                <img src="${p.img}" alt="${p.name}" class="product-img">
                <span>${p.name}</span> 
                <strong>${p.sales} pcs</strong>
            </li>
        `;
    });
}



// --- COMMANDES RÉCENTES --- //
const orders = [
    { product: "Gourde", client: "Peterson Jack", id: "#454573", date: "27 Juin 2025", status: "En attente" },
    { product: "iPhone 15 Pro", client: "Michel Datta", id: "#2457841", date: "26 Juin 2025", status: "Annulée" },
    { product: "Casque", client: "Jesilya Rose", id: "#1024784", date: "20 Juin 2025", status: "Expédiée" }
];

const ordersTable = document.getElementById("orders");
orders.forEach(o => {
    ordersTable.innerHTML += `
        <tr>
            <td>${o.product}</td>
            <td>${o.client}</td>
            <td>${o.id}</td>
            <td>${o.date}</td>
            <td>${o.status}</td>
        </tr>
    `;
});



// --- CLIENTS LES PLUS ACTIFS --- //
const topCustomers = [
    { name: "Mark Hoverson", count: 25 },
    { name: "Mark Hoverson", count: 15 },
    { name: "Jhony Peters", count: 23 }
];

const customerList = document.getElementById("top-customers");
topCustomers.forEach(c => {
    customerList.innerHTML += `<li>${c.name} – <strong>${c.count} commandes</strong></li>`;
});



// --- GRAPHIQUE --- //
const ctx = document.getElementById("chart").getContext('2d');

const data = {
    orders: {
        7: [5, 8, 7, 4, 6, 7, 9],
        30: Array.from({ length: 30 }, () => Math.floor(Math.random() * 10 + 5)),
        12: Array.from({ length: 12 }, () => Math.floor(Math.random() * 200 + 50))
    },
    revenue: {
        7: [50000, 82000, 76000, 43000, 64000, 72000, 90000],
        30: Array.from({ length: 30 }, () => Math.floor(Math.random() * 100000 + 30000)),
        12: Array.from({ length: 12 }, () => Math.floor(Math.random() * 1000000 + 200000))
    }
};

const labels = {
    7: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
    30: Array.from({ length: 30 }, (_, i) => `Jour ${i + 1}`),
    12: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"]
};

let myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: labels[7],
        datasets: [{
            label: "Commandes",
            data: data.orders[7],
            borderColor: '#007bff',
            borderWidth: 2,
            fill: false
        }]
    },
    options: { responsive: true }
});

// Mise à jour du graph
function updateChart() {
    const type = document.getElementById("chart-type").value;
    const period = document.getElementById("chart-period").value;

    myChart.data.labels = labels[period];
    myChart.data.datasets[0].label = type === "orders" ? "Commandes" : "Chiffre d'affaires";
    myChart.data.datasets[0].data = data[type][period];
    myChart.data.datasets[0].borderColor = type === "orders" ? '#007bff' : '#22c55e';
    myChart.update();
}

document.getElementById("chart-type").addEventListener("change", updateChart);
document.getElementById("chart-period").addEventListener("change", updateChart);
