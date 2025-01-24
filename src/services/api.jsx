export const createAccount = async (data) => {
    const response = await fetch('http://localhost:3000/api/create-user', {  // Altere a URL conforme necessário
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create account');
    }

    return response.json();
};