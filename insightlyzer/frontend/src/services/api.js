// src/services/api.js - Versión mejorada
const API_BASE_URL = 'http://localhost:8000';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Agregar token si está disponible
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Si hay body, convertirlo a JSON string
    if (options.body && typeof options.body !== 'string') {
      config.body = JSON.stringify(options.body);
    }

    try {
      const response = await fetch(url, config);
      
      // Si la respuesta está vacía (como en DELETE)
      if (response.status === 204) {
        return {};
      }
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.detail || `Error ${response.status}: ${response.statusText}`);
      }
      
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Métodos conveniencia
  async get(endpoint) {
    return this.request(endpoint, { method: 'GET' });
  }

  async post(endpoint, data) {
    return this.request(endpoint, { method: 'POST', body: data });
  }

  async put(endpoint, data) {
    return this.request(endpoint, { method: 'PUT', body: data });
  }

  async delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }

  // Registrar usuario
  async register(email, password) {
    return this.post('/auth/register', { email, password });
  }

  // Login usuario
  async login(email, password) {
    return this.post('/auth/login', { email, password });
  }

  // Obtener usuario actual
  async getCurrentUser() {
    return this.get('/auth/me');
  }

  // Verificar token
  async verifyToken() {
    try {
      const user = await this.getCurrentUser();
      return { valid: true, user };
    } catch (error) {
      return { valid: false, error: error.message };
    }
  }
}

export const apiService = new ApiService();