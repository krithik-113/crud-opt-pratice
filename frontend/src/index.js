import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import axios from "axios"

const root = ReactDOM.createRoot(document.getElementById('root'));
axios.defaults.baseURL = "https://crud-opt-pratice-backend.onrender.com/user/api";
root.render(
    <App />
)