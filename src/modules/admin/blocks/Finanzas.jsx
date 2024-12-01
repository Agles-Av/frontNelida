import React, { useState, useEffect } from 'react'
import AxiosClient from '../../../config/http-gateway/http-client';
import { Chart } from 'primereact/chart';
import { Dropdown } from 'primereact/dropdown';
import { Card } from 'primereact/card';
import { Button } from 'react-scroll';

const Finanzas = () => {
  const [datos, setDatos] = useState([]); // Datos originales de la API
  const [chartData, setChartData] = useState(null); // Datos procesados para el gráfico
  const [chartOptions, setChartOptions] = useState(null); // Opciones del gráfico
  const [loading, setLoading] = useState(false); // Estado de carga
  const [vista, setVista] = useState('mes'); // Vista actual: "mes" o "año"

  const opcionesVista = [
    { label: 'Por Mes', value: 'mes' },
    { label: 'Por Año', value: 'año' }
  ];

  const getDatos = async () => {
    try {
      setLoading(true);
      const response = await AxiosClient({
        url: "/suscripcion/ganancias/",
        method: "GET",
      });

      if (!response.error) {
        setDatos(response.data); // Guarda los datos originales
        procesarDatos(response.data, vista); // Procesa los datos según la vista inicial
      }
    } catch (error) {
      console.error('Error al obtener datos:', error);
    } finally {
      setLoading(false);
    }
  };

  const ExportButton = () => {
    const handleExport = async () => {
      try {
        const response = await AxiosClient({
          url: '/suscripcion/exportar/',
          method: 'GET',
          responseType: 'blob',
        });

        if (response && response.size > 0) {
          // Crear un blob a partir de los datos
          const blob = new Blob([response], { type: 'text/csv' });

          // Crear un enlace temporal para la descarga
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'suscripciones.csv'); // Nombre del archivo
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } else {
          console.error('El archivo recibido está vacío o no se pudo procesar.');
        }
      } catch (error) {
        console.error('Error al exportar:', error);
      }
    };

    return (
      <button onClick={handleExport} className="p-button p-component">
        Exportar Suscripciones
      </button>
    );
  };

  const procesarDatos = (data, tipoVista) => {
    const ingresosAgrupados = {};

    data.forEach(item => {
      const fecha = new Date(item.fechaInicio); // Convierte la fecha
      let etiqueta;

      if (tipoVista === 'mes') {
        const mes = fecha.toLocaleString('es-ES', { month: 'long' }); // Nombre del mes
        const año = fecha.getFullYear(); // Año
        etiqueta = `${mes} ${año}`; // Ejemplo: "Noviembre 2024"
      } else if (tipoVista === 'año') {
        etiqueta = fecha.getFullYear().toString(); // Ejemplo: "2024"
      }

      if (!ingresosAgrupados[etiqueta]) {
        ingresosAgrupados[etiqueta] = 0;
      }
      ingresosAgrupados[etiqueta] += item.precio; // Suma los precios
    });

    // Configura los datos para el gráfico
    const labels = Object.keys(ingresosAgrupados); // Ejemplo: ["Noviembre 2024"] o ["2024"]
    const valores = Object.values(ingresosAgrupados); // Ejemplo: [500, ...]

    setChartData({
      labels: labels,
      datasets: [
        {
          label: tipoVista === 'mes' ? 'Ingresos Mensuales' : 'Ingresos Anuales',
          data: valores,
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }
      ]
    });

    setChartOptions({
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: tipoVista === 'mes' ? 'Ingresos por Mes' : 'Ingresos por Año'
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    });
  };

  const cambiarVista = (nuevaVista) => {
    setVista(nuevaVista); // Actualiza la vista seleccionada
    procesarDatos(datos, nuevaVista); // Procesa los datos según la nueva vista
  };

  useEffect(() => {
    getDatos();
  }, []);

  return (

    <Card className='border-transparent shadow-none '>
      <div className='mb-4'>
        <h1 className="text-5xl font-semibold text-left mb-4 text-primary">Finanzas</h1>
        <ExportButton />
      </div>


      {loading ? (
        <p>Cargando datos...</p>
      ) : (
        <>
          {/* Selector para cambiar la vista */}
          <Dropdown
            value={vista}
            options={opcionesVista}
            onChange={(e) => cambiarVista(e.value)}
            placeholder="Selecciona la vista"
            className="mb-4"
          />

          {/* Gráfico */}
          {chartData && chartOptions ? (
            <Chart type="bar" data={chartData} options={chartOptions} />
          ) : (
            <p>No hay datos para mostrar</p>
          )}
        </>
      )}
    </Card>
  );
};

export default Finanzas