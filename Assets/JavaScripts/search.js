document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.getElementById("searchInput");
    const searchDropdown = document.getElementById("searchDropdown");
    let debounceTimer;
    let selectedResultIndex = -1;

    const categories = [
        { name: "Home", description: "Main Page", link: "/index.html" },
        { name: "User Info", description: "User Information", link: "/Assets/Html/user.html" },
        { name: "Services", description: "Resident Evil Kingdom Ui", link: "/Assets/Html/Services/ui.html" },
        { name: "UI", description: "Resident Evil Kingdom Ui", link: "/Assets/Html/Services/ui.html" },
        { name: "Release Notes", description: "Updates", link: "/Assets/Html/release.html" },
        { name: "Frequently Asked Questions", description: "FAQ", link: "/Assets/Html/faq.html" },
    ];

    function showDropdown() {
        filterResults();
        searchDropdown.style.display = "block";
        searchDropdown.setAttribute("aria-expanded", "true");
    }

    function hideDropdown() {
        searchDropdown.style.display = "none";
        searchDropdown.setAttribute("aria-expanded", "false");
    }

    function handleKeyboardNavigation(event) {
        const key = event.key;

        if (key === "ArrowDown") {
            selectedResultIndex = (selectedResultIndex + 1) % searchDropdown.children.length;
        } else if (key === "ArrowUp") {
            selectedResultIndex = (selectedResultIndex - 1 + searchDropdown.children.length) % searchDropdown.children.length;
        } else if (key === "Enter" && selectedResultIndex !== -1) {
            const link = searchDropdown.children[selectedResultIndex].getAttribute("data-link");
            window.location.href = link;
        } else if (key === "Backspace" && searchInput.value === "") {
            selectedResultIndex = -1;
            filterResults();
        }

        updateSelectedResult();
    }

    function updateSelectedResult() {
        searchDropdown.querySelectorAll("div").forEach((item, index) => {
            item.classList.toggle("selected", index === selectedResultIndex);
        });
    }

    function filterResults() {
        const inputValue = searchInput.value.toLowerCase();

        const filteredCategories = categories
            .filter(category =>
                category.name.toLowerCase().includes(inputValue) || category.description.toLowerCase().includes(inputValue)
            )
            .sort((a, b) => a.name.localeCompare(b.name));

        searchDropdown.innerHTML = filteredCategories
            .map(category =>
                `<div data-link="${category.link}" tabindex="0">
                    <span>${category.name} - ${category.description}</span>
                 </div>`
            )
            .join("");

        selectedResultIndex = -1;

        searchDropdown.querySelectorAll("div").forEach((item, index) => {
            item.addEventListener("click", function() {
                const link = item.getAttribute("data-link");
                window.location.href = link;
            });

            item.addEventListener("mouseenter", function() {
                selectedResultIndex = index;
                updateSelectedResult();
            });
        });
    }

    searchInput.addEventListener("click", showDropdown);
    searchInput.addEventListener("focus", showDropdown);
    
    searchInput.addEventListener("input", function() {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(filterResults, 300); 
    });

    document.addEventListener("click", function(event) {
        if (!event.target.closest(".search-container")) {
            hideDropdown();
        }
    });

    document.addEventListener("keydown", handleKeyboardNavigation);
});
