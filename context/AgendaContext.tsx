import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

export interface AgendaItem {
  id: string;
  title: string;
  description?: string;
  date: string; // ISO date string 'YYYY-MM-DD'
  startTime?: string; // HH:MM
  endTime?: string; // HH:MM
  completed: boolean;
}

interface AgendaContextType {
  items: AgendaItem[];
  addItem: (item: Omit<AgendaItem, 'id'>) => Promise<void>;
  updateItem: (id: string, updates: Partial<AgendaItem>) => Promise<void>;
  deleteItem: (id: string) => Promise<void>;
  completeItem: (id: string) => Promise<void>;
  loading: boolean;
}

const AgendaContext = createContext<AgendaContextType | undefined>(undefined);

// Storage key
const STORAGE_KEY = 'fuckass_agenda_items';

export const AgendaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<AgendaItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Load items from storage on mount
  useEffect(() => {
    const loadItems = async () => {
      try {
        if (Platform.OS === 'web') {
          // Use localStorage on web
          const storedItems = localStorage.getItem(STORAGE_KEY);
          if (storedItems) {
            setItems(JSON.parse(storedItems));
          }
        } else {
          // Use AsyncStorage on native
          const storedItems = await AsyncStorage.getItem(STORAGE_KEY);
          if (storedItems) {
            setItems(JSON.parse(storedItems));
          }
        }
      } catch (error) {
        console.error('Failed to load agenda items:', error);
      } finally {
        setLoading(false);
      }
    };

    loadItems();
  }, []);

  // Save items to storage whenever items change
  useEffect(() => {
    const saveItems = async () => {
      try {
        if (Platform.OS === 'web') {
          // Use localStorage on web
          localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
        } else {
          // Use AsyncStorage on native
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items));
        }
      } catch (error) {
        console.error('Failed to save agenda items:', error);
      }
    };

    if (!loading) {
      saveItems();
    }
  }, [items, loading]);

  const addItem = async (item: Omit<AgendaItem, 'id'>) => {
    const newItem: AgendaItem = {
      ...item,
      id: Date.now().toString(),
      completed: false,
    };

    setItems((prevItems) => [...prevItems, newItem]);
  };

  const updateItem = async (id: string, updates: Partial<AgendaItem>) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      )
    );
  };

  const deleteItem = async (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const completeItem = async (id: string) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  return (
    <AgendaContext.Provider
      value={{
        items,
        addItem,
        updateItem,
        deleteItem,
        completeItem,
        loading,
      }}
    >
      {children}
    </AgendaContext.Provider>
  );
};

export const useAgenda = () => {
  const context = useContext(AgendaContext);
  if (context === undefined) {
    throw new Error('useAgenda must be used within an AgendaProvider');
  }
  return context;
};