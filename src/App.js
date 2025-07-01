// App.js - Este es el archivo principal

import React, { useState } from 'react';
import { Search, Briefcase, User, Settings, Bell, MessageSquare, ChevronDown, Filter, Star, CheckCircle, Clock, DollarSign, ArrowLeft, Zap, Target, BarChart2, Lightbulb } from 'lucide-react';

// --- DATOS DE EJEMPLO (MOCK DATA) ---
const mockUser = {
  name: 'Elena Ríos',
  avatarUrl: `https://placehold.co/100x100/3b82f6/ffffff?text=ER`,
  title: 'Diseñadora UX/UI Senior',
  balance: 4750.00,
  memberSince: '2024-01-15',
};

const mockProjects = [
  { id: 1, title: 'Diseño de App Móvil para Fintech', client: 'NeoBank Inc.', budget: 3500, skills: ['UX', 'UI', 'Figma', 'Mobile'], description: 'Necesitamos un rediseño completo de nuestra aplicación móvil para mejorar la experiencia del usuario y la tasa de conversión. Se requiere experiencia demostrable en el sector fintech.', posted: 'hace 2 días', proposals: 12, clientVerified: true },
  { id: 2, title: 'Desarrollo Backend con Node.js para E-commerce', client: 'Tienda Rápida', budget: 5000, skills: ['Node.js', 'Express', 'MongoDB', 'API Rest'], description: 'Buscamos un desarrollador backend para construir la API de nuestro nuevo e-commerce. El proyecto incluye gestión de usuarios, productos, y pasarela de pagos.', posted: 'hace 5 horas', proposals: 5, clientVerified: true },
  { id: 3, title: 'Campaña de Marketing Digital para Marca de Moda', client: 'Chic & Co.', budget: 2000, skills: ['SEO', 'SEM', 'Social Media'], description: 'Lanzamiento de nueva colección. Necesitamos una estrategia de marketing digital completa para los próximos 3 meses.', posted: 'hace 1 semana', proposals: 25, clientVerified: false },
  { id: 4, title: 'Redacción de Artículos para Blog de Tecnología', client: 'TechSavvy', budget: 800, skills: ['Redacción', 'SEO', 'Tecnología'], description: 'Se requieren 10 artículos de 1500 palabras sobre las últimas tendencias en inteligencia artificial y desarrollo de software.', posted: 'hace 3 días', proposals: 18, clientVerified: true },
];

// --- Componentes de la UI ---

const Sidebar = ({ currentPage, navigateTo }) => {
  const navItems = [
    { id: 'dashboard', icon: Briefcase, label: 'Dashboard' },
    { id: 'diagnosis', icon: Zap, label: 'Diagnóstico' },
    { id: 'projects', icon: Search, label: 'Buscar Proyectos' },
    { id: 'messages', icon: MessageSquare, label: 'Mensajes' },
    { id: 'profile', icon: User, label: 'Mi Perfil' },
    { id: 'settings', icon: Settings, label: 'Configuración' },
  ];

  return (
    <div className="w-64 bg-slate-900 text-slate-300 flex flex-col border-r border-slate-800 shrink-0">
      <div className="p-6 text-center border-b border-slate-800">
        <h1 className="text-3xl font-bold text-white">YOU <span className="text-sky-400">OFICE</span></h1>
      </div>
      <nav className="flex-grow p-4">
        <ul>
          {navItems.map(item => (
            <li key={item.id}>
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); navigateTo(item.id); }}
                className={`flex items-center px-4 py-3 my-1 rounded-lg transition-colors ${currentPage === item.id ? 'bg-sky-500 text-white' : 'hover:bg-slate-800'}`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                <span>{item.label}</span>
                {item.id === 'diagnosis' && <span className="ml-auto text-xs bg-yellow-400 text-black font-bold px-2 py-0.5 rounded-full">Nuevo</span>}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-slate-800">
          <div className="flex items-center">
              <img src={mockUser.avatarUrl} alt="User Avatar" className="w-10 h-10 rounded-full" />
              <div className="ml-3">
                  <p className="font-semibold text-white">{mockUser.name}</p>
                  <p className="text-sm text-slate-400">{mockUser.title}</p>
              </div>
          </div>
      </div>
    </div>
  );
};

const Header = ({ title }) => (
  <header className="bg-slate-950 p-6 flex justify-between items-center border-b border-slate-800">
    <h2 className="text-2xl font-bold text-white">{title}</h2>
    <div className="flex items-center space-x-6">
      <button className="relative text-slate-400 hover:text-white">
        <Bell className="w-6 h-6" />
        <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
      </button>
      <div className="flex items-center space-x-2">
         <span className="text-white font-semibold">${mockUser.balance.toFixed(2)}</span>
         <DollarSign className="w-5 h-5 text-green-400"/>
      </div>
    </div>
  </header>
);

const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 flex items-center justify-between">
        <div>
            <p className="text-slate-400 text-sm font-medium">{title}</p>
            <p className="text-3xl font-bold text-white">{value}</p>
        </div>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}>
            <Icon className="w-6 h-6 text-white" />
        </div>
    </div>
);

const ProjectCard = ({ project, navigateTo }) => (
    <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 hover:border-sky-500 transition-all duration-300 transform hover:-translate-y-1">
        <div className="flex justify-between items-start">
            <div>
                <h3 className="text-lg font-bold text-white mb-1">{project.title}</h3>
                <p className="text-sm text-slate-400 flex items-center">
                    {project.client} 
                    {project.clientVerified && <CheckCircle className="w-4 h-4 text-green-400 ml-2" />}
                </p>
            </div>
            <p className="text-xl font-bold text-sky-400">${project.budget}</p>
        </div>
        <p className="text-slate-300 my-4 text-sm">{project.description.substring(0, 100)}...</p>
        <div className="flex flex-wrap gap-2 mb-4">
            {project.skills.map(skill => (
                <span key={skill} className="bg-slate-800 text-sky-300 text-xs font-semibold px-2.5 py-1 rounded-full">{skill}</span>
            ))}
        </div>
        <div className="flex justify-between items-center text-sm text-slate-500 pt-4 border-t border-slate-800">
            <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1.5" />
                <span>Publicado {project.posted}</span>
            </div>
             <button onClick={() => navigateTo('projectDetail', project.id)} className="bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm">
                Ver Detalles
            </button>
        </div>
    </div>
);


// --- Páginas de la Aplicación ---

const DashboardPage = ({ navigateTo }) => (
  <div>
    <Header title="Dashboard" />
    <div className="p-8">
        <div className="bg-slate-800/50 border border-sky-500 rounded-xl p-6 mb-8 flex items-center justify-between">
            <div>
                <h3 className="text-xl font-bold text-white">¿Estás cobrando lo que mereces?</h3>
                <p className="text-slate-300 mt-1">Descubre tu potencial de ingresos y obtén un análisis de perfil instantáneo.</p>
            </div>
            <button onClick={() => navigateTo('diagnosis')} className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-6 rounded-lg transition-transform hover:scale-105 flex items-center">
                <Zap className="w-5 h-5 mr-2" />
                Iniciar Diagnóstico en 2 min
            </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard title="Proyectos Activos" value="3" icon={Briefcase} color="bg-blue-500" />
            <StatCard title="Ingresos (Este Mes)" value={`$${(mockUser.balance / 2).toFixed(2)}`} icon={DollarSign} color="bg-green-500" />
            <StatCard title="Propuestas Enviadas" value="14" icon={User} color="bg-indigo-500" />
        </div>
        
        <h3 className="text-xl font-bold text-white mb-4">Proyectos Recomendados para Ti</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {mockProjects.slice(0, 2).map(p => <ProjectCard key={p.id} project={p} navigateTo={navigateTo} />)}
        </div>
    </div>
  </div>
);

const ProjectsPage = ({ navigateTo }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const filteredProjects = mockProjects.filter(p => 
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.skills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div>
            <Header title="Buscar Proyectos" />
            <div className="p-8">
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="relative flex-grow">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input 
                            type="text"
                            placeholder="Buscar por habilidad, título, etc. (ej. 'Figma')"
                            className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-12 pr-4 py-3 text-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="flex items-center justify-center bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white hover:bg-slate-700">
                        <Filter className="w-5 h-5 mr-2" />
                        Filtros
                    </button>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {filteredProjects.length > 0 ? (
                        filteredProjects.map(p => <ProjectCard key={p.id} project={p} navigateTo={navigateTo} />)
                    ) : (
                        <p className="text-slate-400 col-span-2 text-center py-10">No se encontraron proyectos con ese criterio.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

const ProjectDetailPage = ({ projectId, navigateTo }) => {
    const project = mockProjects.find(p => p.id === projectId);

    if (!project) {
        return (
            <div>
                <Header title="Proyecto no encontrado" />
                <div className="p-8 text-center">
                    <p>El proyecto que buscas no existe o ha sido eliminado.</p>
                    <button onClick={() => navigateTo('projects')} className="mt-4 bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 px-4 rounded-lg">
                        Volver a Proyectos
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Header title="Detalle del Proyecto" />
            <div className="p-8">
                <button onClick={() => navigateTo('projects')} className="flex items-center text-sky-400 hover:text-sky-300 mb-6">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Volver a todos los proyectos
                </button>

                <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
                    <div className="p-8">
                        <div className="flex flex-col md:flex-row justify-between md:items-center mb-6">
                            <h2 className="text-3xl font-bold text-white mb-2 md:mb-0">{project.title}</h2>
                            <span className="text-3xl font-bold text-sky-400">${project.budget}</span>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-6">
                            {project.skills.map(skill => (
                                <span key={skill} className="bg-slate-800 text-sky-300 text-xs font-semibold px-2.5 py-1 rounded-full">{skill}</span>
                            ))}
                        </div>
                        <p className="text-slate-300 leading-relaxed">{project.description}</p>
                    </div>
                    <div className="bg-slate-950 p-8 border-t border-slate-800 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div>
                            <h4 className="text-sm text-slate-400 mb-1">Cliente</h4>
                            <div className="flex items-center">
                                <p className="text-white font-semibold">{project.client}</p>
                                {project.clientVerified && <CheckCircle title="Cliente Verificado" className="w-5 h-5 text-green-400 ml-2" />}
                            </div>
                        </div>
                         <div>
                            <h4 className="text-sm text-slate-400 mb-1">Publicado</h4>
                            <p className="text-white font-semibold">{project.posted}</p>
                        </div>
                         <div>
                            <h4 className="text-sm text-slate-400 mb-1">Propuestas</h4>
                            <p className="text-white font-semibold">{project.proposals}</p>
                        </div>
                        <div className="md:col-span-2 lg:col-span-1">
                             <button className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 px-6 rounded-lg transition-transform hover:scale-105">
                                Enviar Propuesta
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const InteractiveDiagnosisPage = ({ navigateTo }) => {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState({});

    const questions = [
        {
            question: "¿Cuál es tu especialidad principal?",
            options: ["Diseño UX/UI", "Desarrollo Frontend", "Desarrollo Backend", "Marketing Digital", "Redacción / Contenido"],
            key: "specialty"
        },
        {
            question: "¿Cuántos años de experiencia tienes en esa área?",
            options: ["Menos de 1 año", "1-3 años", "3-5 años", "Más de 5 años"],
            key: "experience"
        },
        {
            question: "¿Cuál es tu tarifa actual por hora (en USD)?",
            options: ["$10 - $25", "$25 - $50", "$50 - $75", "Más de $75"],
            key: "rate"
        },
        {
            question: "¿Cuál es tu mayor reto como freelancer?",
            options: ["Encontrar clientes de calidad", "Cobrar tarifas justas", "Gestionar mi tiempo", "Destacar entre la competencia"],
            key: "challenge"
        }
    ];

    const handleAnswer = (option) => {
        setAnswers({ ...answers, [questions[step].key]: option });
        if (step < questions.length - 1) {
            setStep(step + 1);
        } else {
            setStep(step + 1); // Go to results page
        }
    };

    const renderResults = () => {
        // Lógica simple para generar un resultado "personalizado"
        let rateAnalysis = "Tu tarifa está bien posicionada.";
        let rateColor = "text-green-400";
        if (answers.rate === "$25 - $50" && answers.experience === "Más de 5 años") {
            rateAnalysis = "¡Estás cobrando muy por debajo del mercado! Con tu experiencia, podrías apuntar a tarifas de +$75/hr.";
            rateColor = "text-yellow-400";
        } else if (answers.rate === "Más de $75") {
            rateAnalysis = "¡Excelente! Estás en el rango de los freelancers de élite. Aquí encontrarás proyectos a tu altura.";
        }

        let challengeSolution = "Para encontrar clientes de calidad, enfócate en un portafolio impecable y propuestas personalizadas.";
        if(answers.challenge === "Destacar entre la competencia") {
            challengeSolution = "La clave para destacar es la especialización. Enfócate en un nicho donde seas el mejor. Nuestra plataforma te ayuda a conectar con clientes que buscan exactamente eso.";
        }

        return (
            <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-4">Tu Diagnóstico Personalizado</h2>
                <p className="text-slate-400 mb-8">Basado en tus respuestas, aquí tienes un análisis instantáneo de tu perfil.</p>
                <div className="space-y-6 text-left max-w-2xl mx-auto">
                    <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                        <h3 className="flex items-center font-bold text-white text-lg mb-2"><BarChart2 className="w-5 h-5 mr-3 text-sky-400" />Análisis de Tarifa</h3>
                        <p className={`font-semibold ${rateColor}`}>{rateAnalysis}</p>
                    </div>
                     <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                        <h3 className="flex items-center font-bold text-white text-lg mb-2"><Lightbulb className="w-5 h-5 mr-3 text-sky-400" />Solución a tu Reto</h3>
                        <p className="text-slate-300">{challengeSolution}</p>
                    </div>
                     <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                        <h3 className="flex items-center font-bold text-white text-lg mb-2"><Target className="w-5 h-5 mr-3 text-sky-400" />Próximo Paso Recomendado</h3>
                        <p className="text-slate-300">Hemos identificado <span className="font-bold text-white">2 proyectos</span> que se alinean perfectamente con tu perfil de <span className="font-bold text-white">{answers.specialty}</span> y experiencia. </p>
                        <button onClick={() => navigateTo('projects')} className="mt-4 w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 px-6 rounded-lg">
                            Ver mis proyectos recomendados
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Header title="Diagnóstico Interactivo" />
            <div className="p-8 flex justify-center items-center flex-grow">
                <div className="w-full max-w-2xl">
                    {step < questions.length ? (
                        <div className="text-center">
                            <div className="mb-8">
                                <p className="text-sky-400 font-semibold">Pregunta {step + 1} de {questions.length}</p>
                                <h2 className="text-3xl font-bold text-white mt-2">{questions[step].question}</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {questions[step].options.map(option => (
                                    <button 
                                        key={option} 
                                        onClick={() => handleAnswer(option)}
                                        className="text-left p-6 bg-slate-800 rounded-lg border-2 border-slate-700 hover:border-sky-500 hover:bg-slate-700/50 transition-all duration-200"
                                    >
                                        <span className="text-lg text-white font-semibold">{option}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        renderResults()
                    )}
                </div>
            </div>
        </div>
    );
};

// --- Componente Principal de la App ---

export default function App() {
  const [page, setPage] = useState({ current: 'dashboard', props: {} });

  const navigateTo = (pageName, props = {}) => {
    setPage({ current: pageName, props: props });
  };

  const renderPage = () => {
    switch (page.current) {
      case 'dashboard':
        return <DashboardPage navigateTo={navigateTo} />;
      case 'diagnosis':
        return <InteractiveDiagnosisPage navigateTo={navigateTo} />;
      case 'projects':
        return <ProjectsPage navigateTo={navigateTo} />;
      case 'projectDetail':
        return <ProjectDetailPage projectId={page.props} navigateTo={navigateTo} />;
      // Añadir casos para 'profile', 'settings', etc. en el futuro
      default:
        return <DashboardPage navigateTo={navigateTo} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-950 font-sans">
      <Sidebar currentPage={page.current} navigateTo={navigateTo} />
      <main className="flex-1 flex flex-col overflow-y-auto">
        {renderPage()}
      </main>
    </div>
  );
}
