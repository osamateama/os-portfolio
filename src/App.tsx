/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  ExternalLink, 
  Code2, 
  Database, 
  Server, 
  Globe, 
  Cpu, 
  MessageSquare, 
  ChevronDown,
  Layers,
  Terminal,
  Send,
  Smartphone
} from 'lucide-react';

import myResume from './Public/CV/Resume.pdf';
import profileImg from './Public/Img/5859350778307349686.jpg';
import dvldImg from './Public/Img/DVLDP.png';
import cgImg from './Public/Img/CG.png';
import notesImg from './Public/Img/notes1.jpg';
import winImg from './Public/Img/WIN.png';

// --- Types ---
interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  image: string;
  github: string;
}

interface Skill {
  name: string;
  level: number;
  icon?: React.ReactNode;
}

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 ${
        isScrolled ? 'bg-[#030014]/80 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent cursor-pointer"
        >
          DEV.PORTFOLIO
        </motion.div>
        <div className="hidden md:flex space-x-8 text-sm font-medium text-gray-300">
          {['About', 'Skills', 'Projects', 'Services', 'Contact'].map((item) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              whileHover={{ color: '#fff', scale: 1.1 }}
              className="hover:text-white transition-colors"
            >
              {item}
            </motion.a>
          ))}
        </div>
        <motion.a
          href={myResume} 
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-5 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm hover:bg-white/20 transition-all"
        >
          Download CV
        </motion.a>
      </div>
    </motion.nav>
  );
};

const TypingText = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [index, text]);

  return (
    <span className="inline-block min-h-[1.5em]">
      {displayText}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="inline-block w-1 h-8 ml-1 bg-cyan-400 align-middle"
      />
    </span>
  );
};

const SkillCard: React.FC<{ title: string; skills: Skill[]; icon: React.ReactNode }> = ({ title, skills, icon }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-cyan-500/50 transition-all group"
  >
    <div className="flex items-center gap-3 mb-6">
      <div className="p-3 rounded-lg bg-cyan-500/10 text-cyan-400 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-white">{title}</h3>
    </div>
    <div className="space-y-4">
      {skills.map((skill) => (
        <div key={skill.name}>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-400">{skill.name}</span>
            <span className="text-cyan-400">{skill.level}%</span>
          </div>
          <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.level}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-cyan-500 to-purple-500"
            />
          </div>
        </div>
      ))}
    </div>
  </motion.div>
);

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    setRotate({ x: rotateX, y: rotateY });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setRotate({ x: 0, y: 0 })}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        transition: 'transform 0.1s ease-out'
      }}
      className="group relative rounded-3xl overflow-hidden bg-white/5 border border-white/10 backdrop-blur-md"
    >
      <div className="aspect-video overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map(t => (
            <span key={t} className="px-2 py-1 text-[10px] uppercase tracking-wider font-bold bg-white/10 text-cyan-400 rounded border border-white/5">
              {t}
            </span>
          ))}
        </div>
        <div className="flex gap-4">
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-xl font-semibold text-sm"
          >
            <Github size={16} /> GitHub
          </motion.a>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-xl bg-white/10 text-white border border-white/20"
          >
            <ExternalLink size={16} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const backendSkills: Skill[] = [
    { name: 'C#', level: 95 },
    { name: 'ASP.NET', level: 90 },
    { name: 'WinForms', level: 92 },
    { name: 'EF Core', level: 88 },
    { name: 'LINQ', level: 90 },
    { name: '3-Tier Architecture', level: 95 },
  ];

  const frontendSkills: Skill[] = [
    { name: 'HTML5/CSS3', level: 85 },
    { name: 'JavaScript', level: 80 },
    { name: 'SQL Server', level: 90 },
    { name: 'MySQL', level: 85 },
  ];

  const otherSkills: Skill[] = [
    { name: 'OOP & SOLID', level: 95 },
    { name: 'Data Structures', level: 90 },
    { name: 'Algorithms', level: 88 },
    { name: 'C++', level: 85 },
    { name: 'Python', level: 80 },
  ];

  const projects: Project[] = [
    {
      id: 1,
      title: "DVLD — Driver & Vehicle License System",
      description: "WinForms 3-tier system managing driver and vehicle license operations. Handled authentication, issuance, and reservations for over 1000 licenses per month.",
      tech: ["C#", "SQL Server", "ADO.NET", "WinForms"],
      image: dvldImg,
      github: "https://github.com/osamateama/DVLD-Management-System"
    },
    {
      id: 2,
      title: "CRUD Code Generator",
      description: "Automatically generates Business Layer, Data Access Layer, and SQL scripts. Reduced development time by 60% for developers.",
      tech: ["C#", "SQL Server", "Layered Architecture"],
      image: cgImg,
      github: "https://github.com/osamateama/Code-Generator"
    },
    {
      id: 3,
      title: "Notes API (.NET 8)",
      description: "A secure RESTful API for managing personal notes with JWT Authentication and Refresh Tokens.",
      tech: ["REST Api","ASP.NET Web Api" ,"C#", "EF Core","JWT"],
      image: notesImg,
      github: "https://github.com/osamateama/notes-Api"
    },
    {
      id: 4,
      title: "Folder Monitor Service",
      description: "Windows Service that monitors folders in real-time. Automated renaming and logging for over 10,000 files during testing.",
      tech: ["C#", "Windows Service", "File System Watcher"],
      image: winImg,
      github: "https://github.com/osamateama/FolderMonitorService"
    }
  ];

  return (
    <div className="bg-[#030014] text-white selection:bg-cyan-500/30 min-h-screen font-sans overflow-x-hidden">
      {/* Scroll Progress */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-cyan-500 origin-left z-[100]" style={{ scaleX }} />

      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/20 rounded-full blur-[120px] animate-pulse delay-1000" />
        </div>

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="inline-block px-4 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-xs font-bold tracking-widest uppercase mb-6"
            >
              Available for New Projects
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Osama Reda</span><br />
              <TypingText text="Backend & Full Stack .NET Developer" />
            </h1>
            <p className="text-gray-400 text-lg mb-8 max-w-lg leading-relaxed">
              Backend & Full Stack .NET Developer with a strong focus on building scalable, maintainable systems. Experienced in developing real-world applications using C#, ASP.NET (Web Api & MVC), with a deep understanding of clean architecture, performance optimization, and problem solving.
            </p>
            <div className="flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl font-bold text-white shadow-lg shadow-cyan-500/25"
              >
                View My Work
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl font-bold text-white backdrop-blur-md hover:bg-white/10 transition-all"
              >
                Contact Me
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="relative w-full aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 to-purple-500 rounded-3xl rotate-6 blur-2xl opacity-20 animate-pulse" />
              <div className="relative rounded-3xl overflow-hidden border border-white/10 backdrop-blur-md bg-white/5 p-4">
                <img 
                  src={profileImg} 
                  alt="Osama Reda" 
                  className="w-full h-full object-cover rounded-2xl grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="absolute -top-6 -right-6 p-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl"
              >
                <Code2 className="text-cyan-400" size={32} />
              </motion.div>
              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="absolute -bottom-6 -left-6 p-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl"
              >
                <Server className="text-purple-400" size={32} />
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-500"
        >
          <ChevronDown size={32} />
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-4xl font-bold mb-8">About <span className="text-cyan-400">Me</span></h2>
            <p className="text-gray-400 leading-relaxed text-lg">
              I am a Computer Science student at Damietta University with a strong foundation in C++, C#, Python, and SQL. I specialize in building scalable desktop and web applications.
            </p>
            <p className="text-gray-400 leading-relaxed text-lg">
              Currently, I am a Full-Stack Developer Intern at DEPI, where I apply best practices like clean code, version control, and layered architecture to real-world systems.
            </p>
            <div className="grid grid-cols-1 gap-6 pt-6">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <h4 className="text-2xl font-bold text-cyan-400">Student</h4>
                <p className="text-xs text-gray-500 uppercase tracking-widest">Damietta University</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md"
          >
            <Terminal className="text-cyan-400 mb-6" size={40} />
              <div className="space-y-4 font-mono text-sm text-gray-300">
                <p><span className="text-purple-400">const</span> developer = &#123;</p>
                <p className="pl-4">name: <span className="text-cyan-400">'Osama Reda'</span>,</p>
                <p className="pl-4">education: <span className="text-cyan-400">'Damietta University'</span>,</p>
                <p className="pl-4">role: <span className="text-cyan-400">'.Net Full Stack Developer'</span>,</p>
                <p className="pl-4">mindset: <span className="text-cyan-400">'Problem Solver'</span>,</p>
                <p className="pl-4">passion: [<span className="text-cyan-400">'Clean Code'</span>, <span className="text-cyan-400">'Layered Architecture'</span>],</p>
                <p>&#125;;</p>
              </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-6 bg-[#05001a]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Technical <span className="text-cyan-400">Skills</span></h2>
            <p className="text-gray-500 max-w-2xl mx-auto">My technical toolkit spans across the entire stack, with a primary focus on the Microsoft .NET ecosystem.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <SkillCard title="Backend" skills={backendSkills} icon={<Server size={24} />} />
            <SkillCard title="Frontend" skills={frontendSkills} icon={<Globe size={24} />} />
            <SkillCard title="Core & Tools" skills={otherSkills} icon={<Cpu size={24} />} />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">My <span className="text-cyan-400">Services</span></h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Solutions tailored to your business needs, from architecture to deployment.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Backend Dev', desc: 'Robust APIs and microservices using .NET Core and Web API.', icon: <Terminal /> },
              { title: 'Full Stack Web', desc: 'End-to-end web applications with React and .NET integration.', icon: <Globe /> },
              { title: 'Database Design', desc: 'Optimized SQL Server schemas and complex query performance.', icon: <Database /> },
              { title: 'Desktop Apps', desc: 'Modern WinForms and WPF applications for Windows environments.', icon: <Smartphone /> },
            ].map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group"
              >
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6 bg-[#05001a]">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-4xl font-bold mb-4">Featured <span className="text-cyan-400">Projects</span></h2>
              <p className="text-gray-500">A selection of my recent work and open-source contributions.</p>
            </div>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              className="hidden md:flex items-center gap-2 text-cyan-400 font-bold"
            >
              View All Projects <ExternalLink size={16} />
            </motion.button>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {projects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-8">Let's <span className="text-cyan-400">Connect</span></h2>
              <p className="text-gray-400 mb-12 text-lg">
                Have a project in mind or just want to say hi? Feel free to reach out. I'm always open to discussing new opportunities and technical challenges.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500 group-hover:text-white transition-all">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-widest">Email Me</p>
                    <p className="text-white font-medium">osamateama@students.du.edu.eg</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-all">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-widest">Call Me</p>
                    <p className="text-white font-medium">+20 1027212890</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-green-400 group-hover:bg-green-500 group-hover:text-white transition-all">
                    <MessageSquare size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-widest">WhatsApp</p>
                    <a href="https://wa.me/201027212890" target="_blank" rel="noreferrer" className="text-white font-medium hover:text-green-400 transition-colors">Chat with me</a>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-12">
                <motion.a
                  href="https://github.com/osamateama"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5, scale: 1.1 }}
                  className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/30 transition-all"
                >
                  <Github size={20} />
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/osama-reda-4919752a3/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5, scale: 1.1 }}
                  className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/30 transition-all"
                >
                  <Linkedin size={20} />
                </motion.a>
                <motion.a
                  href="mailto:osamateama@students.du.edu.eg"
                  whileHover={{ y: -5, scale: 1.1 }}
                  className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/30 transition-all"
                >
                  <Mail size={20} />
                </motion.a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md"
            >
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Name</label>
                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-500 transition-all" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Email</label>
                    <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-500 transition-all" placeholder="john@example.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Subject</label>
                  <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-500 transition-all" placeholder="Project Inquiry" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Message</label>
                  <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-500 transition-all resize-none" placeholder="Tell me about your project..."></textarea>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20"
                >
                  Send Message <Send size={18} />
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            OSAMA.REDA
          </div>
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Osama Reda. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy', 'Terms', 'Sitemap'].map(item => (
              <a key={item} href="#" className="text-xs text-gray-500 hover:text-white transition-colors">{item}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}