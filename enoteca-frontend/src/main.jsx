import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Home() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Agenda de Eventos - Enoteca Decanter</h1>
      <Link to="/novo" className="bg-green-600 text-white px-4 py-2 rounded">Novo Evento</Link>
      <div className="mt-6">
        <p className="text-gray-600">Nenhum evento cadastrado ainda.</p>
      </div>
    </div>
  );
}

function NovoEvento() {
  const [form, setForm] = useState({
    cliente: '',
    empresa: '',
    data_hora: '',
    pessoas: '',
    status: '',
    local: '',
    menu: '',
    valor_por_pessoa: '',
    observacoes: ''
  });
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    axios.post('https://enoteca-backend.onrender.com/eventos', form)
      .then(() => {
        alert('Evento cadastrado com sucesso!');
        navigate('/');
      })
      .catch(() => alert('Erro ao cadastrar evento.'));
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Cadastrar Novo Evento</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 max-w-xl">
        <input name="cliente" type="text" placeholder="Nome do Cliente" value={form.cliente} onChange={handleChange} className="border p-2 rounded" required />
        <input name="empresa" type="text" placeholder="Empresa" value={form.empresa} onChange={handleChange} className="border p-2 rounded" />
        <input name="data_hora" type="datetime-local" value={form.data_hora} onChange={handleChange} className="border p-2 rounded" required />
        <input name="pessoas" type="number" placeholder="Nº de Pessoas" value={form.pessoas} onChange={handleChange} className="border p-2 rounded" />
        <select name="status" value={form.status} onChange={handleChange} className="border p-2 rounded">
          <option value="">Status</option>
          <option value="CONFIRMADO">Confirmado</option>
          <option value="EM ANÁLISE">Em Análise</option>
        </select>
        <select name="local" value={form.local} onChange={handleChange} className="border p-2 rounded">
          <option value="">Local</option>
          <option value="SALA DE EVENTOS">Sala de Eventos</option>
          <option value="RESTAURANTE">Restaurante</option>
        </select>
        <select name="menu" value={form.menu} onChange={handleChange} className="border p-2 rounded">
          <option value="">Menu</option>
          <option value="MENU 1">Menu 1</option>
          <option value="MENU 2">Menu 2</option>
          <option value="MENU 3">Menu 3</option>
          <option value="MENU A DEFINIR">Menu a Definir</option>
        </select>
        <input name="valor_por_pessoa" type="number" step="0.01" placeholder="Valor por Pessoa" value={form.valor_por_pessoa} onChange={handleChange} className="border p-2 rounded" />
        <textarea name="observacoes" placeholder="Observações" value={form.observacoes} onChange={handleChange} className="border p-2 rounded"></textarea>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Salvar</button>
      </form>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/novo" element={<NovoEvento />} />
      </Routes>
    </Router>
  );
}
