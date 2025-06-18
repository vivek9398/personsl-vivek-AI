document.addEventListener('DOMContentLoaded', () => {
    const roleGrid = document.getElementById('roleGrid');
    const chatContainer = document.getElementById('chatContainer');
    const backButton = document.getElementById('backButton');
    const currentRoleElement = document.getElementById('currentRole');
    const chatMessages = document.getElementById('chatMessages');
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');
    
    let currentRole = null;

    // Initialize the role selection grid
    function initializeRoleGrid() {
        roleGrid.innerHTML = '';
        
        roles.forEach(role => {
            const roleCard = document.createElement('div');
            roleCard.className = 'role-card';
            roleCard.dataset.roleId = role.id;
            
            roleCard.innerHTML = `
                <div class="role-icon">
                    <i class="fas ${role.icon}"></i>
                </div>
                <h3>${role.name}</h3>
                <p>${role.description}</p>
            `;
            
            roleCard.addEventListener('click', () => selectRole(role));
            roleGrid.appendChild(roleCard);
        });
    }

    // Select a role and show the chat interface
    function selectRole(role) {
        currentRole = role;
        currentRoleElement.textContent = role.name;
        
        // Show chat interface and hide role grid
        roleGrid.parentElement.style.display = 'none';
        chatContainer.style.display = 'flex';
        
        // Clear previous messages
        chatMessages.innerHTML = '';
        
        // Add AI greeting message
        addMessage(role.greeting, 'ai');
        
        // Add knowledge areas as a welcome message
        const knowledgeMessage = `
            <p>I can assist you with topics including:</p>
            <ul style="margin-top: 10px; margin-left: 20px;">
                ${role.knowledge.map(item => `<li>${item}</li>`).join('')}
            </ul>
            <p style="margin-top: 10px;">How can I help you today?</p>
        `;
        addMessage(knowledgeMessage, 'ai');
    }

    // Add a message to the chat
    function addMessage(text, sender) {
        const messageElement = document.createElement('div');
        messageElement.className = `message ${sender}-message`;
        messageElement.innerHTML = text;
        chatMessages.appendChild(messageElement);
        
        // Scroll to the bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Process user message and generate AI response
    function processUserMessage(message) {
        if (!message.trim()) return;
        
        // Add user message to chat
        addMessage(message, 'user');
        
        // Simulate AI thinking
        setTimeout(() => {
            const response = generateResponse(message);
            addMessage(response, 'ai');
        }, 500);
    }

    // Generate AI response based on the current role and user message
    function generateResponse(message) {
        // This is a simple response generator
        // In a real application, you might use an actual AI API
        
        const lowercaseMessage = message.toLowerCase();
        
        // Generic responses based on role
        switch(currentRole.id) {
            case 'developer':
                if (lowercaseMessage.includes('javascript') || lowercaseMessage.includes('js')) {
                    return "JavaScript is a versatile programming language primarily used for web development. It allows you to add interactive elements to websites. Would you like to know about a specific aspect of JavaScript?";
                } else if (lowercaseMessage.includes('python')) {
                    return "Python is known for its readability and versatility. It's great for beginners and is used in web development, data science, AI, and more. What specific Python topic are you interested in?";
                } else if (lowercaseMessage.includes('framework') || lowercaseMessage.includes('library')) {
                    return "There are many frameworks and libraries available depending on your programming language and needs. Popular ones include React, Angular, and Vue for JavaScript; Django and Flask for Python; and Spring for Java. Which technology stack are you working with?";
                }
                break;
                
            case 'designer':
                if (lowercaseMessage.includes('color') || lowercaseMessage.includes('palette')) {
                    return "Color theory is fundamental to good design. Consider using complementary colors for contrast or analogous colors for harmony. Tools like Adobe Color or Coolors can help you create balanced color palettes. What kind of mood are you trying to convey with your design?";
                } else if (lowercaseMessage.includes('typography') || lowercaseMessage.includes('font')) {
                    return "Typography greatly impacts user experience. For digital products, consider readability first - san-serif fonts often work well on screens. Limit yourself to 2-3 font families per project. Are you designing for print or digital?";
                } else if (lowercaseMessage.includes('layout') || lowercaseMessage.includes('grid')) {
                    return "Grid systems provide structure and consistency to your designs. Consider using a 12-column grid for flexibility. Remember to maintain proper spacing and alignment for a clean, professional look. What kind of layout are you working on?";
                }
                break;
                
            case 'datascientist':
                if (lowercaseMessage.includes('machine learning') || lowercaseMessage.includes('ml')) {
                    return "Machine learning involves training algorithms to make predictions or decisions based on data. Common techniques include regression, classification, clustering, and deep learning. What specific ML problem are you trying to solve?";
                } else if (lowercaseMessage.includes('data cleaning') || lowercaseMessage.includes('preprocessing')) {
                    return "Data preprocessing is crucial for any analysis. This includes handling missing values, removing duplicates, normalizing data, and encoding categorical variables. What kind of data are you working with?";
                } else if (lowercaseMessage.includes('visualization') || lowercaseMessage.includes('chart')) {
                    return "Data visualization helps communicate insights effectively. Choose the right chart type based on what you want to show: bar charts for comparisons, line charts for trends over time, scatter plots for correlations, etc. What insights are you trying to visualize?";
                }
                break;
                
            // Add cases for other roles...
        }
        
        // Default responses if no specific match
        const genericResponses = [
            `As a ${currentRole.name}, I'd approach this by first understanding the context better. Could you provide more details about your specific situation?`,
            `That's an interesting question. In the field of ${currentRole.name.toLowerCase()}, we would typically analyze this from multiple perspectives. What specific aspect are you most concerned with?`,
            `From a ${currentRole.name.toLowerCase()} standpoint, there are several factors to consider here. Let's break down your question step by step. What's your main goal?`,
            `I'd be happy to help with that. Could you elaborate a bit more on what you're trying to achieve?`,
            `That's a great question. To give you the most helpful answer, could you share a bit more context about your specific situation?`
        ];
        
        return genericResponses[Math.floor(Math.random() * genericResponses.length)];
    }

    // Event listeners
    backButton.addEventListener('click', () => {
        chatContainer.style.display = 'none';
        roleGrid.parentElement.style.display = 'block';
        currentRole = null;
    });
    
    sendButton.addEventListener('click', () => {
        const message = userInput.value;
        processUserMessage(message);
        userInput.value = '';
    });
    
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendButton.click();
        }
    });
    
    // Initialize the application
    initializeRoleGrid();
});