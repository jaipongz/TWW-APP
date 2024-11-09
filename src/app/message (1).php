<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dynamic Dropdown Menu</title>
    <style>
        /* Basic styling */
        body {
            font-family: Arial, sans-serif;
        }
        .dropdown-container {
            position: relative;
            display: inline-block;
        }
        /* Main group dropdown styling */
        .dropdown-btn {
            padding: 10px;
            border: 1px solid #ccc;
            cursor: pointer;
            background-color: #f9f9f9;
        }
        /* Dropdown content styling */
        .dropdown-content {
            display: none;
            position: absolute;
            background-color: white;
            border: 1px solid #ccc;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
            z-index: 1;
            min-width: 200px;
            margin-top: 5px;
        }
        /* Each option styling */
        .dropdown-item {
            padding: 10px;
            cursor: pointer;
        }
        .dropdown-item:hover {
            background-color: #f1f1f1;
        }
        /* Child dropdown styling */
        .child-dropdown {
            display: none;
            position: absolute;
            left: 100%;
            top: 0;
            min-width: 200px;
            border: 1px solid #ccc;
            background-color: white;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
            z-index: 1;
        }
        /* Show child dropdown on hover */
        .dropdown-item:hover .child-dropdown {
            display: block;
        }
    </style>
</head>
<body>

<div class="dropdown-container">
    <!-- Main group button -->
    <div class="dropdown-btn" onclick="toggleDropdown()">หมวดหมู่หลัก</div>
    
    <!-- Dropdown content -->
    <div class="dropdown-content" id="mainDropdown">
        <!-- Dynamic content will be inserted here -->
    </div>
</div>

<script>
    // Toggle dropdown display
    function toggleDropdown() {
        const dropdown = document.getElementById("mainDropdown");
        dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
    }

    // Fetch data from API and populate dropdown
    async function fetchAndPopulateDropdown() {
        try {
            const response = await fetch('http://localhost:3090/mainGroup');
            const result = await response.json();

            if (result.status === "success") {
                const data = result.data;
                const dropdown = document.getElementById("mainDropdown");

                // Clear existing content
                dropdown.innerHTML = "";

                // Group data by main category (group)
                const groupedData = data.reduce((acc, item) => {
                    if (!acc[item.group]) {
                        acc[item.group] = [];
                    }
                    acc[item.group].push(item);
                    return acc;
                }, {});

                // Create dropdown items for each main group
                for (const group in groupedData) {
                    const mainItem = document.createElement("div");
                    mainItem.className = "dropdown-item";
                    mainItem.textContent = group;

                    // Create child dropdown for each subcategory in this group
                    const childDropdown = document.createElement("div");
                    childDropdown.className = "child-dropdown";

                    groupedData[group].forEach(subItem => {
                        const childItem = document.createElement("div");
                        childItem.className = "dropdown-item";
                        childItem.textContent = `${subItem.label}: ${subItem.desc}`;
                        
                        // Set value when clicked
                        childItem.onclick = () => {
                            alert(`Selected: ${subItem.label}`);
                        };

                        childDropdown.appendChild(childItem);
                    });

                    mainItem.appendChild(childDropdown);
                    dropdown.appendChild(mainItem);
                }
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    // Fetch data and populate on page load
    document.addEventListener("DOMContentLoaded", fetchAndPopulateDropdown);

    // Close dropdown if clicked outside
    window.onclick = function(event) {
        if (!event.target.matches('.dropdown-btn')) {
            const dropdowns = document.getElementsByClassName("dropdown-content");
            for (let i = 0; i < dropdowns.length; i++) {
                const openDropdown = dropdowns[i];
                if (openDropdown.style.display === "block") {
                    openDropdown.style.display = "none";
                }
            }
        }
    }
</script>

</body>
</html>
