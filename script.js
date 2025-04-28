$(document).ready(function() {
    // Load products from JSON
    $.getJSON("products.json", function(data) {
        displayProducts(data);
    }).fail(function() {
        console.log("Error loading products");
    });

    // Form submission
    $("#contactForm").submit(function(e) {
        e.preventDefault();
        alert("Thank you for your message! We'll contact you soon.");
        this.reset();
    });

    // Product hover effects
    $(document).on("mouseenter", ".product-card", function() {
        $(this).css("box-shadow", "0 10px 20px rgba(0,0,0,0.1)");
    }).on("mouseleave", ".product-card", function() {
        $(this).css("box-shadow", "none");
    });

    // Smooth scrolling for navigation
    $('a[href*="#"]').on('click', function(e) {
        e.preventDefault();
        $('html, body').animate(
            { scrollTop: $($(this).attr('href')).offset().top },
            500,
            'linear'
        );
    });
});

function displayProducts(products) {
    let productContainer = $("#productContainer");
    productContainer.empty();

    products.forEach(function(product) {
        let productCard = `
            <div class="col-md-4">
                <div class="product-card" onclick="showProductDetails('${product.id}')">
                    <div class="text-center">
                        <i class="${product.icon} fa-3x" style="color:#2e8b57"></i>
                        <h3>${product.name}</h3>
                        <p class="price">$${product.price}</p>
                        <p>${product.description}</p>
                        <ul class="text-left">
                            ${product.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                        <button class="btn btn-success">View Details</button>
                    </div>
                </div>
            </div>
        `;
        productContainer.append(productCard);
    });
}

function showProductDetails(productId) {
    $.getJSON("products.json", function(products) {
        let product = products.find(p => p.id === productId);
        if (product) {
            alert(`${product.name}\n\n$${product.price}\n\n${product.fullDescription}\n\nFeatures:\n- ${product.features.join("\n- ")}`);
        }
    });
}