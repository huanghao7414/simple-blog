import { motion, useScroll, useTransform } from "framer-motion";
import { Github, Mail, Linkedin } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function BlogHomePage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.05]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.5]);

  const sections = [
    {
      title: "技术沉淀",
      desc: "Java 后端、系统设计、数据库调优与架构思考。",
      bg: "from-blue-900 via-slate-800 to-black",
      text: "text-blue-300",
      image: "/simple-blog/images/tech.jpg",
    },
    {
      title: "AI & 工具链",
      desc: "探索 AI Agent、大模型集成与自动化工作流。",
      bg: "from-purple-900 via-gray-800 to-black",
      text: "text-purple-300",
      image: "/simple-blog/images/ai.jpg",
    },
    {
      title: "个人笔记",
      desc: "读书札记、认知思考、生活方式与成长瞬间。",
      bg: "from-rose-900 via-slate-900 to-black",
      text: "text-pink-300",
      image: "/simple-blog/images/life.jpg",
    },
  ];

  return (
    <main ref={containerRef} className="relative min-h-screen bg-black text-white overflow-x-hidden">
      {/* Animated Gradient Background */}
      <motion.div
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
        className="absolute inset-0 bg-[length:300%_300%] bg-gradient-to-tr from-indigo-800 via-slate-800 to-gray-900 opacity-10 z-0"
      />

      {/* Hero Section */}
      <motion.section
        style={{ scale, opacity }}
        className="relative z-10 h-screen flex flex-col items-center justify-center text-center px-6"
      >
        <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 mb-4">
          hh's Digital Garden
        </h1>
        <p className="text-lg text-slate-400 mb-6">
          记录思考、代码、系统与生活的个人博客。
        </p>
        <div className="flex gap-4">
          {[{ icon: Mail, label: "Email" }, { icon: Linkedin, label: "LinkedIn" }, { icon: Github, label: "GitHub" }].map(({ icon: Icon, label }, i) => (
            <button key={i} className="flex items-center border border-blue-500 text-blue-400 px-4 py-2 rounded hover:scale-105 transition">
              <Icon className="w-4 h-4 mr-2" /> {label}
            </button>
          ))}
        </div>
      </motion.section>

      {/* Scroll-driven fullscreen sections with distinct styles and images */}
      <section className="relative z-10">
        {sections.map((item, i) => (
          <motion.section
            key={i}
            className={`h-screen flex flex-col items-center justify-center px-6 text-center bg-gradient-to-br ${item.bg}`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="max-w-xl">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-64 object-cover rounded-lg shadow-lg mb-6 border border-slate-700"
              />
              <h2 className={`text-4xl font-bold mb-4 ${item.text}`}>{item.title}</h2>
              <p className="text-slate-200 text-lg">{item.desc}</p>
            </div>
          </motion.section>
        ))}
      </section>
    </main>
  );
}
