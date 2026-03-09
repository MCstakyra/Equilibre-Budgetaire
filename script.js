
    let income = 0;
    let expenses = [];
    let globalSavings = 0;
    let currentBalance = 0; 

    function loadData() {
        const savedIncome = localStorage.getItem('myBudget_income');
        const savedExpenses = localStorage.getItem('myBudget_expenses');
        const savedGlobal = localStorage.getItem('myBudget_globalSavings');

        if (savedIncome) income = parseFloat(savedIncome);
        if (savedExpenses) expenses = JSON.parse(savedExpenses);
        if (savedGlobal) globalSavings = parseFloat(savedGlobal);

        document.getElementById('incomeInput').value = income > 0 ? income : '';
        document.getElementById('globalSavingsAmount').innerText = globalSavings.toFixed(2);
        
        updateDashboard();
        renderExpenses();
    }

    function saveData() {
        localStorage.setItem('myBudget_income', income);
        localStorage.setItem('myBudget_expenses', JSON.stringify(expenses));
        localStorage.setItem('myBudget_globalSavings', globalSavings);
    }
    
    function withdrawFromSavings() {
        const amount = parseFloat(document.getElementById('withdrawInput').value);
        
        if (amount && amount > 0) {
            if (amount <= globalSavings) {

                globalSavings -= amount;

                income += amount; 
                
                document.getElementById('withdrawInput').value = '';
                document.getElementById('globalSavingsAmount').innerText = globalSavings.toFixed(2);
                
                saveData();
                updateDashboard();
                
                alert(`Succes ! ${amount} € ont ete transferes de ton epargne vers ton budget du mois.`);
            } else {
                alert("Fonds insuffisants : tu n'as pas assez d'argent dans ton epargne globale !");
            }
        }
    }

    function setIncome() {
        const input = document.getElementById('incomeInput').value;
        if (input && input >= 0) {
            income = parseFloat(input);
            saveData();
            updateDashboard();
        }
    }

    function addIncome() {
        const input = document.getElementById('incomeInput').value;
        if (input && input > 0) {
            income += parseFloat(input); 
            document.getElementById('incomeInput').value = ''; 
            saveData();
            updateDashboard();
        }
    }

    function addExpense() {
        const desc = document.getElementById('descInput').value;
        const amount = parseFloat(document.getElementById('amountInput').value);
        const category = document.getElementById('categoryInput').value;

        if (desc && amount > 0) {
            const expense = {
                id: Date.now(),
                desc: desc,
                amount: amount,
                category: category
            };
            expenses.push(expense);
            
            
            document.getElementById('descInput').value = '';
            document.getElementById('amountInput').value = '';
            
            saveData();
            updateDashboard();
            renderExpenses();
        } else {
            alert('Veuillez entrer une description et un montant valide.');
        }
    }

    function deleteExpense(id) {
        expenses = expenses.filter(exp => exp.id !== id);
        saveData();
        updateDashboard();
        renderExpenses();
    }

    function updateDashboard() {
        let totalEssential = 0;
        let totalPleasure = 0;
        let totalSavings = 0;

        expenses.forEach(exp => {
            if (exp.category === 'essentiel') totalEssential += exp.amount;
            if (exp.category === 'plaisir') totalPleasure += exp.amount;
            if (exp.category === 'economie') totalSavings += exp.amount;
        });

        document.getElementById('totalIncome').innerText = income.toFixed(2);
        document.getElementById('totalEssential').innerText = totalEssential.toFixed(2);
        document.getElementById('totalPleasure').innerText = totalPleasure.toFixed(2);
        document.getElementById('totalSavings').innerText = totalSavings.toFixed(2);

        const totalExpenses = totalEssential + totalPleasure + totalSavings;
        currentBalance = income - totalExpenses;

        const balanceEl = document.getElementById('totalBalance');
        const balanceCard = document.getElementById('balanceCard');
        
        balanceEl.innerText = currentBalance.toFixed(2);

        if (currentBalance > 0) {
            balanceCard.classList.add('positive');
            balanceCard.style.background = "var(--success)";
        } else if (currentBalance === 0) {
            balanceCard.classList.remove('positive');
            balanceCard.style.background = "#95A5A6"; 
        } else {
            balanceCard.classList.remove('positive');
            balanceCard.style.background = "var(--danger)"; 
        }
    }

    function renderExpenses() {
        const list = document.getElementById('expenseList');
        list.innerHTML = '';

        if (expenses.length === 0) {
            list.innerHTML = '<div class="empty-state">Aucune opération ce mois-ci.</div>';
            return;
        }

        expenses.forEach(exp => {
            const div = document.createElement('div');
            div.className = 'expense-item';
            
            let catName = exp.category === 'essentiel' ? 'Essentiel' : exp.category === 'plaisir' ? 'Plaisir' : 'Épargne';

            div.innerHTML = `
                <div class="expense-info">
                    <strong>${exp.desc}</strong>
                    <span class="badge ${exp.category}">${catName}</span>
                </div>
                <div>
                    <span style="font-weight: bold; margin-right: 15px;">${exp.amount.toFixed(2)} €</span>
                    <button class="delete-btn" onclick="deleteExpense(${exp.id})">X</button>
                </div>
            `;
            list.appendChild(div);
        });
    }

    function closeMonth() {
        if (confirm("Voulez-vous vraiment cloturer ce mois ? L'argent restant sera transfere vers votre epargne globale, et le mois repartira a zero.")) {
            
            if (currentBalance > 0) {
                globalSavings += currentBalance;
            }

            let currentMonthSavings = 0;
            expenses.forEach(exp => {
                if (exp.category === 'economie') {
                    currentMonthSavings += exp.amount;
                }
            });
            globalSavings += currentMonthSavings;

            income = 0;
            expenses = [];
            document.getElementById('incomeInput').value = '';

            saveData();
            document.getElementById('globalSavingsAmount').innerText = globalSavings.toFixed(2);
            updateDashboard();
            renderExpenses();
            
            alert("Mois cloture avec succes ! Ton reste a vivre et tes economies du mois ont ete mis en securite dans ton epargne globale.");
        }
    }

    function resetAll() {
        if (confirm("Attention, cela va effacer tout ton historique et remettre ton epargne globale a zero. Es-tu sur ?")) {
            localStorage.clear(); 
            income = 0;
            expenses = [];
            globalSavings = 0;
            document.getElementById('incomeInput').value = '';
            document.getElementById('globalSavingsAmount').innerText = '0.00';
            updateDashboard();
            renderExpenses();
            alert("Toutes les donnees ont ete remises a zero !");
        }
    }

    window.onload = loadData;
