// ======= GLOBAL SEARCH SCRIPT =======

// Your master product list (add all your products here)
const productsData = [
  { name: "Headset Pro T19", image: "assets/images/headset12-removebg-preview.png", price: "652 rs" },
  { name: "Wireless Earphones", image: "assets/images/headset13-removebg-preview.png", price: "699 rs" },
  { name: "Gaming Headset", image: "assets/images/pngtree-beautiful-gaming-headphone-isolated-png-image_15562153-removebg-preview.png", price: "999 rs" },
  { name: "Noise Cancelling Headset", image: "assets/images/noise.jpeg", price: "849 rs" },
  { name: "Bluetooth Headphones", image: "assets/images/headset17-removebg-preview.png", price: "759 rs" },
  { name: "Bass Boost Earphones", image: "assets/images/sound.jpeg", price: "499 rs" },
  { name: "Battery Life Powerbuds", image: "battery3.jpg", price: "899 rs" },
  { name: "Connectivity Plus", image: "connectivity.jpg", price: "799 rs" },
  { name: "Premium Built Headset", image: "quality2.jpeg", price: "699 rs" }
];

// Wait until the page is ready
window.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("productSearch");
  if (!searchInput) return; // Only run if the search bar exists

  // Create the suggestion dropdown box
  const suggestionBox = document.createElement("div");
  document.body.appendChild(suggestionBox);
  suggestionBox.style.position = "absolute";
  suggestionBox.style.background = "#fff";
  suggestionBox.style.border = "1px solid #ccc";
  suggestionBox.style.borderRadius = "8px";
  suggestionBox.style.maxHeight = "220px";
  suggestionBox.style.overflowY = "auto";
  suggestionBox.style.boxShadow = "0 2px 8px rgba(0,0,0,0.2)";
  suggestionBox.style.zIndex = "1000";
  suggestionBox.style.display = "none";

  // Reposition below the search bar
  const updatePosition = () => {
    const rect = searchInput.getBoundingClientRect();
    suggestionBox.style.left = rect.left + "px";
    suggestionBox.style.top = rect.bottom + window.scrollY + "px";
    suggestionBox.style.width = rect.width + "px";
  };

  // When typing, show suggestions
  searchInput.addEventListener("input", () => {
    updatePosition();
    const query = searchInput.value.trim().toLowerCase();
    suggestionBox.innerHTML = "";

    if (query === "") {
      suggestionBox.style.display = "none";
      return;
    }

    const matches = productsData.filter(p => p.name.toLowerCase().includes(query));
    if (matches.length === 0) {
      suggestionBox.innerHTML = `<div style="padding:10px;color:#888;">No results found</div>`;
      suggestionBox.style.display = "block";
      return;
    }

    matches.forEach(p => {
      const div = document.createElement("div");
      div.innerHTML = `
        <div style="display:flex;align-items:center;gap:10px;padding:8px;cursor:pointer;color:#333;">
          <img src="${p.image}" width="40" height="40" style="border-radius:6px;">
          <span>${p.name}</span>
        </div>`;
      div.addEventListener("click", () => {
        window.location.href = `product.html?img=${encodeURIComponent(p.image)}&name=${encodeURIComponent(p.name)}&price=${encodeURIComponent(p.price)}`;
      });
      div.addEventListener("mouseenter", () => (div.style.background = "#f6f6f6"));
      div.addEventListener("mouseleave", () => (div.style.background = "transparent"));
      suggestionBox.appendChild(div);
    });

    suggestionBox.style.display = "block";
  });

  // Hide dropdown when clicking outside
  document.addEventListener("click", (e) => {
    if (!searchInput.contains(e.target)) suggestionBox.style.display = "none";
  });

  // Press Enter → product or search page
  searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      const query = searchInput.value.trim().toLowerCase();
      if (query) {
        const matched = productsData.find(p => p.name.toLowerCase().includes(query));
        if (matched) {
          window.location.href = `product.html?img=${encodeURIComponent(matched.image)}&name=${encodeURIComponent(matched.name)}&price=${encodeURIComponent(matched.price)}`;
        } else {
          window.location.href = `search.html?query=${encodeURIComponent(query)}`;
        }
      }
    }
  });
});
