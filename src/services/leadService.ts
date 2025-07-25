import { Lead } from '../types/Lead';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001';

export const fetchLeads = async (): Promise<Lead[]> => {
  try {
    const response = await fetch(`${BACKEND_URL}/webhook/get-leads`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching leads:', error);
    throw error;
  }
};

export const fetchTelegramUsername = async (userId: string): Promise<{ username: string }> => {
  try {
    const response = await fetch(`${BACKEND_URL}/webhook/get-chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ chatId: userId }),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching Telegram username:', error);
    throw error;
  }
}; 